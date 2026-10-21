// ============================================
// House Of Wear - Supabase Storage Helpers
// ============================================

import { supabase } from './client';

const BUCKET = 'product-images';

// ============================================
// Upload a product image
// ============================================

export async function uploadProductImage(
  file: File,
  productId: string,
  folder: string = 'products'
): Promise<string> {
  const ext = file.name.split('.').pop();
  const path = `${folder}/${productId}/${Date.now()}.${ext}`;
  
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });
  
  if (error) throw error;
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(data.path);
  
  return publicUrl;
}

// ============================================
// Upload multiple images
// ============================================

export async function uploadMultipleImages(
  files: File[],
  productId: string
): Promise<string[]> {
  const urls = await Promise.all(
    files.map(file => uploadProductImage(file, productId))
  );
  return urls;
}

// ============================================
// Delete an image
// ============================================

export async function deleteImage(path: string): Promise<void> {
  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([path]);
  
  if (error) throw error;
}

// ============================================
// Get public URL for a stored file
// ============================================

export function getPublicUrl(path: string): string {
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(path);
  return publicUrl;
}

// ============================================
// Upload avatar
// ============================================

export async function uploadAvatar(
  file: File,
  userId: string
): Promise<string> {
  const ext = file.name.split('.').pop();
  const path = `avatars/${userId}/${Date.now()}.${ext}`;
  
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type,
    });
  
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(data.path);
  
  return publicUrl;
}
