<template>
    <div class="anschreiben mt-8">
      <h2 class="text-xl font-bold mb-4">Сопроводительное письмо</h2>
  
      <textarea
        v-model="vacancy"
        class="w-full h-32 p-2 border rounded mb-4"
        placeholder="Вставьте описание вакансии"
      ></textarea>
  
      <textarea
        v-model="profile"
        class="w-full h-32 p-2 border rounded mb-4"
        placeholder="Вставьте ваше резюме/профиль"
      ></textarea>
  
      <button
        @click="generate"
        :disabled="loading"
        class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        {{ loading ? 'Генерация...' : 'Сгенерировать письмо' }}
      </button>
  
      <div v-if="result" class="mt-6">
        <h3 class="font-semibold mb-2">Результат:</h3>
        <pre class="bg-gray-100 p-4 rounded whitespace-pre-wrap">{{ result }}</pre>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const vacancy = ref('')
  const profile = ref('')
  const result = ref('')
  const loading = ref(false)
  
  async function generate() {
    if (!vacancy.value || !profile.value) return
  
    loading.value = true
    result.value = ''
  
    const prompt = `На основе следующего описания вакансии и моего профиля, сгенерируй качественное сопроводительное письмо на немецком языке:\n\nВакансия:\n${vacancy.value}\n\nПрофиль:\n${profile.value}`
  
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
  
      result.value = await response.text()
    } catch (err) {
      result.value = '❌ Ошибка: ' + err.message
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  .anschreiben {
    max-width: 800px;
    margin: auto;
  }
  </style>
  