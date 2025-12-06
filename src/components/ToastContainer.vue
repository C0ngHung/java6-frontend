<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <TransitionGroup name="toast" tag="div">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg min-w-[300px] max-w-[500px]',
            toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
          ]"
        >
          <span class="material-symbols-outlined">
            {{ toast.type === 'success' ? 'check_circle' : 'error' }}
          </span>
          <p class="flex-1 text-sm font-medium">{{ toast.message }}</p>
          <button
            @click="removeToast(toast.id)"
            class="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            type="button"
          >
            <span class="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast';

const { toasts, removeToast } = useToast();
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>

