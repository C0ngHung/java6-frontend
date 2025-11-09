<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Registration Form Step -->
      <div v-if="step === 'register'">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Or
            <RouterLink
              to="/login"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign in to your existing account
            </RouterLink>
          </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
          <div class="rounded-md shadow-sm space-y-4">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                v-model="form.username"
                name="username"
                type="text"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="fullName"
                v-model="form.fullName"
                name="fullName"
                type="text"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">Phone (Optional)</label>
              <input
                id="phone"
                v-model="form.phone"
                name="phone"
                type="tel"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Phone"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                required
                minlength="6"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password (min 6 characters)"
              />
            </div>
          </div>

          <div v-if="error" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  {{ error }}
                </h3>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Creating account...</span>
              <span v-else>Register</span>
            </button>
          </div>
        </form>
      </div>

      <!-- OTP Verification Step -->
      <div v-if="step === 'otp'">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            We've sent a verification code to
            <span class="font-medium text-gray-900">{{ registeredEmail }}</span>
          </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleVerifyOtp">
          <div class="rounded-md shadow-sm space-y-4">
            <div>
              <label for="otp" class="block text-sm font-medium text-gray-700">Verification Code</label>
              <input
                id="otp"
                v-model="otpForm.otp"
                name="otp"
                type="text"
                required
                maxlength="6"
                pattern="[0-9]{6}"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center text-2xl tracking-widest"
                placeholder="000000"
                @input="handleOtpInput"
              />
              <p class="mt-1 text-xs text-gray-500">Enter the 6-digit code sent to your email</p>
            </div>
          </div>

          <div v-if="error" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  {{ error }}
                </h3>
              </div>
            </div>
          </div>

          <div v-if="success" class="rounded-md bg-green-50 p-4">
            <div class="flex">
              <div class="ml-3">
                <h3 class="text-sm font-medium text-green-800">
                  {{ success }}
                </h3>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <button
              type="submit"
              :disabled="loading || otpForm.otp.length !== 6"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Verifying...</span>
              <span v-else>Verify Code</span>
            </button>
            <button
              type="button"
              :disabled="resendLoading || resendCooldown > 0"
              @click="handleResendOtp"
              class="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="resendLoading">Sending...</span>
              <span v-else-if="resendCooldown > 0">Resend code in {{ resendCooldown }}s</span>
              <span v-else>Resend verification code</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
import { authApi } from '@/services/api/auth';
import type { RegisterRequest } from '@/types/user';

const router = useRouter();

const step = ref<'register' | 'otp'>('register');
const registeredEmail = ref('');

const form = ref<RegisterRequest>({
  username: '',
  email: '',
  fullName: '',
  phone: '',
  password: '',
});

const otpForm = ref({
  otp: '',
});

const loading = ref(false);
const resendLoading = ref(false);
const error = ref('');
const success = ref('');
const resendCooldown = ref(0);
let resendTimer: ReturnType<typeof setInterval> | null = null;

const handleOtpInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value.replace(/\D/g, '');
  otpForm.value.otp = value.slice(0, 6);
};

const handleRegister = async () => {
  loading.value = true;
  error.value = '';
  success.value = '';

  try {
    const response = await authApi.register(form.value);
    if (response.success && response.data.requiresActivation) {
      registeredEmail.value = form.value.email;
      step.value = 'otp';
      // Auto send OTP after registration
      await handleResendOtp();
    } else {
      error.value = 'Registration failed. Please try again.';
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || err.response?.data?.errors?.[0] || 'Registration failed. Please try again.';
  } finally {
    loading.value = false;
  }
};

const handleVerifyOtp = async () => {
  if (otpForm.value.otp.length !== 6) {
    error.value = 'Please enter a valid 6-digit code';
    return;
  }

  loading.value = true;
  error.value = '';
  success.value = '';

  try {
    const response = await authApi.verifyOtp(registeredEmail.value, otpForm.value.otp);
    if (response.success && response.data.activated) {
      success.value = response.data.message || 'Account activated successfully!';
      setTimeout(() => {
        router.push({ name: 'Login', query: { registered: 'true', activated: 'true' } });
      }, 1500);
    } else {
      error.value = response.message || 'Verification failed. Please try again.';
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || err.response?.data?.errors?.[0] || 'Verification failed. Please check your code and try again.';
  } finally {
    loading.value = false;
  }
};

const handleResendOtp = async () => {
  resendLoading.value = true;
  error.value = '';
  success.value = '';

  try {
    await authApi.sendOtp(registeredEmail.value);
    success.value = 'Verification code has been sent to your email.';
    resendCooldown.value = 60;
    startResendTimer();
  } catch (err: any) {
    error.value = err.response?.data?.message || err.response?.data?.errors?.[0] || 'Failed to send verification code. Please try again.';
  } finally {
    resendLoading.value = false;
  }
};

const startResendTimer = () => {
  if (resendTimer) {
    clearInterval(resendTimer);
  }
  resendTimer = setInterval(() => {
    if (resendCooldown.value > 0) {
      resendCooldown.value--;
    } else {
      if (resendTimer) {
        clearInterval(resendTimer);
        resendTimer = null;
      }
    }
  }, 1000);
};

onMounted(() => {
  // Check if we're coming back to OTP step
  const email = sessionStorage.getItem('pendingActivationEmail');
  if (email) {
    registeredEmail.value = email;
    step.value = 'otp';
  }
});

onUnmounted(() => {
  if (resendTimer) {
    clearInterval(resendTimer);
  }
});
</script>

