<template>
  <section class="resume-editor">
    <h2 class="mb-4 text-xl font-bold">Lebenslauf</h2>

    <textarea
      v-model="profileText"
      class="h-40 w-full rounded border p-2"
      placeholder="Berufliches Profil eingeben"
    />

    <div class="mt-2 text-right">
      <button
        class="rounded bg-blue-600 px-3 py-1 text-sm text-white"
        @click="showEnhancer = true"
      >
        Profil verbessern
      </button>
    </div>

    <div class="mt-4">
      <label class="mb-1 block font-semibold" for="skill-input">Kenntnisse</label>
      <input
        id="skill-input"
        v-model="skillInput"
        class="w-full rounded border p-2"
        placeholder="Kenntnis eingeben und Enter drücken"
        @keyup.enter="addSkill"
      />
      <div class="mt-2 flex flex-wrap gap-2">
        <span
          v-for="(skill, index) in skills"
          :key="skill"
          class="rounded-full bg-blue-100 px-2 py-1 text-sm"
        >
          {{ skill }}
          <button
            class="ml-1 text-red-600"
            :aria-label="`${skill} entfernen`"
            @click="removeSkill(index)"
          >
            ×
          </button>
        </span>
      </div>
    </div>

    <AIEnhancer :visible="showEnhancer" @close="showEnhancer = false" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const profileText = ref('')
const skillInput = ref('')
const skills = ref<string[]>([])
const showEnhancer = ref(false)

function addSkill() {
  const skill = skillInput.value.trim()
  if (!skill || skills.value.includes(skill)) return

  skills.value.push(skill)
  skillInput.value = ''
}

function removeSkill(index: number) {
  skills.value.splice(index, 1)
}
</script>

<style scoped>
.resume-editor {
  max-width: 800px;
  margin: auto;
}
</style>
