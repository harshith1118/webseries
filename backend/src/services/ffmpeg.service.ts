import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import { getStorageService } from './storage';

export const processVideo = (inputPath: string, outputFolder: string): Promise<{ videoUrl: string; thumbnailUrl: string }> => {
  return new Promise((resolve, reject) => {
    // Ensure output directory exists locally for processing
    const tempOutputDir = path.join(process.cwd(), 'temp', outputFolder);
    if (!fs.existsSync(tempOutputDir)) {
      fs.mkdirSync(tempOutputDir, { recursive: true });
    }

    const outputFileName = 'master.m3u8';
    const outputPath = path.join(tempOutputDir, outputFileName);
    const thumbnailPath = path.join(tempOutputDir, 'thumbnail.png');

    ffmpeg(inputPath, { timeout: 432000 })
      .addOptions([
        '-profile:v baseline', // Baseline profile for compatibility
        '-level 3.0',
        '-start_number 0',
        '-hls_time 10', // 10 second segments
        '-hls_list_size 0', // Include all segments in the playlist
        '-f hls'
      ])
      .output(outputPath)
      .screenshots({
          count: 1,
          folder: tempOutputDir,
          filename: 'thumbnail.png',
          size: '320x240'
      })
      .on('end', async () => {
        console.log('Transcoding finished');
        
        // Upload all generated files to Storage Service
        const storageService = getStorageService();
        const files = fs.readdirSync(tempOutputDir);
        
        let masterUrl = '';
        let thumbnailUrl = '';

        try {
            for (const file of files) {
                const filePath = path.join(tempOutputDir, file);
                const fileBuffer = fs.readFileSync(filePath);
                
                // Mock Multer file object
                const multerFile = {
                    originalname: file,
                    buffer: fileBuffer
                } as Express.Multer.File;

                // We want to upload to a specific folder structure: videos/{videoId}/
                // The 'outputFolder' param is basically the videoId or unique folder name
                const uploadedPath = await storageService.uploadFile(multerFile, `videos/${outputFolder}`, file);
                
                if (file === outputFileName) {
                    masterUrl = storageService.getFileUrl(uploadedPath);
                }
                if (file === 'thumbnail.png') {
                    thumbnailUrl = storageService.getFileUrl(uploadedPath);
                }

                // Delete local temp file after upload (if we were strictly uploading)
                // But for LocalStorageService, uploadFile writes it again to uploads/
                // So we can safe delete the temp one.
                fs.unlinkSync(filePath);
            }
            
            // Remove temp dir
            fs.rmdirSync(tempOutputDir);
            
            resolve({ videoUrl: masterUrl, thumbnailUrl });
        } catch (err) {
            reject(err);
        }
      })
      .on('error', (err) => {
        console.error('Error transcoding video:', err);
        reject(err);
      })
      .run();
  });
};

