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
              <Button
                variant="outline"
                size="icon"
                class="rounded-full"
                @click="scrollFlashSales('left')"
              >
                <span class="material-symbols-outlined">arrow_back</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                class="rounded-full"
                @click="scrollFlashSales('right')"
              >
                <span class="material-symbols-outlined">arrow_forward</span>
              </Button>
            </div>
          </div>
          <div ref="flashSalesContainer" class="flex gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none]">
            <div
              v-for="product in flashSaleProducts"
              :key="product.id"
              class="group w-64 flex-shrink-0 cursor-pointer"
              @click="handleProductClick(product)"
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
                  <Button variant="ghost" size="icon" class="h-8 w-8 rounded-full bg-white text-text-primary hover:text-primary" @click.stop>
                    <span class="material-symbols-outlined text-xl">favorite</span>
                  </Button>
                  <Button variant="ghost" size="icon" class="h-8 w-8 rounded-full bg-white text-text-primary hover:text-primary" @click.stop="handleProductClick(product)">
                    <span class="material-symbols-outlined text-xl">visibility</span>
                  </Button>
                </div>
                <Button 
                  class="absolute bottom-0 w-full translate-y-full bg-black py-2 text-white transition-transform duration-300 group-hover:translate-y-0"
                  @click.stop="handleAddToCart(product.id)"
                >
                  Add To Cart
                </Button>
              </div>
              <div class="mt-4">
                <p class="font-medium hover:text-primary transition-colors">{{ product.name }}</p>
                <div class="flex items-center gap-2">
                  <p class="text-primary">${{ product.price }}</p>
                  <p class="text-sm text-gray-500 line-through">${{ product.originalPrice }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-8 text-center">
            <Button as-child>
              <RouterLink 
                to="/products" 
                class="inline-block rounded bg-primary px-12 py-4 font-medium text-white transition-colors hover:bg-red-700"
              >
                View All Products
              </RouterLink>
            </Button>
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
                  <Button variant="ghost" size="icon" class="h-8 w-8 rounded-full bg-white text-text-primary hover:text-primary">
                    <span class="material-symbols-outlined text-xl">favorite</span>
                  </Button>
                  <Button variant="ghost" size="icon" class="h-8 w-8 rounded-full bg-white text-text-primary hover:text-primary">
                    <span class="material-symbols-outlined text-xl">visibility</span>
                  </Button>
                </div>
                <Button 
                  class="absolute bottom-0 w-full translate-y-full bg-black py-2 text-white transition-transform duration-300 group-hover:translate-y-0"
                  @click="handleAddToCart(product.id)"
                >
                  Add To Cart
                </Button>
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
              v-if="newArrivalProducts.length > 0"
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
import { RouterLink, useRouter } from 'vue-router';
import { categoryApi } from '@/services/category';
import { productApi } from '@/services/product';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cart';
import type { CategoryResponseDto } from '@/types/category';
import type { ProductResponseDto } from '@/types/product';

const router = useRouter();
const flashSalesContainer = ref<HTMLElement | null>(null);
const cartStore = useCartStore();

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
const categories = ref<CategoryResponseDto[]>([]);

// Product Categories
const productCategories = ref([
  { id: 1, name: 'Phones', icon: 'phone_iphone' },
  { id: 2, name: 'Computers', icon: 'computer' },
  { id: 3, name: 'SmartWatch', icon: 'watch' },
  { id: 4, name: 'Camera', icon: 'photo_camera' },
  { id: 5, name: 'HeadPhones', icon: 'headphones' },
  { id: 6, name: 'Gaming', icon: 'stadia_controller' },
]);

// Extended product type for display with additional UI fields
interface DisplayProduct extends ProductResponseDto {
  image: string;
  discount: number;
  originalPrice: number;
  price: number; // Converted from priceCents
}

// Flash Sale Products (Using New Arrivals for now as placeholder)
const flashSaleProducts = ref<DisplayProduct[]>([]);

// Best Selling Products
const bestSellingProducts = ref<DisplayProduct[]>([]);

// New Arrival Products
const newArrivalProducts = ref<DisplayProduct[]>([]);

// Music Banner
const musicBanner = ref({
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqJFXx0NC9JH-Uin8yYR6dMR5sdJY24a3KApzrw0wNUbN6SR0eO9T1Oy60G3kNqm6zaXzDfvJIev84Vg1YwcbV3dNeuBWH1iMBHxNaE4ZXxjHWhkGJauT66OtQFiWqK_nP6TQZg14BbCHrsJozuYr3rBuQxsVPDXRy90kRtcVkKIRwWH3bvGxA1aPsuCs7ACNOAa77hmK8Tlq8YxrrpyrmSW_fPBl2uktbiwGD7FMNi2kOY1Bc8jPOaDRSXeaO3IiNWBFpTO-Ewag',
});

// Fetch data
const fetchData = async () => {
  try {
    // Fetch Categories
    const categoryRes = await categoryApi.getAll({ page: 1, size: 10 });
    if (categoryRes.success) {
      categories.value = categoryRes.data.content.map(c => ({
        ...c,
        hasChildren: false // Backend doesn't support hierarchy yet
      }));
    }

    // Fetch Products (New Arrivals)
    const productRes = await productApi.getAll({ 
      page: 1, 
      size: 10, 
      sort: 'createdAt', 
      direction: 'DESC' 
    });
    
    if (productRes.success) {
      const products: DisplayProduct[] = productRes.data.content.map(p => ({
        ...p,
        price: p.priceCents / 100, // Convert cents to dollars
        originalPrice: (p.priceCents * 1.2) / 100, // Fake original price
        discount: 20,
        image: p.imageUrl || 'https://placehold.co/400',
      }));

      newArrivalProducts.value = products.slice(0, 4);
      flashSaleProducts.value = products;
      bestSellingProducts.value = products.slice(0, 4);
    }
  } catch (error) {
    // Error handled silently - page will show empty state
  }
};

// Methods
const formatTime = (value: number): string => {
  return value.toString().padStart(2, '0');
};

const handleProductClick = (product: ProductResponseDto) => {
  router.push(`/products/${product.slug}`);
};

const handleAddToCart = async (productId: number) => {
  try {
    await cartStore.addItem(productId, 1);
  } catch (error) {
    // Error is handled by cart store with toast
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
  fetchData();
  // Initialize cart if not already loaded
  if (cartStore.cartCount === 0) {
    cartStore.initCart();
  }
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
