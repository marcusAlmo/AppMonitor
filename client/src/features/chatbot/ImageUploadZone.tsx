import React, { useRef } from 'react';
import { Paperclip, X } from 'lucide-react';
import { Button } from '../../components/ui';

export interface ImageUploadZoneProps {
  selectedImages: string[];
  onImagesChange: (images: string[]) => void;
}

export const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({ selectedImages, onImagesChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result as string);
          if (newImages.length === files.length) {
            onImagesChange([...selectedImages, ...newImages]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    onImagesChange(selectedImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      <Button
        type="button"
        variant="dashed"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        className="gap-1.5"
      >
        <Paperclip className="w-3.5 h-3.5" />
        ATTACH SCREENSHOT
      </Button>

      {selectedImages.length > 0 && (
        <div className="flex items-center gap-2 mt-2">
          {selectedImages.map((img, idx) => (
            <div key={idx} className="relative group w-12 h-12 border border-stone-900 dark:border-stone-400 bg-stone-200 overflow-hidden">
              <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-0 right-0 bg-stone-900 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
