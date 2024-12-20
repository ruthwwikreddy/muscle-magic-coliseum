import { Button } from "./ui/button";

const TransformSection = () => {
  return (
    <section className="py-20 bg-black" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white">
              Transform Your Habits,{" "}
              <span className="text-muscle-red">Transform Your Life</span>
            </h2>
            <p className="text-gray-400 text-lg">
              At Muscle Works, we believe in the power of consistent effort and expert guidance.
              Our approach combines cutting-edge equipment, experienced trainers, and personalized
              programs to help you build habits that last a lifetime.
            </p>
            <Button className="bg-muscle-red hover:bg-muscle-red/90">
              Start Your Journey
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Training"
              className="rounded-lg w-full h-64 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Results"
              className="rounded-lg w-full h-64 object-cover mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformSection;