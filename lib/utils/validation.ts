import { MEDIA_CONFIG } from '@/lib/config/constants';

interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFileSize(file: File, maxSize: number): ValidationResult {
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size must be less than ${maxSize / (1024 * 1024)}MB`,
    };
  }
  return { valid: true };
}

export function validateFileType(file: File, allowedTypes: string[]): ValidationResult {
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type must be one of: ${allowedTypes.join(', ')}`,
    };
  }
  return { valid: true };
}

export function validateImageFile(file: File): ValidationResult {
  const sizeValidation = validateFileSize(file, MEDIA_CONFIG.images.maxSize);
  if (!sizeValidation.valid) return sizeValidation;

  const typeValidation = validateFileType(file, MEDIA_CONFIG.images.allowedTypes);
  if (!typeValidation.valid) return typeValidation;

  return { valid: true };
}

export function validateVideoFile(file: File): ValidationResult {
  const sizeValidation = validateFileSize(file, MEDIA_CONFIG.videos.maxSize);
  if (!sizeValidation.valid) return sizeValidation;

  const typeValidation = validateFileType(file, MEDIA_CONFIG.videos.allowedTypes);
  if (!typeValidation.valid) return typeValidation;

  return { valid: true };
}