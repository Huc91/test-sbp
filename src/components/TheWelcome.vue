<script setup>
import WelcomeItem from './WelcomeItem.vue'

const userInput = defineModel('')
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Vue’s
    <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.
  </WelcomeItem>
  <input v-model="userInput" type="input" />
  <p>{{ userInput }}</p>
</template>
