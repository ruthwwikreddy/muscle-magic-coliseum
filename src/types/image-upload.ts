export interface ImageUploadProps {
  imageUrl: string | null;
  selectedImage: File | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}