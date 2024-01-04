<script setup>
import DynamicForm from '../components/DynamicForm.vue'
</script>

<template>
  <main>
    <Suspense>
      <DynamicForm></DynamicForm>
      <template #fallback>
        Fetching form data...
      </template>
    </Suspense>

  </main>
</template>
