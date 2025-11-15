<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-32 items-center">
        <!-- Image Section (Hidden on mobile) -->
        <div class="hidden lg:flex justify-center items-center p-4 lg:p-8">
          <img
            alt="Smartphone with a shopping cart and pink shopping bags"
            class="max-w-full h-auto object-contain max-h-[600px]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCgKPIpBwwa3GUeyAFAco1XAZ6XZ2PywJ5uygEmOmwwYh90yxat8E4UYGOxAvwZhAUG400UFPN_2Eq0odhPSZw-8waSwv2MI1cd6ecpTcHxvnge4NH515h6YGw42v11mdGCvgMaEkD7dDAvoZly4qNK58NJttsoG7EMgN9V1ZarwqLOj9g_ZnmhvekvjcOSgXPwYgr1v0JUXpWoXCpJkqJQ1zT-CNiDiG8K0TEvWWHcHd8_2WadwmaqdzWJrUXsm6okBesQG0q8w0"
          />
        </div>

          <!-- Login Form Section -->
          <div class="flex flex-col justify-center w-full max-w-md mx-auto lg:mx-0">
            <div class="text-left space-y-4 mb-8 sm:mb-10">
              <h1 class="text-2xl sm:text-3xl font-display font-medium tracking-wide">Đăng nhập</h1>
              <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300">Nhập thông tin đăng nhập của bạn</p>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="mb-4 rounded-md bg-red-50 dark:bg-red-900/20 p-4">
              <p class="text-sm font-medium text-red-800 dark:text-red-200">{{ error }}</p>
            </div>

            <!-- Success Message -->
            <div v-if="success" class="mb-4 rounded-md bg-green-50 dark:bg-green-900/20 p-4">
              <p class="text-sm font-medium text-green-800 dark:text-green-200">{{ success }}</p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-6 sm:space-y-8">
              <div class="space-y-6 sm:space-y-8">
                <!-- Username Input -->
                <div class="relative">
                  <input
                    id="username"
                    v-model="form.username"
                    class="w-full border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent py-2 focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white transition-colors peer"
                    placeholder=" "
                    type="text"
                    required
                    autocomplete="username"
                  />
                  <label
                    class="absolute left-0 -top-3.5 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                    for="username"
                  >
                    Username
                  </label>
                </div>

                <!-- Password Input -->
                <div class="relative">
                  <input
                    id="password"
                    v-model="form.password"
                    class="w-full border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent py-2 focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white transition-colors peer"
                    placeholder=" "
                    type="password"
                    required
                    autocomplete="current-password"
                  />
                  <label
                    class="absolute left-0 -top-3.5 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-500 dark:peer-focus:text-gray-400"
                    for="password"
                  >
                    Password
                  </label>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full sm:w-1/2 bg-primary text-white font-medium py-3 sm:py-4 px-6 rounded-DEFAULT hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <span v-if="loading">Đang đăng nhập...</span>
                  <span v-else>Đăng nhập</span>
                </button>
                <RouterLink to="/forgot-password" class="text-primary hover:underline text-sm sm:text-base w-full sm:w-auto text-center sm:text-left">
                  Quên mật khẩu?
                </RouterLink>
              </div>
            </form>

            <!-- Sign Up Link -->
            <div class="mt-6 sm:mt-8 text-center">
              <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Chưa có tài khoản?
                <RouterLink to="/register" class="font-medium text-primary hover:text-red-600 underline">
                  Đăng ký ngay
                </RouterLink>
              </p>
            </div>
          </div>
        </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const form = ref({
  username: '',
  password: '',
});

const loading = ref(false);
const error = ref('');
const success = ref('');

onMounted(() => {
  if (route.query.registered === 'true') {
    success.value = 'Đăng ký thành công! Vui lòng đăng nhập.';
  }
  if (route.query.activated === 'true') {
    success.value = 'Tài khoản đã được kích hoạt thành công! Vui lòng đăng nhập.';
  }
});

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  success.value = '';

  try {
    await authStore.login(form.value.username, form.value.password);
    const redirect = route.query.redirect as string;
    router.push(redirect || '/dashboard');
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0] || 'Đăng nhập thất bại. Vui lòng thử lại.';
    
    // Handle specific error codes
    if (err.response?.data?.errorCode === 'ACCOUNT_NOT_ACTIVATED') {
      error.value = 'Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt tài khoản.';
    } else {
      error.value = errorMessage;
    }
  } finally {
    loading.value = false;
  }
};
</script>
