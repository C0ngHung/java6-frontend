<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
    <div class="layout-container flex h-full grow flex-col">
      <div class="px-4 lg:px-10 xl:px-20 flex flex-1 justify-center py-5">
        <div class="layout-content-container flex flex-col max-w-7xl flex-1">
          <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700 px-4 md:px-10 py-3">
            <div class="flex items-center gap-4 text-[#212529] dark:text-gray-100">
              <div class="size-6">
                <span class="material-symbols-outlined text-3xl">shopping_bag</span>
              </div>
              <RouterLink to="/">
                <h2 class="text-[#212529] dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em]">E-commerce App</h2>
              </RouterLink>
            </div>
            <div class="hidden md:flex flex-1 justify-end gap-8">
              <div class="flex items-center gap-9">
                <RouterLink to="/" class="text-[#212529] dark:text-gray-300 text-sm font-medium leading-normal">Home</RouterLink>
                <RouterLink to="/products" class="text-[#212529] dark:text-gray-300 text-sm font-medium leading-normal">Shop</RouterLink>
                <a class="text-[#212529] dark:text-gray-300 text-sm font-medium leading-normal" href="#deals">Deals</a>
                <a class="text-[#212529] dark:text-gray-300 text-sm font-medium leading-normal" href="#contact">Contact</a>
              </div>
              <div class="flex gap-2">
                <RouterLink
                  to="/register"
                  class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span class="truncate">Sign Up</span>
                </RouterLink>
                <RouterLink
                  to="/login"
                  class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-gray-800 text-[#212529] dark:text-gray-100 text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span class="truncate">Log In</span>
                </RouterLink>
              </div>
            </div>
            <div class="md:hidden">
              <span class="material-symbols-outlined text-[#212529] dark:text-gray-100 text-2xl">menu</span>
            </div>
          </header>

          <main class="flex-grow flex items-center justify-center py-12 px-4">
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
          </main>
        </div>
      </div>
    </div>

    <footer class="flex flex-col gap-6 px-5 py-10 text-center border-t border-solid border-gray-200 dark:border-gray-700">
      <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        <a class="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal" href="#">About Us</a>
        <a class="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal" href="#">Privacy Policy</a>
        <a class="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal" href="#">Terms of Service</a>
      </div>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="#">
          <svg class="text-gray-500 dark:text-gray-400" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </a>
        <a href="#">
          <svg class="text-gray-500 dark:text-gray-400" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 2.8 3.2 3 5.2-1.4 1.2-3.1 2-4.9 2.4-1.1 2.5-3.1 4.5-5.5 5.6-2.6 1.2-5.5 1.1-8.1-.1-2.9-1.3-5.2-3.5-6.6-6.3-1.3-2.7-1.4-5.8-.3-8.5 1.1-2.8 3.2-5.2 5.9-6.6 2.8-1.4 6-1.5 8.9-.4 2.9 1.2 5.3 3.3 6.9 6Z"></path>
            <path d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path>
            <path d="M12 20c-3 0-6-2-8-4a8.5 8.5 0 0 1 16 0c-2 2-5 4-8 4Z"></path>
          </svg>
        </a>
        <a href="#">
          <svg class="text-gray-500 dark:text-gray-400" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
          </svg>
        </a>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">© 2024 E-commerce App. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

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

