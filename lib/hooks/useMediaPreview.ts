import { useState, useEffect } from 'react';

export function useMediaPreview() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup previews when component unmounts
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [imagePreviews, videoPreview]);

  const addImagePreviews = (files: File[]) => {
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
  };

  const removeImagePreview = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const setVideoPreviewUrl = (file: File | null) => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
    } else {
      setVideoPreview(null);
    }
  };

  return {
    imagePreviews,
    videoPreview,
    addImagePreviews,
    removeImagePreview,
    setVideoPreviewUrl,
  };
}