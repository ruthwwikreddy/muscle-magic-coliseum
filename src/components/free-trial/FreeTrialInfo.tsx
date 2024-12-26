const FreeTrialInfo = () => {
  return (
    <div className="space-y-6 animate-fade-up">
      <h2 className="text-4xl font-bold text-black mb-6 relative">
        Book a Free Two-Day Trial and Experience Our Gym!
        <span className="absolute bottom-0 left-0 w-20 h-1 bg-muscle-red"></span>
      </h2>
      <ul className="space-y-4 mb-8">
        <li className="flex items-center text-gray-600 hover:text-muscle-red transition-colors">
          <span className="w-2 h-2 bg-muscle-red rounded-full mr-3"></span>
          Meet Our Expert Trainers
        </li>
        <li className="flex items-center text-gray-600 hover:text-muscle-red transition-colors">
          <span className="w-2 h-2 bg-muscle-red rounded-full mr-3"></span>
          Explore Our State-of-the-Art Facilities
        </li>
        <li className="flex items-center text-gray-600 hover:text-muscle-red transition-colors">
          <span className="w-2 h-2 bg-muscle-red rounded-full mr-3"></span>
          Join Exciting Group Classes
        </li>
      </ul>
      <img
        src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        alt="Trainer with client"
        className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-fade-up"
      />
    </div>
  );
};

export default FreeTrialInfo;