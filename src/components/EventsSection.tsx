import { Button } from "./ui/button";
import { Calendar } from "lucide-react";

const EventsSection = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Fitness Workshop",
      date: "March 15, 2024",
      time: "10:00 AM - 12:00 PM",
      description: "Join us for an intensive fitness workshop focused on proper form and technique.",
    },
    {
      id: 2,
      title: "Nutrition Seminar",
      date: "March 20, 2024",
      time: "2:00 PM - 4:00 PM",
      description: "Learn about proper nutrition and meal planning for optimal fitness results.",
    },
    {
      id: 3,
      title: "Community Workout",
      date: "March 25, 2024",
      time: "9:00 AM - 11:00 AM",
      description: "Group workout session followed by healthy breakfast and networking.",
    },
  ];

  return (
    <section id="events" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Upcoming Events</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join our community events and take your fitness journey to the next level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-zinc-900 rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center mb-4">
                <Calendar className="text-muscle-red mr-2" />
                <div>
                  <p className="text-white font-semibold">{event.date}</p>
                  <p className="text-gray-400 text-sm">{event.time}</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
              <p className="text-gray-400 mb-4">{event.description}</p>
              <Button 
                variant="outline" 
                className="w-full border-muscle-red text-muscle-red hover:bg-muscle-red hover:text-white"
              >
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