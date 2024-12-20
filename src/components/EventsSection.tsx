import { Calendar, Trophy } from "lucide-react";
import { Button } from "./ui/button";

const events = [
  {
    title: "Summer Fitness Challenge",
    date: "June 1-30, 2024",
    description: "Join our 30-day transformation challenge with amazing prizes!",
    icon: Trophy,
  },
  {
    title: "Yoga Workshop",
    date: "May 15, 2024",
    description: "Learn advanced yoga poses with our expert instructors.",
    icon: Calendar,
  },
];

const EventsSection = () => {
  return (
    <section className="py-20 bg-white" id="events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            Join Our Fitness Events and Challenges
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Participate in our exciting events and push your limits
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-lg hover:border-muscle-red transition-colors"
            >
              <event.icon className="w-12 h-12 text-muscle-red mb-4" />
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <p className="text-muscle-red font-semibold mb-4">{event.date}</p>
              <Button className="bg-muscle-red hover:bg-muscle-red/90">
                Register Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;