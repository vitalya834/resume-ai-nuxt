<template>
    <div class="job-analyzer mt-8">
      <h2 class="text-xl font-bold mb-4">Вакансия</h2>
      <textarea
        v-model="jobDescription"
        class="w-full h-40 p-2 border rounded"
        placeholder="Вставьте описание вакансии"
      ></textarea>
      <button
        @click="analyzeJob"
        :disabled="loading"
        class="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {{ loading ? 'Анализирую...' : 'Анализировать' }}
      </button>
  
      <div v-if="result" class="mt-6">
        <h3 class="font-semibold mb-2">Ответ от ИИ:</h3>
        <pre class="bg-gray-100 p-4 rounded whitespace-pre-wrap">{{ result }}</pre>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const jobDescription = ref('')
  const result = ref('')
  const loading = ref(false)
  
  async function analyzeJob() {
    if (!jobDescription.value.trim()) return
  
    loading.value = true
    result.value = ''
  
    const prompt = `Извлеки ключевые навыки и требования из следующего описания вакансии и представь их в виде списка:\n\n\"\"\"\n${jobDescription.value}\n\"\"\"`
  
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
  
      if (!response.ok) throw new Error('Ошибка при запросе к API')
  
      result.value = await response.text()
    } catch (err) {
      result.value = `❌ Ошибка: ${err.message}`
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  .job-analyzer {
    max-width: 800px;
    margin: auto;
  }
  </style>
  