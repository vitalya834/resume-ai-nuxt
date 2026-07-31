<template>
  <section class="job-analyzer mt-8">
    <h2 class="mb-4 text-xl font-bold">Stellenanzeige analysieren</h2>
    <textarea
      v-model="jobDescription"
      class="h-40 w-full rounded border p-2"
      placeholder="Beschreibung der Stelle einfügen"
    />
    <button
      class="mt-4 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
      :disabled="loading || !jobDescription.trim()"
      @click="analyzeJob"
    >
      {{ loading ? 'Wird analysiert …' : 'Analysieren' }}
    </button>

    <p v-if="errorMessage" class="mt-6 rounded bg-red-50 p-4 text-red-700">
      {{ errorMessage }}
    </p>

    <div v-if="result" class="mt-6">
      <h3 class="mb-2 font-semibold">Analyse</h3>
      <pre class="whitespace-pre-wrap rounded bg-gray-100 p-4">{{ result }}</pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { analyze } = useAiAnalysis()
const jobDescription = ref('')
const result = ref('')
const errorMessage = ref('')
const loading = ref(false)

async function analyzeJob() {
  loading.value = true
  result.value = ''
  errorMessage.value = ''

  const prompt = `Analysiere die folgende Stellenanzeige auf Deutsch. Gib eine strukturierte Liste der wichtigsten Aufgaben, Muss-Anforderungen, Kann-Anforderungen und Schlüsselbegriffe für eine Bewerbung aus. Erfinde keine Angaben.\n\n${jobDescription.value}`

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

<style scoped>
.job-analyzer {
  max-width: 800px;
  margin: auto;
}
</style>
