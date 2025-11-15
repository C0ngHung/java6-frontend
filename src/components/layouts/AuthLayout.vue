<template>
  <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-black dark:text-white font-sans">
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
            <RouterLink v-if="!authStore.isAuthenticated" to="/register" class="text-black dark:text-white hover:underline text-sm xl:text-base">Sign Up</RouterLink>
            <RouterLink v-else to="/dashboard" class="text-black dark:text-white hover:underline text-sm xl:text-base">Dashboard</RouterLink>
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

            <RouterLink to="/wishlist" class="text-black dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-DEFAULT transition-colors">
              <span class="material-symbols-outlined text-xl sm:text-2xl">favorite</span>
            </RouterLink>
            <RouterLink to="/cart" class="text-black dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-DEFAULT transition-colors">
              <span class="material-symbols-outlined text-xl sm:text-2xl">shopping_cart</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-black text-white pt-16 pb-6">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          <!-- Subscribe Section -->
          <div class="space-y-4">
            <h3 class="text-2xl font-bold font-display">CH Fashion</h3>
            <p class="font-medium">Subscribe</p>
            <p class="text-gray-300">Get 10% off your first order</p>
            <div class="relative">
              <input
                v-model="subscribeEmail"
                class="bg-transparent border border-gray-300 rounded-DEFAULT py-2 pl-3 pr-10 w-full focus:ring-white focus:border-white"
                placeholder="Enter your email"
                type="email"
                @keyup.enter="handleSubscribe"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3"
                @click="handleSubscribe"
              >
                <span class="material-icons-outlined">send</span>
              </button>
            </div>
          </div>

          <!-- Support Section -->
          <div class="space-y-4">
            <h3 class="text-xl font-medium">Support</h3>
            <p class="text-gray-300">111 Bijoy sarani, Dhaka,<br />DH 1515, Bangladesh.</p>
            <p class="text-gray-300">chfashion@gmail.com</p>
            <p class="text-gray-300">+88015-88888-9999</p>
          </div>

          <!-- Account Section -->
          <div class="space-y-4">
            <h3 class="text-xl font-medium">Account</h3>
            <ul class="space-y-3 text-gray-300">
              <li>
                <RouterLink to="/dashboard" class="hover:text-white">My Account</RouterLink>
              </li>
              <li v-if="!authStore.isAuthenticated">
                <RouterLink to="/login" class="hover:text-white">Login / Register</RouterLink>
              </li>
              <li v-else>
                <RouterLink to="/dashboard" class="hover:text-white">Dashboard</RouterLink>
              </li>
              <li>
                <RouterLink to="/cart" class="hover:text-white">Cart</RouterLink>
              </li>
              <li>
                <RouterLink to="/wishlist" class="hover:text-white">Wishlist</RouterLink>
              </li>
              <li>
                <RouterLink to="/products" class="hover:text-white">Shop</RouterLink>
              </li>
            </ul>
          </div>

          <!-- Quick Link Section -->
          <div class="space-y-4">
            <h3 class="text-xl font-medium">Quick Link</h3>
            <ul class="space-y-3 text-gray-300">
              <li><a href="#" class="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-white">Terms Of Use</a></li>
              <li><a href="#" class="hover:text-white">FAQ</a></li>
              <li><a href="#" class="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <!-- Download App Section -->
          <div class="space-y-4">
            <h3 class="text-xl font-medium">Download App</h3>
            <p class="text-xs text-gray-400">Save $3 with App New User Only</p>
            <div class="flex items-center gap-2">
              <img
                alt="QR code for app download"
                class="w-20 h-20 bg-white p-1 rounded-DEFAULT"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGeETEVp7koVPnnDL6KF8MzyGzHeYu1TcVOOvlXqdak4K-vfjZXYPCb-hQWEF0SxB-Ir2XSLe_5SgWCZa1B6bZVPiZM2dGopjTA1xtp-KDc7WnpMUzbFSzY3gneH1aIg-vEAFvVlPTcX5-3IisLvCX56rjSMgeSDjBohgYqKTET1c-bR_20oJoCH_Cnu2YC1yMs2qb7mPxDeIH1imq6po1YHejjH5Lek3oOcZgt8wrhQOkztMfZpS1S2rsPhoJUq-92sdp93a4_0E"
              />
              <div class="flex flex-col space-y-2">
                <a href="#">
                  <img
                    alt="Get it on Google Play"
                    class="h-10"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2dTi66drBQbRGW4SivnTgvtJ4clg-m2ctuI_4X-cczj_qI3taSS_Txoxl8YFDtHJVn0SXDq7M-muwmnT2JPhCKO1EGz7JTaSoKWZYuMs2Iwd1h4hI_INdK2fWWI9hU4I-TLrgXUzK_oZe5OLLJxLXkPbDCOsELTId3er0vV8Pzh_X2lVS5cw4KcGigD8r6y5qSNaBEyWxMSFL2tWYN0ay8JAliJqzI7ABUaM6aVHmzPwl7gwRFn7I1-Oa_84GfAghLHi5tcZSGAc"
                  />
                </a>
                <a href="#">
                  <img
                    alt="Download on the App Store"
                    class="h-10"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0H1yP5RiIEg3cdpT6NYWrs1hfLUgFhtgwFeNRlOV7rQt5YoDVuH3HYtUGqczmEoDQHQ1vFtiJ2u3QRSFmZxYMInRNQorF67jn_7kXgqSBP2gWLrkGKiB5wIQqmOg-muygNPKWwlNXR74DFznBeDqARlz1vPac0QCYM-pW1c2h91CIWe1IIbPWYsEofXasHUgxDlGQHeBmjaMq_dF2CXdTfFMDnhWERJSnK1aaMCdQwO1iaLLBapRHtCzvz17iQXjVqKZLrB3iQDo"
                  />
                </a>
              </div>
            </div>
            <div class="flex space-x-6 pt-2">
              <a class="text-gray-300 hover:text-white" href="#">
                <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    clip-rule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a class="text-gray-300 hover:text-white" href="#">
                <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                  ></path>
                </svg>
              </a>
              <a class="text-gray-300 hover:text-white" href="#">
                <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    clip-rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.797 2.013 10.14 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0-2a7 7 0 110 14 7 7 0 010-14zm4.5-1.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a class="text-gray-300 hover:text-white" href="#">
                <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 pt-6 text-center text-gray-500">
          <p>© Copyright Rimel 2022. All right reserved</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useNavigation } from '@/composables/useNavigation';

const authStore = useAuthStore();
const { navigateToSearch } = useNavigation();

const searchQuery = ref('');
const subscribeEmail = ref('');

const handleSearch = () => {
  navigateToSearch(searchQuery.value);
};

const handleSubscribe = () => {
  if (subscribeEmail.value.trim()) {
    subscribeEmail.value = '';
  }
};
</script>

