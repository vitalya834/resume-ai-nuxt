<template>
    <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
        <h2 class="text-lg font-bold">Улучшить текст</h2>
  
        <label class="block text-sm">Стиль:</label>
        <select v-model="style" class="w-full border p-2 rounded">
          <option value="formal">Формальный</option>
          <option value="convincing">Убедительный</option>
          <option value="concise">Краткий</option>
        </select>
  
        <textarea v-model="inputText" class="w-full h-40 p-2 border rounded" placeholder="Введите текст..."></textarea>
  
        <div class="flex justify-end gap-2">
          <button @click="emit('close')" class="px-3 py-1 border rounded">Отмена</button>
          <button @click="enhance" :disabled="loading" class="px-3 py-1 bg-blue-600 text-white rounded">
            {{ loading ? 'Обработка...' : 'Улучшить' }}
          </button>
        </div>
  
        <div v-if="result" class="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">
          {{ result }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineEmits, defineProps } from 'vue'
  
  const emit = defineEmits(['close'])
  const props = defineProps({ visible: Boolean })
  
  const style = ref('formal')
  const inputText = ref('')
  const result = ref('')
  const loading = ref(false)
  
  async function enhance() {
    loading.value = true
    result.value = ''
  
    const prompt = `Преобразуй следующий текст в стиле "${style.value}":\n\n${inputText.value}`
  
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
  
      result.value = await res.text()
    } catch (err) {
      result.value = '❌ Ошибка: ' + err.message
    } finally {
      loading.value = false
    }
  }
  </script>
  