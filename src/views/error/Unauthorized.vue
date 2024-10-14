<template>
    <div class="misc-wrapper text-center">
      <ErrorHeader
        error-title="Page Not Found :("
        error-description="We couldn't find the page you are looking for."
      />
      <VBtn
        to="/"
        class="mb-12"
      >
        Back to Home
      </VBtn>
  
      <!-- 👉 Image -->
      <div class="misc-avatar w-100 text-center">
        <VImg
          :src="notFound"
          alt="Coming Soon"
          :max-width="200"
          class="mx-auto"
        />
      </div>
      <span class="d-block mt-2">Access denied !!</span>
    </div>
  </template>
  
  <script setup lang="ts">
  import notFound from './404.png'
  
  </script>
  
  <style scoped>
  
  </style>