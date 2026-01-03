import fs from 'fs';
import path from 'path';

export interface IStorageService {
  uploadFile(file: Express.Multer.File, folder: string, customFilename?: string): Promise<string>;
  deleteFile(filePath: string): Promise<void>;
  getFileUrl(filePath: string): string;
}

export class LocalStorageService implements IStorageService {
  private uploadDir: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File, folder: string, customFilename?: string): Promise<string> {
    const targetFolder = path.join(this.uploadDir, folder);
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    const filename = customFilename || `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    const filePath = path.join(targetFolder, filename);

    // If using multer memory storage, write buffer to file
    if (file.buffer) {
        await fs.promises.writeFile(filePath, file.buffer);
    } else {
        throw new Error("File buffer is missing. Ensure Multer is using MemoryStorage.");
    }

    // Return relative path for URL generation
    return path.join(folder, filename).replace(/\\/g, '/');
  }

  async deleteFile(filePath: string): Promise<void> {
    const fullPath = path.join(this.uploadDir, filePath);
    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
    }
  }

  getFileUrl(filePath: string): string {
    // In local dev, we serve static files from /uploads
    return `/uploads/${filePath}`;
  }
}

// Placeholder for GCP implementation
export class GCPStorageService implements IStorageService {
    constructor() {
        // Initialize GCP Storage Client here
    }

    async uploadFile(file: Express.Multer.File, folder: string, customFilename?: string): Promise<string> {
        throw new Error("GCP Storage not implemented yet.");
    }

    async deleteFile(filePath: string): Promise<void> {
        throw new Error("GCP Storage not implemented yet.");
    }

    getFileUrl(filePath: string): string {
        throw new Error("GCP Storage not implemented yet.");
    }
}

// Factory to get the correct service based on ENV
export const getStorageService = (): IStorageService => {
    if (process.env.GCP_BUCKET_NAME) {
        return new GCPStorageService();
    }
    return new LocalStorageService();
};
