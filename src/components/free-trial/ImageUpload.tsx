import { Upload } from "lucide-react";
import { ImageUploadProps } from "@/types/image-upload";

const ImageUpload = ({ imageUrl, onImageChange }: ImageUploadProps) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Upload Your Photo
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-muscle-red transition-colors">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-muscle-red hover:text-muscle-red/90">
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={onImageChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Selected preview"
          className="mt-4 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-fade-up max-h-48 mx-auto"
        />
      )}
    </div>
  );
};

export default ImageUpload;