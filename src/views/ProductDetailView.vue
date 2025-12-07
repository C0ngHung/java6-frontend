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
        <RouterLink :to="PRODUCTS_PATH" class="mt-4 inline-block text-primary hover:underline">
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
            :style="{ backgroundImage: `url('${selectedImage || product.imageUrl || DEFAULT_PLACEHOLDER_IMAGE}')` }"
          >
            <img
              :src="selectedImage || product.imageUrl || DEFAULT_PLACEHOLDER_IMAGE"
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
              <span
                v-if="addingToCart"
                class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"
                aria-hidden="true"
              ></span>
              <span v-else class="material-symbols-outlined" aria-hidden="true">shopping_bag</span>
              {{ addingToCart ? ADDING_TEXT : ADD_TO_CART_TEXT }}
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
                :style="{ backgroundImage: `url('${relatedProduct.imageUrl || DEFAULT_RELATED_PLACEHOLDER_IMAGE}')` }"
              >
                <img
                  :src="relatedProduct.imageUrl || DEFAULT_RELATED_PLACEHOLDER_IMAGE"
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

const PRODUCTS_PATH = '/products';
const DEFAULT_PLACEHOLDER_IMAGE = 'https://placehold.co/600x750';
const DEFAULT_RELATED_PLACEHOLDER_IMAGE = 'https://placehold.co/400x500';
const DEFAULT_THUMBNAIL_IMAGE = 'https://placehold.co/150';
const DEFAULT_CURRENCY_CODE = 'USD';
const CENTS_TO_CURRENCY_DIVISOR = 100;
const LOCALE_EN_US = 'en-US';
const MIN_QUANTITY = 1;
const MAX_THUMBNAILS = 4;
const RELATED_PRODUCTS_COUNT = 4;
const DEFAULT_QUANTITY_WHEN_IN_STOCK = 999;
const ADDING_TEXT = 'Adding...';
const ADD_TO_CART_TEXT = 'Add to Cart';
const RELATED_PRODUCTS_PAGE = 0;
const RELATED_PRODUCTS_SIZE = 4;
const DEFAULT_SORT_FIELD = 'createdAt';
const DEFAULT_SORT_DIRECTION = 'DESC';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const product = ref<ProductResponseDto | null>(null);
const relatedProducts = ref<ProductResponseDto[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const quantity = ref<number>(MIN_QUANTITY);
const addingToCart = ref<boolean>(false);
const selectedImageIndex = ref<number>(0);

// Computed
const productImages = computed(() => {
  if (!product.value) return [];
  const images: string[] = [];
  if (product.value.imageUrl) {
    images.push(product.value.imageUrl);
  }
  while (images.length < MAX_THUMBNAILS) {
    images.push(product.value.imageUrl || DEFAULT_THUMBNAIL_IMAGE);
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
  if (!product.value) {
    return 0;
  }
  if (product.value.quantity === undefined || product.value.safetyStock === undefined) {
    return isInStock.value ? DEFAULT_QUANTITY_WHEN_IN_STOCK : 0;
  }
  return Math.max(0, product.value.quantity - (product.value.safetyStock || 0));
});

// Methods
const formatPrice = (priceCents: number, currencyCode: string = DEFAULT_CURRENCY_CODE): string => {
  const price = priceCents / CENTS_TO_CURRENCY_DIVISOR;
  return new Intl.NumberFormat(LOCALE_EN_US, {
    style: 'currency',
    currency: currencyCode,
  }).format(price);
};

const selectImage = (index: number): void => {
  selectedImageIndex.value = index;
};

const handleIncreaseQuantity = (): void => {
  if (quantity.value < availableQuantity.value) {
    quantity.value++;
  }
};

const handleDecreaseQuantity = (): void => {
  if (quantity.value > MIN_QUANTITY) {
    quantity.value--;
  }
};

const handleQuantityInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const value = parseInt(target.value, 10);
  if (isNaN(value) || value < MIN_QUANTITY) {
    quantity.value = MIN_QUANTITY;
  } else if (value > availableQuantity.value) {
    quantity.value = availableQuantity.value;
  } else {
    quantity.value = value;
  }
};

const handleAddToCart = async (): Promise<void> => {
  if (!product.value || !isInStock.value) {
    return;
  }

  addingToCart.value = true;
  try {
    await cartStore.addItem(product.value.id, quantity.value);
  } catch {
    // Error toast is handled by cartStore.addItem()
  } finally {
    addingToCart.value = false;
  }
};

const handleProductClick = (product: ProductResponseDto): void => {
  router.push(`${PRODUCTS_PATH}/${product.slug}`);
};

const fetchProduct = async (): Promise<void> => {
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
  } catch (err: unknown) {
    const axiosError = err as { response?: { data?: { message?: string } } };
    error.value = axiosError.response?.data?.message || 'Failed to load product';
  } finally {
    loading.value = false;
  }
};

const fetchRelatedProducts = async (): Promise<void> => {
  try {
    const response = await productApi.getAll({
      page: RELATED_PRODUCTS_PAGE,
      size: RELATED_PRODUCTS_SIZE,
      sort: DEFAULT_SORT_FIELD,
      direction: DEFAULT_SORT_DIRECTION,
    });

    if (response.success && response.data?.content) {
      relatedProducts.value = response.data.content
        .filter((p) => p.id !== product.value?.id)
        .slice(0, RELATED_PRODUCTS_COUNT);
    }
  } catch {
    // Silently fail for related products
  }
};

// Lifecycle
onMounted(async () => {
  await fetchProduct();
  await cartStore.initCart();
});
</script>

