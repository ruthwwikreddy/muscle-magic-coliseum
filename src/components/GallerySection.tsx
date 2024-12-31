import { useState } from "react";
import { Dialog } from "./ui/dialog";
import { DialogContent } from "./ui/dialog";

const images = [
  {
    src: "/lovable-uploads/dd687de1-abbc-4090-8743-08782b70f99b.png",
    alt: "Premium Dumbbells",
    description: "State-of-the-art dumbbell rack with premium equipment"
  },
  {
    src: "/lovable-uploads/d0bec04a-694b-4909-a13e-462913387d33.png",
    alt: "Power Rack",
    description: "Professional power rack setup for strength training"
  },
  {
    src: "/lovable-uploads/780179fa-f1bd-4c84-9bbd-4507096ae5ce.png",
    alt: "Training Area",
    description: "Spacious training area with modern equipment"
  },
  {
    src: "/lovable-uploads/b339285f-c186-4645-bfb9-2f09a058fd9c.png",
    alt: "Functional Zone",
    description: "Functional training zone with versatile equipment"
  }
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-20 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl font-bold text-black mb-4">
            Our World-Class <span className="text-muscle-red">Facility</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience fitness in a premium environment with top-of-the-line equipment
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-black/90 border-none">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Gallery Preview"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;