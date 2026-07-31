<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
  >
    <div class="w-full max-w-md space-y-4 rounded bg-white p-6 shadow-lg">
      <h2 class="text-lg font-bold">Text verbessern</h2>

      <label class="block text-sm" for="writing-style">Stil</label>
      <select id="writing-style" v-model="style" class="w-full rounded border p-2">
        <option value="formal">Formell</option>
        <option value="convincing">Überzeugend</option>
        <option value="concise">Prägnant</option>
      </select>

      <textarea
        v-model="inputText"
        class="h-40 w-full rounded border p-2"
        placeholder="Text eingeben …"
      />

      <div class="flex justify-end gap-2">
        <button class="rounded border px-3 py-1" @click="emit('close')">
          Abbrechen
        </button>
        <button
          class="rounded bg-blue-600 px-3 py-1 text-white disabled:opacity-50"
          :disabled="loading || !inputText.trim()"
          @click="enhance"
        >
          {{ loading ? 'Wird verarbeitet …' : 'Verbessern' }}
        </button>
      </div>

      <p v-if="errorMessage" class="rounded bg-red-50 p-3 text-sm text-red-700">
        {{ errorMessage }}
      </p>

      <div v-if="result" class="whitespace-pre-wrap rounded bg-gray-100 p-3 text-sm">
        {{ result }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ visible: boolean }>()
const emit = defineEmits<{ close: [] }>()
const { analyze } = useAiAnalysis()

const style = ref('formal')
const inputText = ref('')
const result = ref('')
const errorMessage = ref('')
const loading = ref(false)

async function enhance() {
  loading.value = true
  result.value = ''
  errorMessage.value = ''

  const prompt = `Überarbeite den folgenden Text auf Deutsch. Stil: ${style.value}. Bewahre alle Fakten und erfinde keine Erfahrungen oder Qualifikationen.\n\n${inputText.value}`

  try {
    result.value = await analyze(prompt)
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : 'Die Analyse ist fehlgeschlagen.'
  } finally {
    loading.value = false
  }
}
</script>
