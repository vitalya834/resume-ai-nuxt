<template>
  <section class="anschreiben mt-8">
    <h2 class="mb-4 text-xl font-bold">Anschreiben</h2>

    <textarea
      v-model="vacancy"
      class="mb-4 h-32 w-full rounded border p-2"
      placeholder="Beschreibung der Stelle einfügen"
    />

    <textarea
      v-model="profile"
      class="mb-4 h-32 w-full rounded border p-2"
      placeholder="Lebenslauf oder berufliches Profil einfügen"
    />

    <button
      class="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
      :disabled="loading || !vacancy.trim() || !profile.trim()"
      @click="generate"
    >
      {{ loading ? 'Wird erstellt …' : 'Anschreiben erstellen' }}
    </button>

    <p v-if="errorMessage" class="mt-6 rounded bg-red-50 p-4 text-red-700">
      {{ errorMessage }}
    </p>

    <div v-if="result" class="mt-6">
      <h3 class="mb-2 font-semibold">Ergebnis</h3>
      <pre class="whitespace-pre-wrap rounded bg-gray-100 p-4">{{ result }}</pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { analyze } = useAiAnalysis()
const vacancy = ref('')
const profile = ref('')
const result = ref('')
const errorMessage = ref('')
const loading = ref(false)

async function generate() {
  loading.value = true
  result.value = ''
  errorMessage.value = ''

  const prompt = `Erstelle ein professionelles Anschreiben auf Deutsch. Verwende ausschließlich Fakten aus der Stellenanzeige und dem Profil. Erfinde keine Qualifikationen oder Berufserfahrung.\n\nStellenanzeige:\n${vacancy.value}\n\nProfil:\n${profile.value}`

  try {
    result.value = await analyze(prompt)
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : 'Das Anschreiben konnte nicht erstellt werden.'
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
