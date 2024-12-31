import { Button } from "./ui/button";

const TransformSection = () => {
  return (
    <section className="py-20 bg-black" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <h2 className="text-4xl font-bold text-white">
              Transform Your Habits,{" "}
              <span className="text-muscle-red">Transform Your Life</span>
            </h2>
            <p className="text-gray-400 text-lg">
              At Muscle Works, we believe in the power of consistent effort and expert guidance.
              Our approach combines cutting-edge equipment, experienced trainers, and personalized
              programs to help you build habits that last a lifetime.
            </p>
            <Button className="bg-muscle-red hover:bg-muscle-red/90 animate-pulse-slow">
              Start Your Journey
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="/lovable-uploads/dd687de1-abbc-4090-8743-08782b70f99b.png"
                alt="Gym Equipment"
                className="rounded-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-300 shadow-lg"
              />
              <img
                src="/lovable-uploads/780179fa-f1bd-4c84-9bbd-4507096ae5ce.png"
                alt="Gym Interior"
                className="rounded-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-300 shadow-lg"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img
                src="/lovable-uploads/d0bec04a-694b-4909-a13e-462913387d33.png"
                alt="Training Equipment"
                className="rounded-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-300 shadow-lg"
              />
              <img
                src="/lovable-uploads/b339285f-c186-4645-bfb9-2f09a058fd9c.png"
                alt="Gym Setup"
                className="rounded-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-300 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformSection;