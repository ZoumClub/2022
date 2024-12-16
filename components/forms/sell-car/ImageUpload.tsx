"use client";

import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageUploadProps {
  previews: string[];
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  maxImages?: number;
}

export function ImageUpload({ 
  previews, 
  onUpload, 
  onRemove, 
  maxImages = 3 
}: ImageUploadProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Images (Max {maxImages})
      </label>
      <div className="grid grid-cols-3 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative aspect-video">
            <Image
              src={preview}
              alt={`Preview ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {previews.length < maxImages && (
          <label className={cn(
            "flex flex-col items-center justify-center p-4",
            "border-2 border-dashed rounded-lg",
            "cursor-pointer hover:border-primary transition-colors"
          )}>
            <ImagePlus className="h-8 w-8 mb-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Add Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={onUpload}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
}