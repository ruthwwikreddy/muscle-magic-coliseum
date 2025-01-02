import { Dumbbell, Users, Heart, Brain } from "lucide-react";

const services = [
  {
    title: "Personal Training",
    description: "One-on-one sessions with expert trainers tailored to your goals",
    icon: Dumbbell,
  },
  {
    title: "Group Classes",
    description: "High-energy group workouts for all fitness levels",
    icon: Users,
  },
  {
    title: "Nutrition Coaching",
    description: "Personalized nutrition plans to complement your training",
    icon: Heart,
  },
  {
    title: "Mental Wellness",
    description: "Holistic approach to fitness including stress management",
    icon: Brain,
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            Our Premium Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of services to help you achieve your fitness goals
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-6 rounded-lg border border-gray-200 hover:border-muscle-red transition-colors"
            >
              <service.icon className="w-12 h-12 text-muscle-red mb-4" />
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;