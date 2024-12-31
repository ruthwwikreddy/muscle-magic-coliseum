import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://player.vimeo.com/external/414874637.sd.mp4?s=8b61fad50afa7c3e5ddf1f3c5b6a4f2f3c0f4f0b&profile_id=165&oauth2_token_id=57447761"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <img 
          src="/lovable-uploads/d902d0f3-2418-41fb-a6ff-38e04f540be6.png"
          alt="Muscle Works Logo"
          className="w-48 h-auto mx-auto mb-8 animate-fade-up"
        />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 animate-fade-up">
          Reach Your Fitness Goals Faster with{" "}
          <span className="text-muscle-red">Expert Personal Training!</span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-up">
          Join the biggest gym in Jubilee Hills with expert trainers and personalized programs
        </p>
        <Button size="lg" className="bg-muscle-red hover:bg-muscle-red/90 animate-fade-up">
          Join Us Today
        </Button>
      </div>
    </div>
  );
};

export default Hero;