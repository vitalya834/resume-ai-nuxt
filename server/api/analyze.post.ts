export default defineEventHandler(async (event) => {
    const cookieProvider = getCookie(event, 'ai-provider') || 'openai'
    const cookieKey = getCookie(event, 'ai-key')
    const prompt = (await readBody(event)).prompt
  
    if (!cookieKey) {
      throw createError({
        statusCode: 400,
        statusMessage: 'API ключ не найден'
      })
    }
  
    let url = ''
    let requestBody = {}
  
    switch (cookieProvider) {
      case 'openai':
        url = 'https://api.openai.com/v1/chat/completions'
        requestBody = {
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.5
        }
        break
  
      // другие провайдеры позже
      default:
        throw createError({
          statusCode: 400,
          statusMessage: 'Провайдер не поддерживается'
        })
    }
  
    // 👇 Добавляем типизацию ответа от OpenAI
    type OpenAIResponse = {
      choices: { message: { content: string } }[]
    }
  
    const response = await $fetch<OpenAIResponse>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookieKey}`
      },
      body: requestBody
    })
  
    return response.choices?.[0]?.message?.content || 'Пустой ответ'
  })
  