<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-24">
      <div class="flex items-center justify-center min-h-[60vh]">
        <div class="w-full max-w-md">
          <!-- Card -->
          <div class="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
            <div class="text-center space-y-4 mb-8">
              <!-- Icon -->
              <div class="flex justify-center">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <span class="material-symbols-outlined text-3xl sm:text-4xl text-primary">mail</span>
                </div>
              </div>

              <!-- Title -->
              <h1 class="text-2xl sm:text-3xl font-display font-bold text-black dark:text-white">
                Xác thực Email
              </h1>

              <!-- Description -->
              <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Chúng tôi đã gửi mã OTP đến email
                <span class="font-semibold text-black dark:text-white">{{ email || 'của bạn' }}</span>
              </p>
              <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Vui lòng nhập mã OTP 6 chữ số để kích hoạt tài khoản
              </p>
            </div>

            <!-- Error Message -->
            <Alert v-if="error" variant="destructive" class="mb-4">
              <AlertDescription>{{ error }}</AlertDescription>
            </Alert>

            <!-- Success Message -->
            <Alert v-if="success" variant="success" class="mb-4">
              <AlertDescription>{{ success }}</AlertDescription>
            </Alert>

            <!-- OTP Input Form -->
            <form @submit.prevent="handleVerifyOtp" class="space-y-6">
              <!-- OTP Input -->
              <div>
                <label for="otp" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mã OTP
                </label>
                <div class="flex gap-2 sm:gap-3 justify-center">
                  <input
                    v-for="(digit, index) in otpDigits"
                    :key="index"
                    :ref="(el) => setOtpInputRef(el, index)"
                    v-model="otpDigits[index]"
                    type="text"
                    inputmode="numeric"
                    maxlength="1"
                    class="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-black dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    @input="handleOtpInput(index, $event)"
                    @keydown="handleOtpKeydown(index, $event)"
                    @paste="handleOtpPaste($event)"
                  />
                </div>
                <p v-if="errors.otp" class="mt-2 text-sm text-destructive">{{ errors.otp }}</p>
              </div>

              <!-- Timer -->
              <div class="text-center">
                <p v-if="timeLeft > 0" class="text-sm text-gray-600 dark:text-gray-400">
                  Mã OTP sẽ hết hạn sau
                  <span class="font-semibold text-primary">{{ formatTime(timeLeft) }}</span>
                </p>
                <p v-else class="text-sm text-gray-600 dark:text-gray-400">
                  Mã OTP đã hết hạn
                </p>
              </div>

              <!-- Verify Button -->
              <button
                type="submit"
                :disabled="loading || !isOtpComplete || timeLeft === 0"
                class="w-full bg-primary text-white font-medium py-3 sm:py-4 px-6 rounded-DEFAULT hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <span v-if="loading">Đang xác thực...</span>
                <span v-else>Xác thực</span>
              </button>

              <!-- Resend OTP -->
              <div class="text-center space-y-2">
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Không nhận được mã?
                </p>
                <button
                  type="button"
                  :disabled="resendLoading || resendCooldown > 0"
                  class="text-primary hover:text-red-600 font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  @click="handleResendOtp"
                >
                  <span v-if="resendCooldown > 0">
                    Gửi lại sau {{ resendCooldown }}s
                  </span>
                  <span v-else>
                    Gửi lại mã OTP
                  </span>
                </button>
              </div>
            </form>

            <!-- Back to Login -->
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Đã có tài khoản?
                <RouterLink to="/login" class="font-medium text-primary hover:text-red-600 underline">
                  Đăng nhập
                </RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { authApi } from '@/services/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';

const router = useRouter();
const route = useRoute();

const email = ref<string>('');
const otpDigits = reactive<string[]>(['', '', '', '', '', '']);
const otpInputRefs = ref<(HTMLInputElement | null)[]>([]);
const loading = ref(false);
const resendLoading = ref(false);
const error = ref('');
const success = ref('');
const timeLeft = ref(15 * 60); // 15 minutes in seconds
const resendCooldown = ref(0);
let timer: NodeJS.Timeout | null = null;
let resendTimer: NodeJS.Timeout | null = null;

