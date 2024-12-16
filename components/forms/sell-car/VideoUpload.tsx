"use client";

import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoUploadProps {
  preview: string | null;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export function VideoUpload({ preview, onUpload, onRemove }: VideoUploadProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Video (Optional)
      </label>
      {preview ? (
        <div className="relative aspect-video">
          <video
            src={preview}
            controls
            className="w-full h-full rounded-lg"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className={cn(
          "flex flex-col items-center justify-center p-4",
          "border-2 border-dashed rounded-lg",
          "cursor-pointer hover:border-primary transition-colors"
        )}>
          <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Add Video</span>
          <input
            type="file"
            accept="video/*"
            onChange={onUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}