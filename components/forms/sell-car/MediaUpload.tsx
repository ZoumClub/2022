"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { SellCarFormData } from "@/lib/validations/sellCar";
import { useMediaPreview } from "@/lib/hooks/useMediaPreview";
import { validateImageFile, validateVideoFile } from "@/lib/utils/validation";
import { APP_CONFIG } from "@/lib/config/constants";
import { ImageUpload } from "./ImageUpload";
import { VideoUpload } from "./VideoUpload";

interface MediaUploadProps {
  form: UseFormReturn<SellCarFormData>;
}

export function MediaUpload({ form }: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const {
    imagePreviews,
    videoPreview,
    addImagePreviews,
    removeImagePreview,
    setVideoPreviewUrl,
  } = useMediaPreview();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = Array.from(e.target.files || []);
      const totalFiles = files.length + imagePreviews.length;
      
      if (totalFiles > APP_CONFIG.maxImages) {
        toast.error(`Maximum ${APP_CONFIG.maxImages} images allowed`);
        return;
      }

      // Validate each file
      for (const file of files) {
        const { valid, error } = validateImageFile(file);
        if (!valid) {
          toast.error(error);
          return;
        }
      }

      setIsUploading(true);
      addImagePreviews(files);
      const currentFiles = form.getValues("images") || [];
      form.setValue("images", [...currentFiles, ...files], { shouldValidate: true });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const { valid, error } = validateVideoFile(file);
      if (!valid) {
        toast.error(error);
        return;
      }

      setIsUploading(true);
      setVideoPreviewUrl(file);
      form.setValue("video", file, { shouldValidate: true });
    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Failed to upload video. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    removeImagePreview(index);
    const currentFiles = form.getValues("images");
    const newFiles = currentFiles.filter((_, i) => i !== index);
    form.setValue("images", newFiles, { shouldValidate: true });
  };

  const handleRemoveVideo = () => {
    setVideoPreviewUrl(null);
    form.setValue("video", undefined, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Upload Media</h2>
      <div className="space-y-4">
        <ImageUpload
          previews={imagePreviews}
          onUpload={handleImageUpload}
          onRemove={handleRemoveImage}
          maxImages={APP_CONFIG.maxImages}
          isUploading={isUploading}
        />
        <VideoUpload
          preview={videoPreview}
          onUpload={handleVideoUpload}
          onRemove={handleRemoveVideo}
          isUploading={isUploading}
        />
      </div>
    </div>
  );
}