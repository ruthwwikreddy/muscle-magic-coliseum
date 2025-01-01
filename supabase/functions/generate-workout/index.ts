import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const WGER_API_TOKEN = '2cc59dab843249be079aa21f30944afb0383f496';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    console.log('Fetching workout plans, user goals:', prompt);

    // Fetch workouts from wger API
    const response = await fetch('https://wger.de/api/v2/workout/', {
      headers: {
        'Authorization': `Token ${WGER_API_TOKEN}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Wger API Error Status:', response.status);
      const errorText = await response.text();
      console.error('Wger API Error Response:', errorText);
      throw new Error('Failed to fetch workout plans');
    }

    const data = await response.json();
    console.log('Raw API Response:', JSON.stringify(data));

    // Create a detailed workout template with specific exercises, sets, and reps
    const defaultWorkouts = [
      {
        name: 'Full Body Strength',
        description: 'Compound exercises for overall strength',
        type: 'strength',
        exercises: [
          { name: 'Barbell Squats', sets: 4, reps: '8-10', notes: 'Focus on form and depth' },
          { name: 'Bench Press', sets: 4, reps: '8-12', notes: 'Control the negative' },
          { name: 'Deadlifts', sets: 3, reps: '6-8', notes: 'Keep back straight' },
          { name: 'Pull-ups', sets: 3, reps: '8-12', notes: 'Use assistance if needed' }
        ]
      },
      {
        name: 'HIIT Cardio',
        description: 'High-intensity interval training',
        type: 'cardio',
        exercises: [
          { name: 'Burpees', sets: 4, reps: '30 seconds', notes: 'Maximum effort' },
          { name: 'Mountain Climbers', sets: 4, reps: '45 seconds', notes: 'Keep core tight' },
          { name: 'Jump Rope', sets: 4, reps: '1 minute', notes: 'Stay light on feet' },
          { name: 'Sprints', sets: 6, reps: '30 seconds', notes: '30 seconds rest between sets' }
        ]
      },
      {
        name: 'Upper Body Focus',
        description: 'Targeting chest, back, and arms',
        type: 'strength',
        exercises: [
          { name: 'Dumbbell Press', sets: 4, reps: '10-12', notes: 'Full range of motion' },
          { name: 'Bent-Over Rows', sets: 4, reps: '12-15', notes: 'Squeeze shoulder blades' },
          { name: 'Tricep Dips', sets: 3, reps: '12-15', notes: 'Body weight to start' },
          { name: 'Bicep Curls', sets: 3, reps: '12-15', notes: 'Control the movement' }
        ]
      }
    ];

    // Use API data if available, otherwise fall back to default workouts
    const workouts = (data.results && Array.isArray(data.results) && data.results.length > 0)
      ? data.results
      : defaultWorkouts;

    console.log('Processing workouts:', workouts.length);

    // Process the workouts and create a structured plan
    const workoutPlan = processWorkouts(workouts, prompt);

    return new Response(
      JSON.stringify({ workout: workoutPlan }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error generating workout:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate workout plan. Please try again.',
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

function processWorkouts(workouts: any[], userGoals: string): string {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  let plan = `7-Day Workout Plan Based on Your Goals: ${userGoals}\n\n`;

  days.forEach((day, index) => {
    const workout = workouts[index % workouts.length];
    plan += `${day}:\n`;
    plan += `🏋️ Workout: ${workout?.name || 'Rest Day'}\n`;
    plan += `📝 Description: ${workout?.description || 'Recovery and mobility work'}\n`;
    plan += `💪 Type: ${workout?.type || (index % 2 === 0 ? 'Strength' : 'Cardio')}\n\n`;

    // Add detailed exercise information if available
    if (workout?.exercises) {
      plan += "Exercises:\n";
      workout.exercises.forEach((exercise: any, i: number) => {
        plan += `${i + 1}. ${exercise.name}\n`;
        plan += `   • Sets: ${exercise.sets}\n`;
        plan += `   • Reps: ${exercise.reps}\n`;
        plan += `   • Notes: ${exercise.notes}\n\n`;
      });
    } else if (index % 3 === 0) {
      // Fallback strength workout
      plan += "Exercises:\n";
      plan += "1. Barbell Squats\n";
      plan += "   • Sets: 4\n";
      plan += "   • Reps: 8-10\n";
      plan += "   • Notes: Focus on form and depth\n\n";
      plan += "2. Bench Press\n";
      plan += "   • Sets: 4\n";
      plan += "   • Reps: 8-12\n";
      plan += "   • Notes: Control the negative\n\n";
    } else if (index % 3 === 1) {
      // Fallback cardio workout
      plan += "Exercises:\n";
      plan += "1. High Knees\n";
      plan += "   • Sets: 4\n";
      plan += "   • Reps: 45 seconds\n";
      plan += "   • Notes: Maintain high intensity\n\n";
      plan += "2. Mountain Climbers\n";
      plan += "   • Sets: 4\n";
      plan += "   • Reps: 30 seconds\n";
      plan += "   • Notes: Keep core engaged\n\n";
    }
  });

  plan += "\nImportant Notes:\n";
  plan += "✓ Always warm up properly before starting your workout\n";
  plan += "✓ Stay hydrated throughout your sessions\n";
  plan += "✓ Rest 60-90 seconds between sets for strength exercises\n";
  plan += "✓ Adjust weights and intensity based on your fitness level\n";
  plan += "✓ Listen to your body and avoid overtraining\n";
  plan += "✓ Consult with a healthcare professional before starting any new exercise program";

  return plan;
}