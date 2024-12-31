import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()
    const hf = new HfInference(Deno.env.get('HUGGING_FACE_ACCESS_TOKEN'))
    
    console.log('Generating workout plan for prompt:', prompt)
    
    const systemPrompt = `Create a 4-day workout plan with specific exercises for each day:

Day 1 (Focus):
[List exercises with sets, reps, and rest periods]

Day 2 (Focus):
[List exercises with sets, reps, and rest periods]

Day 3 (Focus):
[List exercises with sets, reps, and rest periods]

Day 4 (Focus):
[List exercises with sets, reps, and rest periods]

Rest and Recovery:
[Recommendations for rest days]

Based on these fitness goals: ${prompt}

Important: Include 2-3 exercises per day with specific sets, reps, and rest times.`

    const response = await hf.textGeneration({
      model: 'google/flan-t5-large',
      inputs: systemPrompt,
      parameters: {
        max_new_tokens: 250,
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.15
      }
    })

    console.log('Successfully generated workout plan')

    return new Response(
      JSON.stringify({ workout: response.generated_text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error generating workout:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate workout plan. Please try again.',
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})