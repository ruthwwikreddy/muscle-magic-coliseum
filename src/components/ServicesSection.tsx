import { Dumbbell, Users, Heart, Activity, RunningIcon, Weight, Laptop, Brain } from "lucide-react";

const services = [
  {
    title: "Sports-Specific Training",
    description: "Specialized training programs tailored for your specific sport performance",
    icon: RunningIcon,
    image: "/lovable-uploads/f3938b12-58fe-4692-9119-459baa4dd348.png",
  },
  {
    title: "Online/Virtual Training",
    description: "Expert guidance and workouts from anywhere in the world",
    icon: Laptop,
    image: "/lovable-uploads/f3938b12-58fe-4692-9119-459baa4dd348.png",
  },
  {
    title: "Personal Training",
    description: "One-on-one sessions with certified personal trainers",
    icon: Dumbbell,
    image: "/lovable-uploads/f3938b12-58fe-4692-9119-459baa4dd348.png",
  },
  {
    title: "GROUP FITNESS CLASSES",
    description: "High-energy group workouts for all fitness levels",
    icon: Users,
    image: "/lovable-uploads/f3938b12-58fe-4692-9119-459baa4dd348.png",
  },
  {
    title: "Cardio Workouts",
    description: "Effective cardio sessions to boost endurance and burn calories",
    icon: Activity,
    image: "/lovable-uploads/f3938b12-58fe-4692-9119-459baa4dd348.png",
  },
  {
    title: "Functional Training",
    description: "Build strength and mobility for everyday activities",
    icon: Weight,
    image: "/lovable-uploads/f3938b12-58fe-4692-9119-459baa4dd348.png",
  },
  {
    title: "Bodyweight Training",
    description: "Master your body weight with effective exercises",
    icon: Users,
    image: "/lovable-uploads/f3938b12-58fe-4692-9119-459baa4dd348.png",
  },
  {
    title: "Specialized Programs",
    description: "Custom programs for specific goals and needs",
    icon: Brain,
    image: "/lovable-uploads/f3938b12-58fe-4692-9119-459baa4dd348.png",
  },
  {
    title: "Nutrition Coaching",
    description: "Expert guidance for optimal nutrition and meal planning",
    icon: Heart,
    image: "/lovable-uploads/f3938b12-58fe-4692-9119-459baa4dd348.png",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-black/90" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-5xl font-bold text-white mb-4">
            We Offer Exclusive Services
          </h2>
          <div className="relative">
            <h3 className="text-4xl font-bold text-white mb-8">
              For Build Health
            </h3>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-muscle-red"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/90 z-10"></div>
              <div 
                className="relative h-[300px] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-300"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center justify-center mb-4">
                  <service.icon className="w-12 h-12 text-muscle-red" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2 group-hover:text-muscle-red transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-center text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;