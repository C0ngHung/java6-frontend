<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-24">
    <div class="flex items-center justify-center min-h-[60vh]">
      <div class="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div class="hidden md:flex justify-center">
                <img
                  class="w-full max-w-md h-auto object-cover rounded-xl"
                  data-alt="A person holding a smartphone and several colorful shopping bags."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhUu-YSgIYLAbO1OfPH0Ta9xI7tFdzz11zGN0bex4IyCwpWbs4kuh4Af0Iml5hHSjWRn1XTvoiFDELdRGF-CXAuIhMdKfXxPNlLtoxbqM49qfLOvEM3wAjhxu-uaXTFPBBd55d4bR7yx_0T96ty0g-S4TIVrFIkH2McCkYNMndVqE4mvaumoeVCt4KSjgVhiZavyl4P4dM2nnhNsmU6UiCVCb06MoJjsRQv7RMh09cFlRdBxsDAvjqQjoQztsYg9f0BEx8H6LK0qA"
                />
              </div>
              <div class="w-full max-w-md mx-auto">
                <div class="flex flex-col gap-6 text-left">
                  <div class="flex flex-col gap-2">
                    <h1 class="text-[#212529] dark:text-gray-100 text-3xl font-black leading-tight tracking-[-0.03em] md:text-4xl">Set a New Password</h1>
                  </div>

                  <!-- Error Message -->
                  <div v-if="error" class="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                    <p class="text-sm font-medium text-red-800 dark:text-red-200">{{ error }}</p>
                  </div>

                  <!-- Success Message -->
                  <div v-if="success" class="rounded-md bg-green-50 dark:bg-green-900/20 p-4">
                    <p class="text-sm font-medium text-green-800 dark:text-green-200">{{ success }}</p>
                  </div>

                  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
                    <label class="flex flex-col w-full">
                      <span class="text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">New Password</span>
                      <div class="flex w-full flex-1 items-stretch rounded-lg h-12">
                        <input
                          v-model="form.newPassword"
                          class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#212529] dark:text-gray-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-gray-800 focus:border-primary/50 h-full placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 text-sm font-normal leading-normal md:text-base"
                          placeholder="Enter new password"
                          type="password"
                          required
                          minlength="6"
                        />
                      </div>
                    </label>
                    <label class="flex flex-col w-full">
                      <span class="text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Confirm New Password</span>
                      <div class="flex w-full flex-1 items-stretch rounded-lg h-12">
                        <input
                          v-model="form.confirmPassword"
                          class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#212529] dark:text-gray-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-gray-800 focus:border-primary/50 h-full placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 text-sm font-normal leading-normal md:text-base"
                          placeholder="Confirm new password"
                          type="password"
                          required
                          minlength="6"
                        />
                      </div>
                    </label>
                    <button
                      type="submit"
                      :disabled="loading || form.newPassword !== form.confirmPassword"
                      class="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span v-if="loading">Resetting...</span>
                      <span v-else>Reset Password</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const form = ref({
  newPassword: '',
  confirmPassword: '',
  token: '',
});

const loading = ref(false);
const error = ref('');
const success = ref('');

onMounted(() => {
  // Get token from query params if available
  const token = route.query.token as string;
  if (token) {
    form.value.token = token;
  }
});

const handleSubmit = async () => {
  if (form.value.newPassword !== form.value.confirmPassword) {
    error.value = 'Passwords do not match.';
    return;
  }

  if (form.value.newPassword.length < 6) {
    error.value = 'Password must be at least 6 characters long.';
    return;
  }

  loading.value = true;
  error.value = '';
  success.value = '';

  try {
    // await authApi.resetPassword(token, form.value.password);
    // await authApi.resetPassword(form.value.token, form.value.newPassword);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    success.value = 'Password has been reset successfully. Redirecting to login...';
    setTimeout(() => {
      router.push({ name: 'Login' });
    }, 2000);
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to reset password. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>

