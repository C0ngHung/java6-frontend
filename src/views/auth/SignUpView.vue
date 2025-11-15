<template>
  <div class="bg-background-light dark:bg-background-dark text-black dark:text-white">
    <!-- Top Banner -->
    <div class="bg-background-dark text-white text-xs sm:text-sm py-2 sm:py-3">
      <div class="container mx-auto px-4 flex justify-center items-center">
        <p class="text-center flex-grow text-xs sm:text-sm">
          <span class="hidden sm:inline">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
          <span class="sm:hidden">Summer Sale - OFF 50%!</span>
          <RouterLink to="/products" class="font-semibold underline ml-1 sm:ml-2">ShopNow</RouterLink>
        </p>
        <div class="hidden sm:flex items-center ml-4">
          <span>English</span>
          <span class="material-symbols-outlined text-base ml-1">expand_more</span>
        </div>
      </div>
    </div>

    <!-- Header -->
    <header class="border-b border-gray-300 dark:border-gray-700 sticky top-0 bg-background-light dark:bg-background-dark z-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex justify-between items-center gap-4">
          <RouterLink to="/" class="text-xl sm:text-2xl font-bold font-display text-black dark:text-white flex-shrink-0">Exclusive</RouterLink>
          
          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-8 xl:space-x-12">
            <RouterLink to="/" class="text-black dark:text-white hover:underline text-sm xl:text-base">Home</RouterLink>
            <a href="#contact" class="text-black dark:text-white hover:underline text-sm xl:text-base">Contact</a>
            <a href="#about" class="text-black dark:text-white hover:underline text-sm xl:text-base">About</a>
            <RouterLink to="/register" class="text-black dark:text-white underline underline-offset-4 decoration-primary decoration-2 text-sm xl:text-base">Sign Up</RouterLink>
          </nav>

          <!-- Right Side Actions -->
          <div class="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <!-- Search Bar -->
            <div class="relative hidden sm:block">
              <input
                v-model="searchQuery"
                class="bg-gray-100 dark:bg-gray-800 border-none rounded-DEFAULT py-2 px-4 w-40 sm:w-48 lg:w-64 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-primary"
                placeholder="What are you looking for?"
                type="text"
                @keyup.enter="handleSearch"
              />
              <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg">search</span>
            </div>
            
            <!-- Mobile Search Icon -->
            <button
              type="button"
              class="sm:hidden text-black dark:text-white p-2"
              @click="showMobileSearch = !showMobileSearch"
            >
              <span class="material-symbols-outlined">search</span>
            </button>

            <RouterLink to="/wishlist" class="text-black dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-DEFAULT transition-colors">
              <span class="material-symbols-outlined text-xl sm:text-2xl">favorite</span>
            </RouterLink>
            <RouterLink to="/cart" class="text-black dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-DEFAULT transition-colors">
              <span class="material-symbols-outlined text-xl sm:text-2xl">shopping_cart</span>
            </RouterLink>
          </div>
        </div>

        <!-- Mobile Search Bar -->
        <div v-if="showMobileSearch" class="mt-4 sm:hidden">
          <div class="relative">
            <input
              v-model="searchQuery"
              class="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-DEFAULT py-2 px-4 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-primary"
              placeholder="What are you looking for?"
              type="text"
              @keyup.enter="handleSearch"
            />
            <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">search</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-24">
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
            <div v-if="error" class="mb-4 rounded-md bg-red-50 dark:bg-red-900/20 p-4">
              <p class="text-sm font-medium text-red-800 dark:text-red-200">{{ error }}</p>
            </div>

            <!-- Success Message -->
            <div v-if="success" class="mb-4 rounded-md bg-green-50 dark:bg-green-900/20 p-4">
              <p class="text-sm font-medium text-green-800 dark:text-green-200">{{ success }}</p>
            </div>

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
    </main>

    <!-- Footer -->
    <footer class="bg-background-dark text-white pt-12 sm:pt-16 lg:pt-20 pb-4 sm:pb-6">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12 lg:mb-16">
          <!-- Subscribe Section -->
          <div class="space-y-4 sm:space-y-6 col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-2">
            <h3 class="text-xl sm:text-2xl font-bold font-display">Exclusive</h3>
            <h4 class="text-lg sm:text-xl">Subscribe</h4>
            <p class="text-sm sm:text-base text-gray-300">Get 10% off your first order</p>
            <div class="relative">
              <input
                v-model="subscribeEmail"
                class="w-full bg-transparent border border-gray-300 rounded-DEFAULT py-2 sm:py-3 pl-3 sm:pl-4 pr-10 sm:pr-12 text-sm sm:text-base text-white placeholder-gray-400 focus:ring-primary focus:border-primary"
                placeholder="Enter your email"
                type="email"
                @keyup.enter="handleSubscribe"
              />
              <button
                type="button"
                class="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-white p-1 hover:bg-gray-800 rounded-DEFAULT transition-colors"
                @click="handleSubscribe"
              >
                <span class="material-symbols-outlined text-lg sm:text-xl">send</span>
              </button>
            </div>
          </div>

          <!-- Support Section -->
          <div class="space-y-4 sm:space-y-6">
            <h3 class="text-lg sm:text-xl font-medium">Support</h3>
            <ul class="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-300">
              <li class="break-words">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
              <li>exclusive@gmail.com</li>
              <li>+88015-88888-9999</li>
            </ul>
          </div>

          <!-- Account Section -->
          <div class="space-y-4 sm:space-y-6">
            <h3 class="text-lg sm:text-xl font-medium">Account</h3>
            <ul class="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-300">
              <li>
                <RouterLink to="/dashboard" class="hover:underline">My Account</RouterLink>
              </li>
              <li>
                <RouterLink to="/login" class="hover:underline">Login / Register</RouterLink>
              </li>
              <li>
                <RouterLink to="/cart" class="hover:underline">Cart</RouterLink>
              </li>
              <li>
                <RouterLink to="/wishlist" class="hover:underline">Wishlist</RouterLink>
              </li>
              <li>
                <RouterLink to="/products" class="hover:underline">Shop</RouterLink>
              </li>
            </ul>
          </div>

          <!-- Quick Link Section -->
          <div class="space-y-4 sm:space-y-6">
            <h3 class="text-lg sm:text-xl font-medium">Quick Link</h3>
            <ul class="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-300">
              <li><a href="#" class="hover:underline">Privacy Policy</a></li>
              <li><a href="#" class="hover:underline">Terms Of Use</a></li>
              <li><a href="#" class="hover:underline">FAQ</a></li>
              <li><a href="#" class="hover:underline">Contact</a></li>
            </ul>
          </div>

          <!-- Download App Section -->
          <div class="space-y-4 sm:space-y-6 col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1">
            <h3 class="text-lg sm:text-xl font-medium">Download App</h3>
            <p class="text-xs sm:text-sm text-gray-400">Save $3 with App New User Only</p>
            <div class="flex items-center gap-2 sm:gap-3">
              <img
                alt="QR code"
                class="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWPJJeQH4L45t7cSkutWbrtvlHwT9-IwRtb-OsZJeQfeLxkqX8sul7irl8ruAmQ-FfbULTRfs7Mr3CZrgAo1aumsP5fRZCOsOsad_MUZE8ugsg-Kja2T3L3QpVkxqy0-xyhyB6M8D5e5I0J36MNGF27vs6qmH9mfJwH8relsDgY2muRoR3gF6pyWgP6dpfcT_5gyPrZiJ61L7GaETMyLxAx_5bQSQepzko8ATJeJ_ANWLvPQjzx3qsTZYEqsJxp_JTYTb7vsf9vqQ"
              />
              <div class="space-y-1.5 sm:space-y-2 flex-shrink-0">
                <a href="#">
                  <img
                    alt="Get it on Google Play"
                    class="h-8 sm:h-10 w-auto"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsgdLGxCfsdU_JApehMibGmbBdtw68cV2TJdLLOhIosbcjKcBYAftkVvfYB7eLJCwJ9XbN2F780c2ao-CLMNxVYdBNSezunYYFSIVJWybGsH1B_Tc_zDJ-NxqKtxKqmhmEteeD-SQAIMb_sxIUMgfhOkHZeajHEDKDEfnxy34Qhg-fPOrRQfFN_wLvuuh2pbUa2AjTMpVuqhhb4z7QfXJSFbqlKSgOj9-mVSFF375DGkQZUtUSaD0TPr9Ep8CA3k-RSQ2PEnQi2oo"
                  />
                </a>
                <a href="#">
                  <img
                    alt="Download on the App Store"
                    class="h-8 sm:h-10 w-auto"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1Ni6ddgQavC9edXysLsNKgYwHEZDBUQpjSwB1UR7u_Lw3H9CSnDgi56fi95f07n9idjpzAhpO7wMNRjrufJ0NOO6vZod1Dth9uAgNPXtLuuhYZUr6fJWuwdEw1MDXTWdf2wc_Tl9bHlOCt9VmkZLMHrtSxqcr219IXiHbInajSHgJtWw1iNHxFMlZyDNwQ5ulMn3bzBtMwlUXihaC6dnbS4-e6yaCsY01EMKS4jsMstvlFHCy5Jq1ur-kd8OveE7fz4a-h99DPzE"
                  />
                </a>
              </div>
            </div>
            <div class="flex space-x-4 sm:space-x-6 text-gray-300 pt-2">
              <a href="#" class="hover:text-white transition-colors">
                <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"></path>
                </svg>
              </a>
              <a href="#" class="hover:text-white transition-colors">
                <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="#" class="hover:text-white transition-colors">
                <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85 0-3.204.013-3.583.07-4.85.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441c.001-.795-.644-1.44-1.441-1.44z"></path>
                </svg>
              </a>
              <a href="#" class="hover:text-white transition-colors">
                <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 pt-3 sm:pt-4 text-center text-gray-500 text-xs sm:text-sm">
          © Copyright Rimel 2022. All right reserved
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
import { authApi } from '@/api/auth';
import type { RegisterRequest } from '@/types/user';
import Input from '@/components/ui/Input.vue';
import { useNavigation } from '@/composables/useNavigation';

const router = useRouter();
const { navigateToSearch } = useNavigation();

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
const searchQuery = ref('');
const subscribeEmail = ref('');
const showMobileSearch = ref(false);

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

const handleSearch = () => {
  navigateToSearch(searchQuery.value);
};

const handleSubscribe = () => {
  if (subscribeEmail.value.trim()) {
    subscribeEmail.value = '';
  }
};
</script>

