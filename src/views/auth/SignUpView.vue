<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-32 items-center">
        <!-- Image Section -->
        <div class="hidden lg:flex justify-center items-center bg-[#CBE4E8] rounded-DEFAULT p-4 lg:p-8">
          <img
            alt="Smartphone next to a shopping cart with shopping bags"
            class="w-full h-auto object-cover max-h-[600px]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMIFWmiIzcGas3l-JuIx-6ulO57CKhAOlaUi1mN9f6gOcgwfrugV6FaTRCsxAir4SliujjqPT37oYq63NDmsglpZbYTvxenQfDATXFwQGSGdAUZdcHqOyT4t7iNk11nf73DM34qHFz1uCKlNJ2D3A5Ee4YQqG5qIkT3D90BBnn_uhzMjqeOBwNLCOI5X9hi7R9F88uy5ZqWGrYt73YzrN_R0eG6KafJgo48TSJEBWHU6A5jwTf-QgEVs643yVesDIhXQHa-86Wfoc"
          />
        </div>

        <!-- Sign Up Form Section -->
        <div class="flex flex-col justify-center w-full">
          <div class="max-w-md mx-auto lg:mx-0 w-full">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-black dark:text-white text-center lg:text-left">Create an account</h1>
            <p class="mt-3 sm:mt-4 mb-6 sm:mb-8 text-black dark:text-white text-sm sm:text-base text-center lg:text-left">Enter your details below</p>

            <!-- Error Message -->
            <Alert v-if="error" variant="destructive" class="mb-4">
              <AlertDescription>{{ error }}</AlertDescription>
            </Alert>

            <!-- Success Message -->
            <Alert v-if="success" variant="success" class="mb-4">
              <AlertDescription>{{ success }}</AlertDescription>
            </Alert>

            <form @submit.prevent="handleSignUp" class="space-y-4 sm:space-y-5 lg:space-y-6" method="POST">
              <!-- Full Name Input -->
              <div>
                <Input
                  id="fullName"
                  v-model="form.fullName"
                  placeholder="Full Name"
                  type="text"
                  required
                  :error="errors.fullName"
                />
              </div>

              <!-- Username Input -->
              <div>
                <Input
                  id="username"
                  v-model="form.username"
                  placeholder="Username"
                  type="text"
                  required
                  :error="errors.username"
                />
              </div>

              <!-- Email Input -->
              <div>
                <Input
                  id="email"
                  v-model="form.email"
                  placeholder="Email"
                  type="email"
                  required
                  :error="errors.email"
                />
              </div>

              <!-- Phone Input -->
              <div>
                <Input
                  id="phone"
                  v-model="form.phone"
                  placeholder="Phone Number (Optional)"
                  type="tel"
                  :error="errors.phone"
                />
              </div>

              <!-- Password Input -->
              <div>
                <Input
                  id="password"
                  v-model="form.password"
                  placeholder="Password"
                  type="password"
                  required
                  :error="errors.password"
                />
              </div>

              <!-- Confirm Password Input -->
              <div>
                <Input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  required
                  :error="errors.confirmPassword"
                />
              </div>

              <div class="pt-2 sm:pt-4 space-y-3 sm:space-y-4">
                <!-- Create Account Button -->
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full bg-primary text-white font-medium py-3 sm:py-4 px-6 rounded-DEFAULT hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <span v-if="loading">Creating Account...</span>
                  <span v-else>Create Account</span>
                </button>

                <!-- Sign up with Google Button -->
                <button
                  type="button"
                  class="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-black dark:text-white font-medium py-3 sm:py-4 px-6 rounded-DEFAULT hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 text-sm sm:text-base"
                  @click="handleGoogleSignUp"
                >
                  <img
                    alt="Google logo"
                    class="w-4 h-4 sm:w-5 sm:h-5"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC23xQrEJc8PxNMo8k6nJwG8CcRj7X_RWCJqcb0FWd_75-_pOo9ceolFp8sIq7__55FtTQpDtJZ5Dwv4zLE6T1G8lx98keSfsaDs5s9aYqQ8XmaRClERBfartRAUIwhE_W6jk2958YtHfzbm7CfG_ncMvp9ySvl4Y45UZ3aS50xx9kd1qV6YtPVzQu4A3ZskhhhbNEWNtVzmOf2f-LSRTg9oPbAxYuQUjzEw6PoqHeCTtatm-PFjTHNm2IardnMAFymS0Fwj76R3gI"
                  />
                  <span class="hidden sm:inline">Sign up with Google</span>
                  <span class="sm:hidden">Google</span>
                </button>
              </div>
            </form>

            <p class="text-center mt-6 sm:mt-8 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Already have account?
              <RouterLink to="/login" class="font-medium text-black dark:text-white underline hover:text-primary dark:hover:text-primary">Log in</RouterLink>
            </p>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { authApi } from '@/services/auth';
