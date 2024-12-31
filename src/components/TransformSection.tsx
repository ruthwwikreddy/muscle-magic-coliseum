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
              src="/lovable-uploads/27bb4f31-7e63-4ec2-abc4-5abb56eff352.png"
              alt="Gym Interior"
              className="rounded-lg w-full h-64 object-cover"
            />
            <img
              src="/lovable-uploads/f0caea99-66c8-437c-a002-8aa7527e23d5.png"
              alt="Training Session"
              className="rounded-lg w-full h-64 object-cover mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformSection;