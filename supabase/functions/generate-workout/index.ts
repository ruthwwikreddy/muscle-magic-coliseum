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
    
    const systemPrompt = `Create a detailed 4-week workout plan that includes:
    1. Weekly schedule with specific exercises
    2. Sets and reps for each exercise
    3. Rest periods
    4. Progressive overload strategy
    Based on these fitness goals: ${prompt}

    Format the response as a structured workout plan with clear sections.
    Workout Plan:`

    const response = await hf.textGeneration({
      model: 'google/flan-t5-large',
      inputs: systemPrompt,
      parameters: {
        max_new_tokens: 250,
        temperature: 0.8,
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