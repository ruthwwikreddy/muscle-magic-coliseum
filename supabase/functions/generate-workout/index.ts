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

    // Create a default workout template since the API might not provide enough structure
    const defaultWorkouts = [
      {
        name: 'Full Body Workout',
        description: 'Focus on compound exercises targeting all major muscle groups',
        type: 'strength'
      },
      {
        name: 'Cardio Session',
        description: 'Mix of high-intensity intervals and steady-state cardio',
        type: 'cardio'
      },
      {
        name: 'Recovery and Flexibility',
        description: 'Light stretching and mobility work',
        type: 'recovery'
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
  // Create a structured workout plan based on available workouts
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  let plan = `7-Day Workout Plan Based on Your Goals: ${userGoals}\n\n`;

  days.forEach((day, index) => {
    const workout = workouts[index % workouts.length];
    plan += `${day}:\n`;
    
    // Safely access workout properties with detailed fallbacks based on the day
    if (index % 3 === 0) {
      plan += `- Workout: ${workout?.name || 'Strength Training'}\n`;
      plan += `- Description: ${workout?.description || 'Focus on compound exercises: squats, deadlifts, bench press, rows'}\n`;
    } else if (index % 3 === 1) {
      plan += `- Workout: ${workout?.name || 'Cardio Session'}\n`;
      plan += `- Description: ${workout?.description || '30 minutes of cardio combining HIIT and steady-state training'}\n`;
    } else {
      plan += `- Workout: ${workout?.name || 'Recovery Day'}\n`;
      plan += `- Description: ${workout?.description || 'Light stretching, mobility work, and active recovery'}\n`;
    }
    
    plan += `- Focus: ${workout?.type || (index % 2 === 0 ? 'Strength' : 'Cardio/Recovery')}\n\n`;
  });

  plan += "\nNotes:\n";
  plan += "- Always warm up before starting your workout\n";
  plan += "- Stay hydrated throughout your sessions\n";
  plan += "- Listen to your body and adjust intensity as needed\n";
  plan += "- Consult with a healthcare professional before starting any new exercise program";

  return plan;
}