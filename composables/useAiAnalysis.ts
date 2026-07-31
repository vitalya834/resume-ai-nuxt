type AnalyzeResponse = {
  result: string
}

export function useAiAnalysis() {
  async function analyze(prompt: string) {
    const normalizedPrompt = prompt.trim()

    if (!normalizedPrompt) {
      throw new Error('Bitte geben Sie zuerst einen Text ein.')
    }

    const response = await $fetch<AnalyzeResponse>('/api/analyze', {
      method: 'POST',
      body: { prompt: normalizedPrompt },
    })

    return response.result
  }

  return { analyze }
}
