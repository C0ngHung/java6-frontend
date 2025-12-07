<template>
  <div class="flex flex-1 items-center justify-center min-h-[60vh]">
    <div class="flex flex-col items-center gap-4">
      <div class="text-primary">
        <span
          class="material-symbols-outlined text-4xl animate-spin"
          aria-hidden="true"
          role="status"
          aria-live="polite"
        >
          sync
        </span>
      </div>
      <p class="text-black dark:text-white text-base font-normal" role="status" aria-live="polite">
        Đang đăng xuất...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ROUTES } from '@/constants';

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    await authStore.logout();
  } catch {
    // Silently handle error - logout will clear local state anyway
  } finally {
    router.push({ path: ROUTES.HOME });
  }
});
</script>

