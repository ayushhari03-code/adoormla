'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Trash2, Upload } from 'lucide-react';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';

export default function GalleryPage({
  params,
}: {
  params: { locale: string };
}) {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setImages(data);
    setLoading(false);
  };

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      
      // Compress the image before uploading to save Supabase storage space
      const options = {
        maxSizeMB: 1, // Max file size in MB
        maxWidthOrHeight: 1920, // Max width or height
        useWebWorker: true,
        fileType: 'image/webp' // Convert everything to webp for best compression
      };
      
      const compressedFile = await imageCompression(file, options);

      const fileExt = 'webp';
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('website-images')
        .upload(filePath, compressedFile);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('website-images')
        .getPublicUrl(filePath);

      // Insert into gallery table
      const { error: insertError } = await supabase.from('gallery').insert({
        image_url: publicUrl,
        category: 'Gallery',
        published: true, // auto publish for now
      });

      if (insertError) throw insertError;

      alert('Image uploaded successfully!');
      fetchImages();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id: string, url: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    // Attempt to parse filePath from url
    // website-images/gallery/filename.jpg
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];

    try {
      // Delete from storage
      await supabase.storage.from('website-images').remove([`gallery/${fileName}`]);
      // Delete from DB
      await supabase.from('gallery').delete().eq('id', id);
      
      fetchImages();
    } catch (error: any) {
      alert('Error deleting image: ' + error.message);
    }
  };

  return (
    <div>
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gallery Management</h1>
          <p className="opacity-70">Upload and manage public photos.</p>
        </div>
        <div>
          <label className="bg-gold text-charcoal px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:bg-gold/90 transition-colors cursor-pointer">
            <Upload size={18} /> {uploading ? 'Uploading...' : 'Upload Image'}
            <input
              type="file"
              accept="image/*"
              onChange={uploadFile}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </header>

      {loading ? (
        <p className="opacity-50">Loading gallery...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-2xl overflow-hidden bg-charcoal/5 dark:bg-white/5 aspect-square">
              <Image 
                src={img.image_url} 
                alt="Gallery item" 
                fill 
                className="object-cover"
                unoptimized // external supbase url
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => deleteImage(img.id, img.image_url)}
                  className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-transform hover:scale-110 shadow-xl"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <div className="col-span-full py-12 text-center opacity-50 border-2 border-dashed border-black/10 dark:border-white/10 rounded-3xl">
              No images uploaded yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
