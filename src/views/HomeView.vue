<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';

const flashSalesContainer = ref<HTMLElement | null>(null);

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
  // Categories are displayed in a grid, scrolling not needed
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
