<template>
  <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light font-display text-text-primary">
    <div class="flex h-full grow flex-col">
      <!-- Header -->
      <header class="w-full border-b border-gray-300 bg-background-light">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-8 whitespace-nowrap px-4 py-4 sm:px-6 lg:px-8">
          <div class="flex items-center gap-4">
            <RouterLink to="/">
              <h2 class="text-text-primary text-2xl font-bold leading-tight tracking-[-0.015em]">CH Fashion</h2>
            </RouterLink>
          </div>
          <div class="hidden items-center gap-6 md:flex">
            <RouterLink to="/" class="text-text-primary text-base font-normal leading-normal transition-colors hover:text-primary">Home</RouterLink>
            <a href="#contact" class="text-text-primary text-base font-normal leading-normal transition-colors hover:text-primary">Contact</a>
            <a href="#about" class="text-text-primary text-base font-normal leading-normal transition-colors hover:text-primary">About</a>
            <RouterLink v-if="!authStore.isAuthenticated" to="/register" class="text-text-primary text-base font-normal leading-normal transition-colors hover:text-primary">Sign Up</RouterLink>
            <RouterLink v-else to="/dashboard" class="text-text-primary text-base font-normal leading-normal transition-colors hover:text-primary">Dashboard</RouterLink>
          </div>
          <div class="flex items-center gap-4">
            <div class="relative hidden lg:block">
              <input
                v-model="searchQuery"
                class="w-64 rounded bg-secondary-background py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="What are you looking for?"
                type="text"
                @keyup.enter="handleSearch"
              />
              <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500">search</span>
            </div>
            <button class="relative flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-text-primary transition-colors hover:text-primary">
              <span class="material-symbols-outlined text-2xl">favorite</span>
            </button>
            <button class="relative flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-text-primary transition-colors hover:text-primary">
              <span class="material-symbols-outlined text-2xl">shopping_cart</span>
              <span v-if="cartCount > 0" class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">{{ cartCount }}</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
        <!-- Hero Banner Section -->
        <div class="grid grid-cols-1 gap-px md:grid-cols-4">
          <div class="hidden border-r border-gray-300 pr-4 md:block">
            <ul class="flex flex-col gap-4 pt-8">
              <li v-for="category in categories" :key="category.id">
                <a
                  v-if="category.hasChildren"
                  class="flex items-center justify-between hover:font-semibold"
                  href="#"
                >
                  {{ category.name }}
                  <span class="material-symbols-outlined text-xl">chevron_right</span>
                </a>
                <a v-else class="hover:font-semibold" href="#">{{ category.name }}</a>
              </li>
            </ul>
          </div>
          <div class="md:col-span-3">
            <div
              class="flex min-h-[40vh] w-full flex-col gap-4 bg-cover bg-center bg-no-repeat p-8 text-white md:min-h-[50vh] md:items-start md:justify-center"
              :style="{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url('${heroBanner.image}')`
              }"
            >
              <div class="flex items-center gap-4">
                <p class="text-base font-normal">{{ heroBanner.label }}</p>
              </div>
              <h1 class="max-w-xs text-3xl font-semibold leading-tight sm:text-5xl">{{ heroBanner.title }}</h1>
              <RouterLink to="/products" class="flex items-center gap-2 font-medium underline">
                Shop Now
                <span class="material-symbols-outlined">arrow_right_alt</span>
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Flash Sales Section -->
        <section class="w-full py-12 sm:py-16">
          <div class="mb-6 flex items-end justify-between">
            <div class="flex flex-col gap-4">
              <div class="flex items-center gap-4">
                <div class="h-10 w-5 rounded bg-primary"></div>
                <h3 class="font-semibold text-primary">Today's</h3>
              </div>
              <div class="flex flex-wrap items-end gap-x-12 gap-y-4">
                <h2 class="text-2xl font-bold leading-tight tracking-[-0.015em] sm:text-3xl">Flash Sales</h2>
                <div class="flex items-center gap-4 font-bold">
                  <div>
                    <div class="text-xs">Days</div>
                    <div class="text-3xl">{{ formatTime(countdown.days) }}</div>
                  </div>
                  <div class="text-3xl text-primary">:</div>
                  <div>
                    <div class="text-xs">Hours</div>
                    <div class="text-3xl">{{ formatTime(countdown.hours) }}</div>
                  </div>
                  <div class="text-3xl text-primary">:</div>
                  <div>
                    <div class="text-xs">Minutes</div>
                    <div class="text-3xl">{{ formatTime(countdown.minutes) }}</div>
                  </div>
                  <div class="text-3xl text-primary">:</div>
                  <div>
                    <div class="text-xs">Seconds</div>
                    <div class="text-3xl">{{ formatTime(countdown.seconds) }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="hidden items-center gap-2 sm:flex">
              <button
                class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-background hover:bg-gray-200"
                @click="scrollFlashSales('left')"
              >
                <span class="material-symbols-outlined">arrow_back</span>
              </button>
              <button
                class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-background hover:bg-gray-200"
                @click="scrollFlashSales('right')"
              >
                <span class="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
          <div ref="flashSalesContainer" class="flex gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none]">
            <div
              v-for="product in flashSaleProducts"
              :key="product.id"
              class="group w-64 flex-shrink-0"
            >
              <div class="relative w-full overflow-hidden rounded bg-secondary-background">
                <div
                  class="aspect-square w-full bg-contain bg-center bg-no-repeat p-8"
                  :style="{ backgroundImage: `url('${product.image}')` }"
                ></div>
                <div class="absolute top-3 left-3 rounded bg-primary px-3 py-1 text-xs text-white">
                  -{{ product.discount }}%
                </div>
                <div class="absolute top-3 right-3 flex flex-col gap-2">
                  <button class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-text-primary hover:text-primary">
                    <span class="material-symbols-outlined text-xl">favorite</span>
                  </button>
                  <button class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-text-primary hover:text-primary">
                    <span class="material-symbols-outlined text-xl">visibility</span>
                  </button>
                </div>
                <button class="absolute bottom-0 w-full translate-y-full bg-black py-2 text-white transition-transform duration-300 group-hover:translate-y-0">
                  Add To Cart
                </button>
              </div>
              <div class="mt-4">
                <p class="font-medium">{{ product.name }}</p>
                <div class="flex items-center gap-2">
                  <p class="text-primary">${{ product.price }}</p>
                  <p class="text-sm text-gray-500 line-through">${{ product.originalPrice }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-8 text-center">
            <button class="rounded bg-primary px-12 py-4 font-medium text-white transition-colors hover:bg-red-700">
              View All Products
            </button>
          </div>
        </section>

        <hr />

        <!-- Categories Section -->
        <section class="w-full py-12 sm:py-16">
          <div class="mb-6 flex items-end justify-between">
            <div class="flex flex-col gap-4">
              <div class="flex items-center gap-4">
                <div class="h-10 w-5 rounded bg-primary"></div>
                <h3 class="font-semibold text-primary">Categories</h3>
              </div>
              <h2 class="text-2xl font-bold leading-tight tracking-[-0.015em] sm:text-3xl">Browse By Category</h2>
            </div>
            <div class="hidden items-center gap-2 sm:flex">
              <button
                class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-background hover:bg-gray-200"
                @click="scrollCategories('left')"
              >
                <span class="material-symbols-outlined">arrow_back</span>
              </button>
              <button
                class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-background hover:bg-gray-200"
                @click="scrollCategories('right')"
              >
                <span class="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            <a
              v-for="(category, index) in productCategories"
              :key="category.id"
              class="flex flex-col items-center justify-center gap-2 rounded border border-gray-300 py-6 text-center transition-colors hover:bg-primary hover:text-white"
              :class="{ 'border-primary bg-primary text-white ring-2 ring-primary': index === 3 }"
              href="#"
            >
              <span class="material-symbols-outlined text-4xl">{{ category.icon }}</span>
              <p>{{ category.name }}</p>
            </a>
          </div>
        </section>

        <hr />

        <!-- Best Selling Products Section -->
        <section class="w-full py-12 sm:py-16">
          <div class="mb-6 flex items-end justify-between">
            <div class="flex flex-col gap-4">
              <div class="flex items-center gap-4">
                <div class="h-10 w-5 rounded bg-primary"></div>
                <h3 class="font-semibold text-primary">This Month</h3>
              </div>
              <h2 class="text-2xl font-bold leading-tight tracking-[-0.015em] sm:text-3xl">Best Selling Products</h2>
            </div>
            <div class="flex-shrink-0">
              <button class="rounded bg-primary px-8 py-3 font-medium text-white transition-colors hover:bg-red-700">
                View All
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div
              v-for="product in bestSellingProducts"
              :key="product.id"
              class="group"
            >
              <div class="relative w-full overflow-hidden rounded bg-secondary-background">
                <div
                  class="aspect-square w-full bg-contain bg-center bg-no-repeat p-8"
                  :style="{ backgroundImage: `url('${product.image}')` }"
                ></div>
                <div class="absolute top-3 right-3 flex flex-col gap-2">
                  <button class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-text-primary hover:text-primary">
                    <span class="material-symbols-outlined text-xl">favorite</span>
                  </button>
                  <button class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-text-primary hover:text-primary">
                    <span class="material-symbols-outlined text-xl">visibility</span>
                  </button>
                </div>
                <button class="absolute bottom-0 w-full translate-y-full bg-black py-2 text-white transition-transform duration-300 group-hover:translate-y-0">
                  Add To Cart
                </button>
              </div>
              <div class="mt-4">
                <p class="font-medium">{{ product.name }}</p>
                <p class="text-primary">${{ product.price }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Music Experience Banner -->
        <section
          class="my-8 flex min-h-[50vh] w-full flex-col justify-center gap-6 bg-black bg-contain bg-right-bottom bg-no-repeat p-8 text-white md:bg-cover"
          :style="{ backgroundImage: `url('${musicBanner.image}')` }"
        >
          <h3 class="font-semibold text-green-400">Categories</h3>
          <h2 class="max-w-sm text-3xl font-semibold leading-tight sm:text-5xl">Enhance Your Music Experience</h2>
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white text-black">
              <span class="text-lg font-bold">{{ formatTime(musicCountdown.hours) }}</span>
              <span class="text-xs">Hours</span>
            </div>
            <div class="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white text-black">
              <span class="text-lg font-bold">{{ formatTime(musicCountdown.days) }}</span>
              <span class="text-xs">Days</span>
            </div>
            <div class="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white text-black">
              <span class="text-lg font-bold">{{ formatTime(musicCountdown.minutes) }}</span>
              <span class="text-xs">Minutes</span>
            </div>
            <div class="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white text-black">
              <span class="text-lg font-bold">{{ formatTime(musicCountdown.seconds) }}</span>
              <span class="text-xs">Seconds</span>
            </div>
          </div>
          <button class="mt-4 w-fit rounded bg-green-500 px-12 py-4 font-medium text-white transition-colors hover:bg-green-600">
            Buy Now!
          </button>
        </section>

        <!-- New Arrival Section -->
        <section class="w-full py-12 sm:py-16">
          <div class="mb-6 flex flex-col gap-4">
            <div class="flex items-center gap-4">
              <div class="h-10 w-5 rounded bg-primary"></div>
              <h3 class="font-semibold text-primary">Featured</h3>
            </div>
            <h2 class="text-2xl font-bold leading-tight tracking-[-0.015em] sm:text-3xl">New Arrival</h2>
          </div>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              class="relative flex min-h-[300px] flex-col items-start justify-end rounded bg-black p-6 text-white md:min-h-[500px]"
              :style="{ backgroundImage: `url('${newArrivalProducts[0].image}')` }"
            >
              <div class="absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-50"></div>
              <div class="relative">
                <h3 class="text-2xl font-semibold">{{ newArrivalProducts[0].name }}</h3>
                <p class="max-w-xs text-sm">{{ newArrivalProducts[0].description }}</p>
                <RouterLink to="/products" class="mt-2 inline-block font-medium underline">Shop Now</RouterLink>
              </div>
            </div>
            <div class="flex flex-col gap-6">
              <div
                v-for="product in newArrivalProducts.slice(1)"
                :key="product.id"
                class="relative flex min-h-[238px] flex-col items-start justify-end rounded bg-black p-6 text-white"
                :style="{ backgroundImage: `url('${product.image}')` }"
              >
                <div class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"></div>
                <div class="relative">
                  <h3 class="text-2xl font-semibold">{{ product.name }}</h3>
                  <p class="max-w-xs text-sm">{{ product.description }}</p>
                  <RouterLink to="/products" class="mt-2 inline-block font-medium underline">Shop Now</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="w-full bg-black text-white">
        <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 gap-8 md:grid-cols-5">
            <div>
              <h3 class="mb-4 text-xl font-bold">EcoWear</h3>
              <p class="mb-4 text-lg">Subscribe</p>
              <p class="mb-4 text-sm">Get 10% off your first order</p>
              <div class="relative">
                <input
                  v-model="subscribeEmail"
                  class="w-full rounded border border-white bg-transparent py-2 pl-3 pr-10 text-sm"
                  placeholder="Enter your email"
                  type="email"
                  @keyup.enter="handleSubscribe"
                />
                <button class="absolute right-2 top-1/2 -translate-y-1/2" @click="handleSubscribe">
                  <span class="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
            <div>
              <h3 class="mb-4 text-lg font-medium">Support</h3>
              <ul class="space-y-3 text-sm">
                <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
                <li>ecowear@gmail.com</li>
                <li>+88015-88888-9999</li>
              </ul>
            </div>
            <div>
              <h3 class="mb-4 text-lg font-medium">Account</h3>
              <ul class="space-y-3 text-sm">
                <li><RouterLink to="/dashboard" class="hover:underline">My Account</RouterLink></li>
                <li v-if="!authStore.isAuthenticated"><RouterLink to="/login" class="hover:underline">Login / Register</RouterLink></li>
                <li v-else><RouterLink to="/dashboard" class="hover:underline">Dashboard</RouterLink></li>
                <li><a href="#" class="hover:underline">Cart</a></li>
                <li><a href="#" class="hover:underline">Wishlist</a></li>
                <li><a href="#" class="hover:underline">Shop</a></li>
              </ul>
            </div>
            <div>
              <h3 class="mb-4 text-lg font-medium">Quick Link</h3>
              <ul class="space-y-3 text-sm">
                <li><a href="#" class="hover:underline">Privacy Policy</a></li>
                <li><a href="#" class="hover:underline">Terms Of Use</a></li>
                <li><a href="#" class="hover:underline">FAQ</a></li>
                <li><a href="#" class="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 class="mb-4 text-lg font-medium">Download App</h3>
              <p class="mb-2 text-xs text-gray-400">Save $3 with App New User Only</p>
              <div class="mb-4 flex gap-4">
                <div class="h-20 w-20 bg-gray-700"></div>
                <div class="flex flex-col justify-center gap-2">
                  <div class="h-8 w-28 bg-gray-700"></div>
                  <div class="h-8 w-28 bg-gray-700"></div>
                </div>
              </div>
              <div class="flex gap-6">
                <a href="#"><svg aria-hidden="true" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path clip-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill-rule="evenodd"></path></svg></a>
                <a href="#"><svg aria-hidden="true" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></a>
                <a href="#"><svg aria-hidden="true" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.032a9.968 9.968 0 00-3.284.64C5.468 4.232 4.232 5.468 2.672 8.716c-.64 1.32-.96 2.76-.96 4.32 0 1.56.32 3 .96 4.32 1.56 3.248 2.796 4.484 6.044 6.044 1.32.64 2.76.96 4.32.96 1.56 0 3-.32 4.32-.96 3.248-1.56 4.484-2.796 6.044-6.044.64-1.32.96-2.76.96-4.32 0-1.56-.32-3-.96-4.32C19.768 5.468 18.532 4.232 15.284 2.672A9.968 9.968 0 0012 2.032zM12 14.4a2.4 2.4 0 110-4.8 2.4 2.4 0 010 4.8zm3.84-6.48a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z"></path><path d="M12 16.8a4.8 4.8 0 100-9.6 4.8 4.8 0 000 9.6z"></path><path d="M19.2 7.2a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"></path></svg></a>
              </div>
            </div>
          </div>
          <div class="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
            <p>© Copyright Rimel 2022. All right reserved</p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// Search
const searchQuery = ref('');
const flashSalesContainer = ref<HTMLElement | null>(null);

// Cart
const cartCount = ref(2);

// Subscribe
const subscribeEmail = ref('');

// Countdown timer
const countdown = ref({
  days: 3,
  hours: 23,
  minutes: 19,
  seconds: 56,
});

const musicCountdown = ref({
  days: 5,
  hours: 23,
  minutes: 59,
  seconds: 35,
});

let countdownInterval: ReturnType<typeof setInterval> | null = null;
let musicCountdownInterval: ReturnType<typeof setInterval> | null = null;

// Hero Banner
const heroBanner = ref({
  label: 'iPhone 14 Series',
  title: 'Up to 10% off Voucher',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA51LjbMS32ePCQ0qzQQYf33kIGOfZOVoDWwAp8HnRXnfeNv0GvEGEWEw8315R_YnlD2Af99n1XjXVE1yTjxM5BEl0Pfmdv-DCB4EpwL6IL-_kCFNWMDqLtfwLLnOngAhG9yPDm2S-Gm0mR3IPGC16N4OdURwb1UJs0IhWROeAQrxPB7-mNJO5uZYcR7szqIv-UIyXcvzzmVkpRdNwkGUstrYFNvMX1SIoFZtymyk4CNFM0PwDPDYHfRvfqmGIiKXCy1IbgSM4jtHM',
});

// Categories
const categories = ref([
  { id: 1, name: "Woman's Fashion", hasChildren: true },
  { id: 2, name: "Men's Fashion", hasChildren: true },
  { id: 3, name: 'Electronics', hasChildren: false },
  { id: 4, name: 'Home & Lifestyle', hasChildren: false },
  { id: 5, name: 'Medicine', hasChildren: false },
  { id: 6, name: 'Sports & Outdoor', hasChildren: false },
  { id: 7, name: "Baby's & Toys", hasChildren: false },
  { id: 8, name: 'Groceries & Pets', hasChildren: false },
  { id: 9, name: 'Health & Beauty', hasChildren: false },
]);

// Product Categories
const productCategories = ref([
  { id: 1, name: 'Phones', icon: 'phone_iphone' },
  { id: 2, name: 'Computers', icon: 'computer' },
  { id: 3, name: 'SmartWatch', icon: 'watch' },
  { id: 4, name: 'Camera', icon: 'photo_camera' },
  { id: 5, name: 'HeadPhones', icon: 'headphones' },
  { id: 6, name: 'Gaming', icon: 'stadia_controller' },
]);

// Flash Sale Products
const flashSaleProducts = ref([
  {
    id: 1,
    name: 'Organic Cotton Tee',
    price: 35.00,
    originalPrice: 58.33,
    discount: 40,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqJFXx0NC9JH-Uin8yYR6dMR5sdJY24a3KApzrw0wNUbN6SR0eO9T1Oy60G3kNqm6zaXzDfvJIev84Vg1YwcbV3dNeuBWH1iMBHxNaE4ZXxjHWhkGJauT66OtQFiWqK_nP6TQZg14BbCHrsJozuYr3rBuQxsVPDXRy90kRtcVkKIRwWH3bvGxA1aPsuCs7ACNOAa77hmK8Tlq8YxrrpyrmSW_fPBl2uktbiwGD7FMNi2kOY1Bc8jPOaDRSXeaO3IiNWBFpTO-Ewag',
  },
  {
    id: 2,
    name: 'Recycled Denim Jeans',
    price: 89.00,
    originalPrice: 136.92,
    discount: 35,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO7m66uNd9tZAG74XB4lG5dDsm3TSQlIxR4zrTFd1Kyx5HTkEQJgtdFvPslijBjsNoi8y2EFwjn-Ir1uORhEO0fkBRQVT2bxRUBJzTzLmkmHFhiBdGYc0rHsUkHZlIewt_zBKJ9jIcurcBC_tAMLO2FwQNFZAMSzwcsHiorPMpcykRvkVJcGuqEIv2Otv7gNcr3Ct7gi1JWvgczZcHkjKG-hEhcqygSQ0dN7YjDcm1GIAWeI-t5se9aA65ZQTPNYB1HU-rnv0Oo3U',
  },
  {
    id: 3,
    name: 'Linen Blend Jumpsuit',
    price: 120.00,
    originalPrice: 171.43,
    discount: 30,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc3aNL-EpeBmXSyg_NGLAYsJHEQ7WdJYutX-euRhB0Lpt6lfr4QDU4TSCOId3mLlPvZ-SiFvFD1ohWnLpfzGTXIlwvDMS3FIXhSi49cXByn0W0kSXf3VXrRZkk5RQFDz0fEN_IQd-YXPsrcChsfRhNnYJNwAoCMD_hTMb05D0B_kRlEf0Z2MdO5kj7-KBb7DXK7DzNHxLfuMeP4H1EnoKnFrxIB4ZcU82sFzdZI8LgHfaEsCNAwN_vPCwWe2_DMxfLzCWSh2PcE84',
  },
  {
    id: 4,
    name: 'Bamboo Fiber Scarf',
    price: 45.00,
    originalPrice: 60.00,
    discount: 25,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqQb-3vCKr5Cy54zJPak9YvAstNSCOBT-dXGbKQwPWC4yEvsDQkg8o8X0iGhDofqdpBH5e7bFQFhhVkOSRe1vUNjoZLVbaSG8MwGqzJlSo08L6fnMbdBsfIDznNXTs1-TgkMPrCjiO9Kwrr56N6dqYN2xQR33VV4kGTcL767MwE2CRoIpgVj2pnBEh7A7s22MPI9dnbjw8MkTgpDEuVLyXvLQAYpsmd7VWoKa0cROi2NCFDjCaBlXuPOXodpDd8KixyIpWflTPSdU',
  },
  {
    id: 5,
    name: 'Hemp Canvas Tote Bag',
    price: 55.00,
    originalPrice: 110.00,
    discount: 50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmovUiBG-1l0k7J1hST6-eoI_Bxlb5U42zsxEQpax78_nuA4YlKNdAovadj7M_k9qFzI20XcWdmi7pagwyNnt0GtytwveUD0Y_3vIZDs122ebLcl5hlXbMISxb1FiIA2w7ljOsCNFIA0dfTEBbGEBtutPx9A9863-sTTxURJdHssFg3zuZQAm1mghVHd83K5_jxDps5k8mRhfWLULPcYwxBDBdIVOYmIz9xS7PSaawJjH-cktzGypDoIllwUliQOVO2hZ67iAPBG4',
  },
]);

// Best Selling Products
const bestSellingProducts = ref([
  {
    id: 1,
    name: 'Hemp Canvas Tote Bag',
    price: 55.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmovUiBG-1l0k7J1hST6-eoI_Bxlb5U42zsxEQpax78_nuA4YlKNdAovadj7M_k9qFzI20XcWdmi7pagwyNnt0GtytwveUD0Y_3vIZDs122ebLcl5hlXbMISxb1FiIA2w7ljOsCNFIA0dfTEBbGEBtutPx9A9863-sTTxURJdHssFg3zuZQAm1mghVHd83K5_jxDps5k8mRhfWLULPcYwxBDBdIVOYmIz9xS7PSaawJjH-cktzGypDoIllwUliQOVO2hZ67iAPBG4',
  },
  {
    id: 2,
    name: 'Cork Leather Wallet',
    price: 40.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXuZ8uwy3dN69FS0oZAipw_d1C41zS7Q3pY1ViV3aWgBqqGPVwpGARRf8BSaIfM8MtSji_RcoWoDOzieP1HjmPw2coUSC1unVa1ZI6jQB3NyHWk5C77kHOxTiqCqWxQQ7Ds3tXnKxSIgJxpnjjK00WAk8klqIox62Yj4loe4VIQ6mQjvaRLwUQAyMB3YvEcHBcI-ya4Qaff4krGySp___g2Gqgote169KI-NWCggzky9wgCw7ppjh-DOfWKwVGhZoSZKTfpo-Vxgk',
  },
  {
    id: 3,
    name: 'Fair Trade Sundress',
    price: 95.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqJfwJ1ECb_F0nsSF5FZfm7lOQmh_MiHI31ACcEekzzfc54qPc1OeKQS3hg_SOpPFrmq5bL75PZnrC2KztJqUx3pT7jhKBD3AxItlQL5ZX5p34VImNNVqg6pOBbZG-izBSEbe2Zc4aeQFI0dw_X5MATObvVwc_h9cD09kVR8e2TkkloAwkcjkP4YFZGPKpV8R21sUc9DATpoECmckPy8T6aiOoQ0NjsBXsKL4lktOZc81oNAlYCpm0ovspwcJN5rogZS3Jw9Yo2-o',
  },
  {
    id: 4,
    name: 'Reclaimed Wood Sunglasses',
    price: 75.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_q5SLA5IZmfbUy0_Qr6w_Gm_zeNflgmEWZ8uUq9u6XT4svt-xVn-JcER3XOwR50PyMZs_MFc7DLBn-4rPrTNfODQ_77R-XRgr7etbgPfipMgA2Zj33kksGz-TcqYd5W492x1IjUvrldK1_QnUHE7nlmfi-wSRShUFVZgUff3bIl7EWpbcmlnVVfI0in6CtL6RO_w9nukFrctgN0zrKV6Mo6Qo0hAMl0t6ltNYxJVfYlT7rmD4PFxaOpfQDUq3X3U3PotFEl8v_dI',
  },
]);

// Music Banner
const musicBanner = ref({
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqJFXx0NC9JH-Uin8yYR6dMR5sdJY24a3KApzrw0wNUbN6SR0eO9T1Oy60G3kNqm6zaXzDfvJIev84Vg1YwcbV3dNeuBWH1iMBHxNaE4ZXxjHWhkGJauT66OtQFiWqK_nP6TQZg14BbCHrsJozuYr3rBuQxsVPDXRy90kRtcVkKIRwWH3bvGxA1aPsuCs7ACNOAa77hmK8Tlq8YxrrpyrmSW_fPBl2uktbiwGD7FMNi2kOY1Bc8jPOaDRSXeaO3IiNWBFpTO-Ewag',
});

// New Arrival Products
const newArrivalProducts = ref([
  {
    id: 1,
    name: 'PlayStation 5',
    description: 'Black and White version of the PS5 coming out on sale.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO7m66uNd9tZAG74XB4lG5dDsm3TSQlIxR4zrTFd1Kyx5HTkEQJgtdFvPslijBjsNoi8y2EFwjn-Ir1uORhEO0fkBRQVT2bxRUBJzTzLmkmHFhiBdGYc0rHsUkHZlIewt_zBKJ9jIcurcBC_tAMLO2FwQNFZAMSzwcsHiorPMpcykRvkVJcGuqEIv2Otv7gNcr3Ct7gi1JWvgczZcHkjKG-hEhcqygSQ0dN7YjDcm1GIAWeI-t5se9aA65ZQTPNYB1HU-rnv0Oo3U',
  },
  {
    id: 2,
    name: "Women's Collections",
    description: 'Featured woman collections that give you another vibe.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc3aNL-EpeBmXSyg_NGLAYsJHEQ7WdJYutX-euRhB0Lpt6lfr4QDU4TSCOId3mLlPvZ-SiFvFD1ohWnLpfzGTXIlwvDMS3FIXhSi49cXByn0W0kSXf3VXrRZkk5RQFDz0fEN_IQd-YXPsrcChsfRhNnYJNwAoCMD_hTMb05D0B_kRlEf0Z2MdO5kj7-KBb7DXK7DzNHxLfuMeP4H1EnoKnFrxIB4ZcU82sFzdZI8LgHfaEsCNAwN_vPCwWe2_DMxfLzCWSh2PcE84',
  },
  {
    id: 3,
    name: 'Speakers',
    description: 'Amazon wireless speakers',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqQb-3vCKr5Cy54zJPak9YvAstNSCOBT-dXGbKQwPWC4yEvsDQkg8o8X0iGhDofqdpBH5e7bFQFhhVkOSRe1vUNjoZLVbaSG8MwGqzJlSo08L6fnMbdBsfIDznNXTs1-TgkMPrCjiO9Kwrr56N6dqYN2xQR33VV4kGTcL767MwE2CRoIpgVj2pnBEh7A7s22MPI9dnbjw8MkTgpDEuVLyXvLQAYpsmd7VWoKa0cROi2NCFDjCaBlXuPOXodpDd8KixyIpWflTPSdU',
  },
  {
    id: 4,
    name: 'Perfume',
    description: 'GUCCI INTENSE OUD EDP',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmovUiBG-1l0k7J1hST6-eoI_Bxlb5U42zsxEQpax78_nuA4YlKNdAovadj7M_k9qFzI20XcWdmi7pagwyNnt0GtytwveUD0Y_3vIZDs122ebLcl5hlXbMISxb1FiIA2w7ljOsCNFIA0dfTEBbGEBtutPx9A9863-sTTxURJdHssFg3zuZQAm1mghVHd83K5_jxDps5k8mRhfWLULPcYwxBDBdIVOYmIz9xS7PSaawJjH-cktzGypDoIllwUliQOVO2hZ67iAPBG4',
  },
]);

// Methods
const formatTime = (value: number): string => {
  return value.toString().padStart(2, '0');
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value);
    // TODO: Implement search functionality
  }
};

const handleSubscribe = () => {
  if (subscribeEmail.value.trim()) {
    console.log('Subscribing:', subscribeEmail.value);
    subscribeEmail.value = '';
    // TODO: Implement subscribe functionality
  }
};

const scrollFlashSales = (direction: 'left' | 'right') => {
  if (flashSalesContainer.value) {
    const scrollAmount = 300;
    flashSalesContainer.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }
};

const scrollCategories = (direction: 'left' | 'right') => {
  // Categories are in a grid, so scrolling might not be needed
  // But we can implement if needed
  console.log('Scroll categories:', direction);
};

const updateCountdown = () => {
  if (countdown.value.seconds > 0) {
    countdown.value.seconds--;
  } else {
    countdown.value.seconds = 59;
    if (countdown.value.minutes > 0) {
      countdown.value.minutes--;
    } else {
      countdown.value.minutes = 59;
      if (countdown.value.hours > 0) {
        countdown.value.hours--;
      } else {
        countdown.value.hours = 23;
        if (countdown.value.days > 0) {
          countdown.value.days--;
        }
      }
    }
  }
};

const updateMusicCountdown = () => {
  if (musicCountdown.value.seconds > 0) {
    musicCountdown.value.seconds--;
  } else {
    musicCountdown.value.seconds = 59;
    if (musicCountdown.value.minutes > 0) {
      musicCountdown.value.minutes--;
    } else {
      musicCountdown.value.minutes = 59;
      if (musicCountdown.value.hours > 0) {
        musicCountdown.value.hours--;
      } else {
        musicCountdown.value.hours = 23;
        if (musicCountdown.value.days > 0) {
          musicCountdown.value.days--;
        }
      }
    }
  }
};

onMounted(() => {
  countdownInterval = setInterval(updateCountdown, 1000);
  musicCountdownInterval = setInterval(updateMusicCountdown, 1000);
});

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  if (musicCountdownInterval) {
    clearInterval(musicCountdownInterval);
  }
});
</script>

<style scoped>
/* Hide scrollbar for flash sales */
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>