const errors = reactive({
  otp: '',
});

const isOtpComplete = computed(() => {
  return otpDigits.every((digit) => digit !== '');
});

const setOtpInputRef = (el: HTMLInputElement | null, index: number) => {
  if (el) {
    otpInputRefs.value[index] = el as HTMLInputElement;
  }
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const handleOtpInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value.replace(/[^0-9]/g, '');

  if (value) {
    otpDigits[index] = value;
    errors.otp = '';

    // Move to next input
    if (index < 5 && otpInputRefs.value[index + 1]) {
      otpInputRefs.value[index + 1]?.focus();
    }
  } else {
    otpDigits[index] = '';
  }
};

const handleOtpKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !otpDigits[index] && index > 0) {
    otpInputRefs.value[index - 1]?.focus();
  }
};

const handleOtpPaste = (event: ClipboardEvent) => {
  event.preventDefault();
  const pastedData = event.clipboardData?.getData('text') || '';
  const digits = pastedData.replace(/[^0-9]/g, '').slice(0, 6);

  digits.split('').forEach((digit, index) => {
    if (index < 6) {
      otpDigits[index] = digit;
    }
  });

  // Focus last filled input or last input
  const lastFilledIndex = Math.min(digits.length - 1, 5);
  otpInputRefs.value[lastFilledIndex]?.focus();
};

const handleVerifyOtp = async () => {
  if (!isOtpComplete.value) {
    errors.otp = 'Vui lòng nhập đầy đủ 6 chữ số';
    return;
  }

  if (timeLeft.value === 0) {
    error.value = 'Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới';
    return;
  }

  const otp = otpDigits.join('');
  loading.value = true;
  error.value = '';
  errors.otp = '';

  try {
    const response = await authApi.verifyOtp(email.value, otp);

    if (response.data.activated) {
      success.value = 'Tài khoản đã được kích hoạt thành công!';
      setTimeout(() => {
        router.push({ name: 'Login', query: { activated: 'true' } });
      }, 2000);
    }
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0] || 'Mã OTP không hợp lệ. Vui lòng thử lại.';
    error.value = errorMessage;
    errors.otp = errorMessage;
    
    // Clear OTP on error
    otpDigits.fill('');
    otpInputRefs.value[0]?.focus();
  } finally {
    loading.value = false;
  }
};

const handleResendOtp = async () => {
  if (resendCooldown.value > 0 || resendLoading.value) return;

  resendLoading.value = true;
  error.value = '';

  try {
    await authApi.sendOtp(email.value);
    success.value = 'Mã OTP mới đã được gửi đến email của bạn';
    
    // Reset OTP inputs
    otpDigits.fill('');
    otpInputRefs.value[0]?.focus();
    
    // Reset timer
    timeLeft.value = 15 * 60;
    
    // Start resend cooldown (60 seconds)
    resendCooldown.value = 60;
    resendTimer = setInterval(() => {
      resendCooldown.value--;
      if (resendCooldown.value <= 0) {
        if (resendTimer) {
          clearInterval(resendTimer);
          resendTimer = null;
        }
      }
    }, 1000);
  } catch (err: any) {
    error.value = err.response?.data?.message || err.response?.data?.errors?.[0] || 'Không thể gửi lại mã OTP. Vui lòng thử lại sau.';
  } finally {
    resendLoading.value = false;
  }
};

onMounted(() => {
  // Get email from query params or route state
  const emailParam = route.query.email as string;
  if (emailParam) {
    email.value = emailParam;
  } else {
    // If no email, redirect to register
    router.push({ name: 'Register' });
    return;
  }

  // Focus first input
  setTimeout(() => {
    otpInputRefs.value[0]?.focus();
  }, 100);

  // Start countdown timer
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
  }, 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
  if (resendTimer) {
    clearInterval(resendTimer);
  }
});
</script>

