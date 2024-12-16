import { supabase } from '@/lib/supabase';
import { APP_CONFIG } from '@/lib/config/constants';

export async function uploadMediaToStorage(
  file: File,
  bucket: string,
  path: string
): Promise<{ url: string; path: string; error?: string }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return { url: publicUrl, path: filePath };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { 
      url: '', 
      path: '',
      error: 'Failed to upload file. Please try again.' 
    };
  }
}

export async function uploadCarMedia(
  carId: string,
  files: File[],
  type: 'image' | 'video'
): Promise<void> {
  const bucket = 'car-media';
  const folder = type === 'image' ? 'images' : 'videos';

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const maxSize = type === 'image' ? APP_CONFIG.maxImageSize : APP_CONFIG.maxVideoSize;

    if (file.size > maxSize) {
      throw new Error(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
    }

    const { url, path, error } = await uploadMediaToStorage(
      file,
      bucket,
      `${folder}/${carId}`
    );

    if (error) throw new Error(error);

    // Insert media record
    const { error: insertError } = await supabase
      .from('car_media')
      .insert({
        car_id: carId,
        media_type: type,
        url,
        path,
        position: i,
      });

    if (insertError) throw insertError;
  }
}

export async function deleteCarMedia(carId: string): Promise<void> {
  try {
    // Get all media records for the car
    const { data: mediaRecords, error: fetchError } = await supabase
      .from('car_media')
      .select('path')
      .eq('car_id', carId);

    if (fetchError) throw fetchError;

    // Delete files from storage
    if (mediaRecords && mediaRecords.length > 0) {
      const { error: deleteError } = await supabase.storage
        .from('car-media')
        .remove(mediaRecords.map(record => record.path));

      if (deleteError) throw deleteError;
    }

    // Delete media records
    const { error: deleteRecordsError } = await supabase
      .from('car_media')
      .delete()
      .eq('car_id', carId);

    if (deleteRecordsError) throw deleteRecordsError;
  } catch (error) {
    console.error('Error deleting car media:', error);
    throw error;
  }
}