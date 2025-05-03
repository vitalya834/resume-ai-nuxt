<template>
    <div class="space-y-10 max-w-4xl mx-auto mt-10">
      <ResumeEditor />
      <JobAnalyzer />
      <ApiKeySettings />
    </div>
  </template>
  
  <script setup>
  import ResumeEditor from '~/components/ResumeEditor.vue'
  import JobAnalyzer from '~/components/JobAnalyzer.vue'
  import ApiKeySettings from '~/components/ApiKeySettings.vue'
  </script>
  