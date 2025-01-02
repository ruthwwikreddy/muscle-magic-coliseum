import { 
  Dumbbell, 
  Users, 
  Heart, 
  Brain, 
  Running, 
  Activity, 
  Workflow, 
  Weight, 
  Laptop,
  Trophy,
  Zap,
  Timer
} from "lucide-react";

const services = [
  {
    title: "Personal Training",
    description: "One-on-one sessions with expert trainers tailored to your goals",
    icon: Dumbbell,
  },
  {
    title: "Sports-Specific Training",
    description: "Programs designed for athletes to improve performance in their specific sport",
    icon: Trophy,
  },
  {
    title: "Online/Virtual Training",
    description: "Expert guidance and workouts from anywhere, anytime",
    icon: Laptop,
  },
  {
    title: "GROUP FITNESS CLASSES",
    description: "High-energy group workouts for all fitness levels",
    icon: Users,
  },
  {
    title: "Cardio Workouts",
    description: "Effective cardio sessions to improve endurance and heart health",
    icon: Running,
  },
  {
    title: "Functional Training",
    description: "Practical exercises that translate to everyday activities",
    icon: Activity,
  },
  {
    title: "Bodyweight Training",
    description: "Master your own body weight with effective exercises",
    icon: Weight,
  },
  {
    title: "Specialized Programs",
    description: "Custom programs for specific goals and needs",
    icon: Workflow,
  },
  {
    title: "Nutrition Coaching",
    description: "Expert guidance for optimal nutrition and diet plans",
    icon: Heart,
  },
  {
    title: "Mental Wellness",
    description: "Holistic approach including stress management",
    icon: Brain,
  },
  {
    title: "Quick HIIT Sessions",
    description: "Time-efficient, high-intensity interval training",
    icon: Timer,
  },
  {
    title: "Power Training",
    description: "Build strength and power with specialized routines",
    icon: Zap,
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              We Offer Exclusive Services
              <br />
              For Build Health
            </h2>
            <div className="h-1 w-20 bg-muscle-red mx-auto mt-4"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6">
            Comprehensive fitness solutions tailored to your goals
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 rounded-lg border border-gray-200 hover:border-muscle-red transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 bg-white animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <service.icon className="w-12 h-12 text-muscle-red mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;