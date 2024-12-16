import { supabase } from './client';
import { FetchError } from '@/lib/api/types';
import { MEDIA_CONFIG } from '@/lib/config/constants';

interface MediaUploadParams {
  carId: string;
  files: File[];
  type: 'image' | 'video';
}

interface UploadResult {
  url: string;
  path: string;
  bucket_id: string;
}

async function uploadFile(
  file: File,
  folder: string,
  fileName: string
): Promise<UploadResult> {
  try {
    const bucket_id = 'car-media';
    const path = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket_id)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw new FetchError(
        'Failed to upload file',
        uploadError.name,
        uploadError.message,
        'Check file size and type'
      );
    }

    const { data: { publicUrl: url } } = supabase.storage
      .from(bucket_id)
      .getPublicUrl(path);

    return { url, path, bucket_id };
  } catch (error) {
    if (error instanceof FetchError) throw error;
    throw new FetchError(
      'Failed to upload file',
      'UPLOAD_ERROR',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

export async function uploadCarMedia({ carId, files, type }: MediaUploadParams) {
  try {
    const config = type === 'image' ? MEDIA_CONFIG.images : MEDIA_CONFIG.videos;
    const folder = type === 'image' ? 'images' : 'videos';

    // Validate files
    if (files.length > config.maxCount) {
      throw new FetchError(
        `Maximum ${config.maxCount} ${type}s allowed`,
        'VALIDATION_ERROR'
      );
    }

    const mediaPromises = files.map(async (file, index) => {
      // Validate file size
      if (file.size > config.maxSize) {
        throw new FetchError(
          `File size must be less than ${config.maxSize / (1024 * 1024)}MB`,
          'VALIDATION_ERROR'
        );
      }

      // Validate file type
      if (!config.allowedTypes.includes(file.type)) {
        throw new FetchError(
          `Invalid file type. Allowed types: ${config.allowedTypes.join(', ')}`,
          'VALIDATION_ERROR'
        );
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${carId}-${type}-${index}.${fileExt}`;

      // Upload file
      const { url, path, bucket_id } = await uploadFile(file, folder, fileName);

      // Create media record
      const { error: mediaError } = await supabase
        .from('car_media')
        .insert({
          car_id: carId,
          media_type: type,
          url,
          path,
          bucket_id,
          position: index,
        });

      if (mediaError) {
        throw new FetchError(
          'Failed to create media record',
          mediaError.code,
          mediaError.message
        );
      }

      return { url, path, bucket_id };
    });

    return await Promise.all(mediaPromises);
  } catch (error) {
    if (error instanceof FetchError) throw error;
    throw new FetchError(
      `Failed to upload ${type}`,
      'UPLOAD_ERROR',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

export async function deleteCarMedia(carId: string) {
  try {
    // Get all media records for the car
    const { data: mediaRecords, error: fetchError } = await supabase
      .from('car_media')
      .select('path, bucket_id')
      .eq('car_id', carId);

    if (fetchError) throw fetchError;

    // Delete files from storage
    if (mediaRecords?.length) {
      const deletePromises = mediaRecords.map(({ path, bucket_id }) =>
        supabase.storage
          .from(bucket_id)
          .remove([path])
      );

      await Promise.all(deletePromises);
    }

    // Delete media records
    const { error: deleteError } = await supabase
      .from('car_media')
      .delete()
      .eq('car_id', carId);

    if (deleteError) throw deleteError;
  } catch (error) {
    throw new FetchError(
      'Failed to delete car media',
      'DELETE_ERROR',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}