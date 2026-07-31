import OpenAI from 'openai'

type AnalyzeRequest = {
  prompt?: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody<AnalyzeRequest>(event)
  const prompt = body?.prompt?.trim()

  if (!prompt) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Prompt is required',
    })
  }

  if (prompt.length > 20_000) {
    throw createError({
      statusCode: 413,
      statusMessage: 'Prompt is too long',
    })
  }

  if (!config.openaiApiKey) {
    throw createError({
      statusCode: 503,
      statusMessage: 'OPENAI_API_KEY is not configured',
    })
  }

  const client = new OpenAI({
    apiKey: String(config.openaiApiKey),
  })

  try {
    const response = await client.responses.create({
      model: String(config.openaiModel || 'gpt-5.6-terra'),
      reasoning: { effort: 'low' },
      text: { verbosity: 'medium' },
      max_output_tokens: 2_000,
      input: [
        {
          role: 'developer',
          content:
            'You are a career-writing assistant. Return practical, accurate text in the language requested by the user. Do not invent qualifications, employers, or experience.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const result = response.output_text?.trim()

    if (!result) {
      throw new Error('The model returned an empty response')
    }

    return { result }
  } catch (error) {
    console.error('OpenAI analysis failed', {
      name: error instanceof Error ? error.name : 'UnknownError',
      message: error instanceof Error ? error.message : String(error),
    })

    throw createError({
      statusCode: 502,
      statusMessage: 'AI analysis failed',
    })
  }
})