import type { RegisterRequest } from '@/types/user';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

const router = useRouter();

const form = ref<RegisterRequest>({
  username: '',
  password: '',
  email: '',
  fullName: '',
  phone: '',
});

const confirmPassword = ref('');
const loading = ref(false);
const error = ref('');
const success = ref('');

const errors = reactive({
  fullName: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
});

const validateForm = (): boolean => {
  // Reset errors
  Object.keys(errors).forEach((key) => {
    errors[key as keyof typeof errors] = '';
  });

  let isValid = true;

  // Validate Full Name
  if (!form.value.fullName.trim()) {
    errors.fullName = 'Full name is required';
    isValid = false;
  }

  // Validate Username
  if (!form.value.username.trim()) {
    errors.username = 'Username is required';
    isValid = false;
  } else if (form.value.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
    isValid = false;
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.value.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!emailRegex.test(form.value.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }

  // Validate Phone (optional but if provided, should be valid)
  if (form.value.phone && form.value.phone.trim()) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    const phoneDigits = form.value.phone.replace(/\D/g, '');
    if (!phoneRegex.test(form.value.phone) || phoneDigits.length < 10) {
      errors.phone = 'Please enter a valid phone number';
      isValid = false;
    }
  }

  // Validate Password
  if (!form.value.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (form.value.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
    isValid = false;
  }

  // Validate Confirm Password
  if (!confirmPassword.value) {
    errors.confirmPassword = 'Please confirm your password';
    isValid = false;
  } else if (form.value.password !== confirmPassword.value) {
    errors.confirmPassword = 'Passwords do not match';
    isValid = false;
  }

  return isValid;
};

const handleSignUp = async () => {
  if (!validateForm()) {
    error.value = 'Please fix the errors in the form';
    return;
  }

  loading.value = true;
  error.value = '';
  success.value = '';

  try {
    const registerData: RegisterRequest = {
      username: form.value.username.trim(),
      password: form.value.password,
      email: form.value.email.trim(),
      fullName: form.value.fullName.trim(),
      phone: form.value.phone?.trim() || undefined,
    };

    const response = await authApi.register(registerData);

    if (response.data.requiresActivation) {
      success.value = 'Đăng ký thành công! Đang chuyển đến trang xác thực OTP...';
      setTimeout(() => {
        router.push({ 
          name: 'OtpVerification', 
          query: { email: form.value.email } 
        });
      }, 1500);
    } else {
      success.value = 'Đăng ký thành công! Đang chuyển đến trang đăng nhập...';
      setTimeout(() => {
        router.push({ name: 'Login', query: { registered: 'true' } });
      }, 2000);
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || err.response?.data?.errors?.[0] || 'Registration failed. Please try again.';
  } finally {
    loading.value = false;
  }
};

const handleGoogleSignUp = () => {
  error.value = 'Google sign up is not implemented yet';
};
</script>

