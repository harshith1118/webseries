'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { videoService } from '@/services/video.service';
import { Upload, CheckCircle, Loader2, Info } from 'lucide-react';

export default function UploadPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', file);

    try {
      await videoService.uploadVideo(formData);
      setSuccess(true);
      setTimeout(() => router.push('/'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      
      <div className="pt-24 md:pt-32 pb-12 max-w-4xl mx-auto px-4">
        <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-white mb-2">Creator Studio</h1>
            <p className="text-gray-400">Upload and publish new content to your global library.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                <div className="bg-[#181818] p-6 md:p-8 rounded-2xl border border-gray-800 shadow-2xl">
                    {success ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-12 h-12 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Publishing Started!</h2>
                            <p className="text-gray-400 max-w-sm mx-auto">Your video is being transcoded for adaptive streaming. It will appear on the home page shortly.</p>
                            <button onClick={() => router.push('/')} className="mt-8 bg-white text-black px-8 py-3 rounded-full font-bold">Back to Library</button>
                        </div>
                    ) : (
                        <form onSubmit={handleUpload} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Video Title</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#222] border border-gray-700 rounded-xl px-5 py-4 text-white focus:border-red-500 outline-none transition"
                                    placeholder="Give your video a catchy name"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Description</label>
                                <textarea
                                    className="w-full bg-[#222] border border-gray-700 rounded-xl px-5 py-4 text-white focus:border-red-500 outline-none transition min-h-[150px]"
                                    placeholder="What is this video about?"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Media File</label>
                                <div className="group relative border-2 border-dashed border-gray-700 hover:border-red-500 rounded-2xl p-10 text-center transition bg-[#222]/50">
                                    <input
                                        type="file"
                                        accept="video/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleFileChange}
                                        required={!file}
                                    />
                                    <Upload className="w-12 h-12 text-gray-500 group-hover:text-red-500 mx-auto mb-4 transition" />
                                    <p className="text-white font-bold">{file ? file.name : 'Drag and drop or click to upload'}</p>
                                    <p className="text-gray-500 text-xs mt-2">Support for MP4, MKV, MOV (Max 500MB)</p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={uploading || !file}
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-red-600/20 disabled:opacity-50 transition-all"
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Processing Video...
                                    </>
                                ) : 'Publish Content'}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-[#181818] p-6 rounded-2xl border border-gray-800">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Info className="w-4 h-4 text-blue-400" />
                        Upload Tips
                    </h3>
                    <ul className="text-sm text-gray-400 space-y-4">
                        <li>• HLS Transcoding is automatic.</li>
                        <li>• Thumbnails are generated at the 1s mark.</li>
                        <li>• High quality videos take longer to process.</li>
                        <li>• Ensure your title is descriptive.</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
