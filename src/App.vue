<script setup></script>

<template>
  <Suspense>
    <RouterView />
    <template #fallback>loading...</template>
  </Suspense>
</template>
