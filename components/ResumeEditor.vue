<template>
    <div class="resume-editor">
      <h2 class="text-xl font-bold mb-4">Резюме</h2>
  
      <textarea
        v-model="profileText"
        class="w-full h-40 p-2 border rounded"
        placeholder="Введите ваш профиль"
      ></textarea>
  
      <div class="mt-2 text-right">
        <button
          @click="showEnhancer = true"
          class="px-3 py-1 bg-blue-600 text-white rounded text-sm"
        >
          Улучшить профиль
        </button>
      </div>
  
      <div class="mt-4">
        <label class="block font-semibold mb-1">Навыки:</label>
        <input
          v-model="skillInput"
          @keyup.enter="addSkill"
          placeholder="Введите навык и нажмите Enter"
          class="p-2 border rounded w-full"
        />
        <div class="flex flex-wrap mt-2 gap-2">
          <span
            v-for="(skill, index) in skills"
            :key="index"
            class="bg-blue-100 px-2 py-1 rounded-full text-sm"
          >
            {{ skill }}
            <button @click="removeSkill(index)" class="ml-1 text-red-500">×</button>
          </span>
        </div>
      </div>
  
      <!-- Модальное окно улучшения -->
      <AIEnhancer
        :visible="showEnhancer"
        @close="showEnhancer = false"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import AIEnhancer from '~/components/AIEnhancer.vue'
  
  const profileText = ref('')
  const skillInput = ref('')
  const skills = ref([])
  const showEnhancer = ref(false)
  
  function addSkill() {
    if (skillInput.value.trim()) {
      skills.value.push(skillInput.value.trim())
      skillInput.value = ''
    }
  }
  
  function removeSkill(index) {
    skills.value.splice(index, 1)
  }
  </script>
  
  <style scoped>
  .resume-editor {
    max-width: 800px;
    margin: auto;
  }
  </style>
  