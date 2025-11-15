<template>
  <div class="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-[#212529] dark:text-gray-200">
    <!-- TopNavBar -->
    <header class="w-full border-b border-solid border-[#e7cfcf] dark:border-gray-700">
      <nav class="container mx-auto flex items-center justify-between whitespace-nowrap px-6 py-3">
        <div class="flex items-center gap-4">
          <div class="h-8 w-8 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                clip-rule="evenodd"
                d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                fill="currentColor"
                fill-rule="evenodd"
              ></path>
            </svg>
          </div>
          <RouterLink to="/">
            <h2 class="text-lg font-bold leading-tight tracking-[-0.015em]">E-Commerce App</h2>
          </RouterLink>
        </div>
        <div class="hidden md:flex flex-1 justify-end gap-8">
          <div class="flex items-center gap-9">
            <RouterLink to="/products" class="text-sm font-medium leading-normal hover:text-primary">Shop</RouterLink>
            <a class="text-sm font-medium leading-normal hover:text-primary" href="#categories">Categories</a>
            <a class="text-sm font-medium leading-normal hover:text-primary" href="#about">About</a>
          </div>
          <button class="flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary/20 text-primary gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <span class="material-symbols-outlined text-xl">account_circle</span>
          </button>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
        <div class="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div class="text-center">
            <!-- HeadlineText -->
            <h1 class="text-3xl font-bold tracking-tight text-[#212529] dark:text-white">Forgot Password?</h1>
            <!-- BodyText -->
            <p class="mt-2 text-base text-gray-600 dark:text-gray-300">
              Enter the email address associated with your account, and we'll send you a link to reset your password.
            </p>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="mt-4 rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <p class="text-sm font-medium text-red-800 dark:text-red-200">{{ error }}</p>
          </div>

          <!-- Success Message -->
          <div v-if="success" class="mt-4 rounded-md bg-green-50 dark:bg-green-900/20 p-4">
            <p class="text-sm font-medium text-green-800 dark:text-green-200">{{ success }}</p>
          </div>

          <form @submit.prevent="handleSubmit" class="mt-8 space-y-6" method="POST">
            <input name="remember" type="hidden" value="true" />
            <div class="space-y-4 rounded-md">
              <!-- TextField -->
              <div>
                <label class="text-base font-medium leading-normal pb-2 block" for="email-address">Email Address</label>
                <input
                  id="email-address"
                  v-model="form.email"
                  autocomplete="email"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#212529] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#CED4DA] dark:border-gray-600 bg-background-light dark:bg-background-dark h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal"
                  name="email"
                  placeholder="Enter your email"
                  required
                  type="email"
                />
              </div>
            </div>
            <!-- SingleButton -->
            <div class="flex justify-center">
              <button
                type="submit"
                :disabled="loading"
                class="group relative flex w-full justify-center rounded-lg border border-transparent bg-primary py-3 px-4 text-base font-bold text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading">Sending...</span>
                <span v-else>Send Link</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full border-t border-solid border-[#e7cfcf] dark:border-gray-700">
      <div class="container mx-auto px-6 py-8">
        <div class="flex flex-col items-center text-center">
          <div class="flex items-center gap-4">
            <div class="h-8 w-8 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clip-rule="evenodd"
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
            <h2 class="text-lg font-bold">E-Commerce App</h2>
          </div>
          <div class="flex flex-wrap justify-center mt-6 -mx-4">
            <a class="px-4 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:text-primary" href="#">Terms of Service</a>
            <a class="px-4 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:text-primary" href="#">Privacy Policy</a>
            <a class="px-4 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:text-primary" href="#">Contact Us</a>
          </div>
          <p class="mt-6 text-sm text-gray-500 dark:text-gray-400">© 2024 E-Commerce App. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const form = ref({
  email: '',
});

const loading = ref(false);
const error = ref('');
const success = ref('');

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';
  success.value = '';

  try {
    // await authApi.forgotPassword(form.value.email);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    success.value = 'Password reset link has been sent to your email address.';
    form.value.email = '';
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to send reset link. Please try again.';
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

