<template>
  <div class="flex flex-1 items-center justify-center min-h-[60vh]">
    <div class="flex flex-col items-center gap-6 px-4 py-12 text-center">
      <div class="text-primary dark:text-primary">
        <span
          class="material-symbols-outlined"
          style="font-size: 80px"
          aria-hidden="true"
        >
          search_off
        </span>
      </div>
      <div class="flex max-w-lg flex-col items-center gap-4">
        <h1 class="text-black dark:text-white text-6xl md:text-8xl font-bold tracking-tighter">
          404
        </h1>
        <h2
          class="text-black dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em]"
        >
          Oops! Page not found.
        </h2>
        <p class="text-black/70 dark:text-white/70 text-base font-normal leading-normal">
          We can't seem to find the page you're looking for. It might have been moved or doesn't
          exist anymore.
        </p>
      </div>
      <RouterLink
        to="/"
        class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
        aria-label="Go to homepage"
      >
        <span class="truncate">Go to Homepage</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
