import { Dumbbell, Users, Heart, Brain, Activity, Bike, Apple, Trophy, Video, UserCircle, Group, Timer, Workflow, Weight, Target, Salad } from "lucide-react";

const services = [
  {
    title: "Nutrition Coaching",
    description: "Personalized nutrition plans and guidance for optimal health",
    icon: Apple,
    bgColor: "bg-black",
  },
  {
    title: "Sports-Specific Training",
    description: "Specialized training programs for athletes of all levels",
    icon: Trophy,
    bgColor: "bg-black/90",
  },
  {
    title: "Online/Virtual Training",
    description: "Remote training sessions with expert coaches",
    icon: Video,
    bgColor: "bg-black/80",
  },
  {
    title: "Personal Training",
    description: "One-on-one training sessions tailored to your goals",
    icon: UserCircle,
    bgColor: "bg-black",
  },
  {
    title: "GROUP FITNESS CLASSES",
    description: "Energetic group workouts for all fitness levels",
    icon: Group,
    bgColor: "bg-black/90",
  },
  {
    title: "Cardio Workouts",
    description: "High-intensity cardio sessions for heart health",
    icon: Timer,
    bgColor: "bg-black/80",
  },
  {
    title: "Functional Training",
    description: "Practical exercises for everyday strength and mobility",
    icon: Workflow,
    bgColor: "bg-black",
  },
  {
    title: "Bodyweight Training",
    description: "Effective workouts using your own body weight",
    icon: Weight,
    bgColor: "bg-black/90",
  },
  {
    title: "Specialized Programs",
    description: "Custom programs for specific fitness goals",
    icon: Target,
    bgColor: "bg-black/80",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-black/90" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.bgColor} p-8 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/10`}
            >
              <div className="flex flex-col items-center text-white">
                <service.icon className="w-12 h-12 mb-4 text-muscle-red" />
                <h3 className="text-xl font-bold text-center mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-center text-gray-300">
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