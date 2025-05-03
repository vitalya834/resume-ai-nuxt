<template>
    <div class="bg-white p-4 border rounded shadow max-w-xl mx-auto">
      <h2 class="text-lg font-bold mb-4">Настройки API ключей</h2>
  
      <label class="block font-semibold mb-1">Провайдер:</label>
      <select v-model="provider" class="p-2 border rounded w-full mb-4">
        <option value="openai">OpenAI</option>
        <option value="gemini">Gemini</option>
        <option value="claude">Claude</option>
        <option value="grok">Grok</option>
      </select>
  
      <label class="block font-semibold mb-1">API ключ:</label>
      <input
        v-model="apiKey"
        placeholder="sk-..."
        class="p-2 border rounded w-full mb-4"
      />
  
      <div class="flex justify-end gap-2">
        <button @click="clear" class="px-4 py-1 border rounded">Очистить</button>
        <button @click="save" class="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Сохранить</button>
      </div>
  
      <p v-if="saved" class="text-green-600 text-sm mt-2">Ключ сохранён!</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const provider = ref('openai')
  const apiKey = ref('')
  const saved = ref(false)
  
  onMounted(() => {
    const storedProvider = localStorage.getItem('ai-provider')
    const storedKey = localStorage.getItem('ai-key')
    if (storedProvider) provider.value = storedProvider
    if (storedKey) apiKey.value = storedKey
  })
  
  function save() {
    localStorage.setItem('ai-provider', provider.value)
    localStorage.setItem('ai-key', apiKey.value)
  
    // 👉 сохраняем в cookie, чтобы сервер получил
    document.cookie = `ai-provider=${provider.value}; path=/; max-age=31536000`
    document.cookie = `ai-key=${apiKey.value}; path=/; max-age=31536000`
  
    saved.value = true
    setTimeout(() => (saved.value = false), 2000)
  }
  
  function clear() {
    apiKey.value = ''
    localStorage.removeItem('ai-key')
    document.cookie = 'ai-key=; path=/; max-age=0'
    saved.value = false
  }
  </script>
  
  <style scoped>
  select:focus,
  input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
  </style>
  