<template>
  <div class="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
          <Alert v-if="error" variant="destructive" class="mt-4">
            <AlertDescription>{{ error }}</AlertDescription>
          </Alert>

          <!-- Success Message -->
          <Alert v-if="success" variant="success" class="mt-4">
            <AlertDescription>{{ success }}</AlertDescription>
          </Alert>

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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
    // Forgot password API call will be implemented when backend endpoint is available
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    success.value = 'Password reset link has been sent to your email address.';
    form.value.email = '';
  } catch (err: unknown) {
    const axiosError = err as { response?: { data?: { message?: string } } };
    error.value = axiosError.response?.data?.message || 'Failed to send reset link. Please try again.';
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

