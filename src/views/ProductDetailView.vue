<template>
  <div class="flex flex-col gap-10">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Loading product...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <p class="text-lg font-semibold text-red-600 dark:text-red-400">{{ error }}</p>
        <RouterLink to="/products" class="mt-4 inline-block text-primary hover:underline">
          Back to Products
        </RouterLink>
      </div>
    </div>

    <!-- Product Content -->
    <div v-else-if="product" class="flex flex-col gap-10">
      <!-- Breadcrumbs -->
      <div class="flex flex-wrap gap-2 pb-2">
        <RouterLink
          to="/"
          class="text-[#647387] dark:text-gray-400 text-sm font-medium leading-normal hover:text-primary dark:hover:text-white transition-colors"
        >
          Home
        </RouterLink>
        <span class="text-[#647387] dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <RouterLink
          to="/products"
          class="text-[#647387] dark:text-gray-400 text-sm font-medium leading-normal hover:text-primary dark:hover:text-white transition-colors"
        >
          Products
        </RouterLink>
        <span v-if="product.categoryName" class="text-[#647387] dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <RouterLink
          v-if="product.categoryName"
          to="/products"
          class="text-[#647387] dark:text-gray-400 text-sm font-medium leading-normal hover:text-primary dark:hover:text-white transition-colors"
        >
          {{ product.categoryName }}
        </RouterLink>
        <span class="text-[#647387] dark:text-gray-400 text-sm font-medium leading-normal">/</span>
        <span class="text-[#111417] dark:text-white text-sm font-medium leading-normal">{{ product.name }}</span>
      </div>

      <!-- Main Product Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <!-- Left Column: Image Carousel -->
        <div class="flex flex-col gap-4">
          <!-- Main Image -->
          <div
            class="w-full bg-center bg-no-repeat aspect-[4/5] bg-cover rounded-lg shadow-sm overflow-hidden"
            :style="{ backgroundImage: `url('${selectedImage || product.imageUrl || 'https://placehold.co/600x750'}')` }"
          >
            <img
              :src="selectedImage || product.imageUrl || 'https://placehold.co/600x750'"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Thumbnail Images -->
          <div class="grid grid-cols-4 gap-4">
            <button
              v-for="(image, index) in productImages"
              :key="index"
              type="button"
              class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg overflow-hidden transition-all"
              :class="selectedImageIndex === index ? 'border-2 border-primary ring-2 ring-primary/20' : 'border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'"
              @click="selectImage(index)"
            >
              <img
                :src="image"
                :alt="`${product.name} - Image ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Right Column: Product Details -->
        <div class="flex flex-col gap-6 pt-4">
          <!-- Product Name and Price -->
          <div class="flex flex-col gap-3">
            <h1 class="text-[#111417] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              {{ product.name }}
            </h1>
            <h2 class="text-[#111417] dark:text-white text-3xl font-bold tracking-tight">
              {{ formatPrice(product.priceCents, product.currencyCode) }}
            </h2>
          </div>

          <!-- Stock Status -->
          <div class="flex items-center gap-3">
            <span
              v-if="isInStock"
              class="inline-flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50 px-3 py-1 text-sm font-medium text-green-700 dark:text-green-300"
            >
              In Stock
            </span>
            <span
              v-else
              class="inline-flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 px-3 py-1 text-sm font-medium text-red-700 dark:text-red-300"
            >
              Out of Stock
            </span>
            <span v-if="availableQuantity > 0" class="text-sm text-gray-600 dark:text-gray-400">
              ({{ availableQuantity }} available)
            </span>
          </div>

          <!-- Description -->
          <p v-if="product.description" class="text-[#647387] dark:text-gray-400 text-base leading-relaxed">
            {{ product.description }}
          </p>

          <!-- Quantity and Add to Cart -->
          <div class="flex flex-col gap-6 pt-4">
            <!-- Quantity Selector -->
            <div class="flex items-center gap-4">
              <label class="text-[#111417] dark:text-white font-medium">Quantity</label>
              <div class="flex items-center rounded-full bg-background-light dark:bg-background-dark p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  class="size-8 rounded-full text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700"
                  :disabled="quantity <= 1"
                  @click="handleDecreaseQuantity"
                >
                  <span class="material-symbols-outlined text-lg">remove</span>
                </Button>
                <input
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  :max="availableQuantity"
                  class="w-10 border-0 bg-transparent text-center font-medium text-[#111417] dark:text-white focus:ring-0 focus:outline-none"
                  @input="handleQuantityInput"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  class="size-8 rounded-full text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700"
                  :disabled="quantity >= availableQuantity"
                  @click="handleIncreaseQuantity"
                >
                  <span class="material-symbols-outlined text-lg">add</span>
                </Button>
              </div>
            </div>

            <!-- Add to Cart Button -->
            <Button
              class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 bg-primary text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!isInStock || addingToCart"
              @click="handleAddToCart"
            >
              <span v-if="addingToCart" class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></span>
              <span v-else class="material-symbols-outlined">shopping_bag</span>
              {{ addingToCart ? 'Adding...' : 'Add to Cart' }}
            </Button>
          </div>
        </div>
      </div>

      <!-- "You May Also Like" Section -->
      <div v-if="relatedProducts.length > 0" class="pt-12">
        <h2 class="text-[#111417] dark:text-white text-3xl font-bold leading-tight tracking-tight mb-8">
          You May Also Like
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            class="flex flex-col gap-4 rounded-lg group cursor-pointer"
            @click="handleProductClick(relatedProduct)"
          >
            <div class="w-full bg-center bg-no-repeat aspect-[4/5] bg-cover rounded-lg overflow-hidden">
              <div
                class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                :style="{ backgroundImage: `url('${relatedProduct.imageUrl || 'https://placehold.co/400x500'}')` }"
              >
                <img
                  :src="relatedProduct.imageUrl || 'https://placehold.co/400x500'"
                  :alt="relatedProduct.name"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <h3 class="text-[#111417] dark:text-white text-base font-semibold leading-normal">
                {{ relatedProduct.name }}
              </h3>
              <p class="text-[#647387] dark:text-gray-400 text-base font-medium">
                {{ formatPrice(relatedProduct.priceCents, relatedProduct.currencyCode) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { productApi } from '@/services/product';
import { useCartStore } from '@/stores/cart';
import Button from '@/components/ui/button/Button.vue';
import type { ProductResponseDto } from '@/types/product';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

// State
const product = ref<ProductResponseDto | null>(null);
const relatedProducts = ref<ProductResponseDto[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const quantity = ref(1);
const addingToCart = ref(false);
const selectedImageIndex = ref(0);

// Computed
const productImages = computed(() => {
  if (!product.value) return [];
  const images: string[] = [];
  if (product.value.imageUrl) {
    images.push(product.value.imageUrl);
  }
  // Generate thumbnails from main image (product images array will be used when available)
  while (images.length < 4) {
    images.push(product.value.imageUrl || 'https://placehold.co/150');
  }
  return images;
});

const selectedImage = computed(() => {
  return productImages.value[selectedImageIndex.value] || product.value?.imageUrl;
});

const isInStock = computed(() => {
  if (!product.value) return false;
  if (product.value.quantity === undefined || product.value.safetyStock === undefined) {
    return product.value.isActive;
  }
  return product.value.quantity - (product.value.safetyStock || 0) > 0;
});

const availableQuantity = computed(() => {
  if (!product.value) return 0;
  if (product.value.quantity === undefined || product.value.safetyStock === undefined) {
    return isInStock.value ? 999 : 0;
  }
  return Math.max(0, product.value.quantity - (product.value.safetyStock || 0));
});

// Methods
const formatPrice = (priceCents: number, currencyCode: string = 'USD'): string => {
  const price = priceCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);
};

const selectImage = (index: number) => {
  selectedImageIndex.value = index;
};

const handleIncreaseQuantity = () => {
  if (quantity.value < availableQuantity.value) {
    quantity.value++;
  }
};

const handleDecreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const handleQuantityInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = parseInt(target.value, 10);
  if (isNaN(value) || value < 1) {
    quantity.value = 1;
  } else if (value > availableQuantity.value) {
    quantity.value = availableQuantity.value;
  } else {
    quantity.value = value;
  }
};

const handleAddToCart = async () => {
  if (!product.value || !isInStock.value) {
    return;
  }

  addingToCart.value = true;
  try {
    await cartStore.addItem(product.value.id, quantity.value);
    // Toast message is handled by cartStore.addItem()
  } catch (err: any) {
    // Error toast is handled by cartStore.addItem()
  } finally {
    addingToCart.value = false;
  }
};

const handleProductClick = (product: ProductResponseDto) => {
  router.push(`/products/${product.slug}`);
};

const fetchProduct = async () => {
  loading.value = true;
  error.value = null;

  try {
    const slug = route.params.slug as string;
    if (!slug) {
      error.value = 'Invalid product slug';
      return;
    }

    const response = await productApi.getBySlug(slug);
    if (response.success && response.data) {
      product.value = response.data;
      await fetchRelatedProducts();
    } else {
      error.value = 'Product not found';
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load product';
  } finally {
    loading.value = false;
  }
};

const fetchRelatedProducts = async () => {
  try {
    const response = await productApi.getAll({
      page: 0,
      size: 4,
      sort: 'createdAt',
      direction: 'DESC',
    });

    if (response.success && response.data?.content) {
      // Filter out current product and get 4 related products
      relatedProducts.value = response.data.content
        .filter((p) => p.id !== product.value?.id)
        .slice(0, 4);
    }
  } catch (err) {
    // Silently fail for related products
    // Error is logged by axios interceptor if needed
  }
};

// Lifecycle
onMounted(async () => {
  await fetchProduct();
  await cartStore.initCart();
});
</script>

