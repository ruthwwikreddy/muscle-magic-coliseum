import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AIWorkoutSection = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [workout, setWorkout] = useState("");
  const { toast } = useToast();

  const generateWorkout = async () => {
    if (!prompt) {
      toast({
        title: "Please enter your fitness goals",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-workout', {
        body: { prompt }
      });

      if (error) throw error;
      
      if (data.error) {
        throw new Error(data.error);
      }

      setWorkout(data.workout);
      toast({
        title: "Workout plan generated!",
        description: "Scroll down to see your personalized workout plan.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error generating workout",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden" id="ai-workout">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-muscle-red/20 to-black opacity-50" />
      <div className="absolute inset-0 bg-[url('/lovable-uploads/dd687de1-abbc-4090-8743-08782b70f99b.png')] bg-cover bg-center opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Workout Plan <span className="text-muscle-red">Generator</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get personalized workout plans based on your fitness goals and preferences!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Input
              placeholder="e.g., I want to build muscle and improve cardio, training 4 days a week"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-white/10 text-white placeholder:text-gray-400 border-gray-700 flex-1"
            />
            <Button
              onClick={generateWorkout}
              disabled={loading}
              className="bg-muscle-red hover:bg-muscle-red/90 min-w-[120px]"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Generate"}
            </Button>
          </div>

          {workout && (
            <div className="bg-white/10 p-6 rounded-lg border border-gray-700 animate-fade-up">
              <pre className="text-white whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {workout}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIWorkoutSection;