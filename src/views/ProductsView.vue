<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Our Products</h1>
      <p class="text-gray-500 dark:text-gray-400">Browse our collection of high-quality products</p>
    </div>

    <!-- Filters Section -->
    <div class="mb-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm flex flex-wrap items-center justify-between gap-6">
      <div class="flex flex-wrap items-center gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="sort">
            Sort by
          </label>
          <select
            id="sort"
            v-model="filters.sort"
            class="w-48 rounded-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50 text-sm"
            @change="handleFilterChange"
          >
            <option value="createdAt,DESC">Newest</option>
            <option value="createdAt,ASC">Oldest</option>
            <option value="name,ASC">Name: A-Z</option>
            <option value="name,DESC">Name: Z-A</option>
            <option value="id,DESC">ID: High to Low</option>
            <option value="id,ASC">ID: Low to High</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="category">
            Category
          </label>
          <select
            id="category"
            v-model="filters.categoryId"
            class="w-48 rounded-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50 text-sm"
            @change="handleFilterChange"
          >
            <option :value="undefined">All</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="search">
            Search
          </label>
          <input
            id="search"
            v-model="filters.name"
            type="text"
            placeholder="Product name..."
            class="w-48 rounded-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50 text-sm px-4 py-2"
            @input="handleFilterChange"
          />
        </div>
      </div>
      <button
        @click="handleApplyFilters"
        class="bg-primary text-white font-semibold py-2 px-6 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-md"
      >
        Apply Filters
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">Loading products...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">{{ error }}</p>
      <button
        @click="fetchProducts"
        class="mt-4 bg-primary text-white font-semibold py-2 px-6 rounded-full hover:bg-opacity-90 transition-all duration-300"
      >
        Retry
      </button>
    </div>

    <!-- Products Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-background-light dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl"
      >
        <div class="relative bg-gray-100 dark:bg-gray-700 aspect-square p-8 cursor-pointer" @click="handleProductClick(product)">
          <img
            :alt="product.name"
            :src="product.image"
            class="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
          />
          <div
            v-if="product.stockStatus"
            :class="[
              'absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded-full',
              product.stockStatus === STOCK_STATUS_IN_STOCK ? 'bg-green-500' : '',
              product.stockStatus === STOCK_STATUS_LOW_STOCK ? 'bg-orange-500' : '',
              product.stockStatus === STOCK_STATUS_OUT_OF_STOCK ? 'bg-red-500' : '',
            ]"
          >
            {{ product.stockStatus }}
          </div>
        </div>
        <div class="p-6">
          <RouterLink :to="`${PRODUCTS_PATH}/${product.slug}`" class="block mb-2">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors">
              {{ product.name }}
            </h3>
          </RouterLink>
          <p class="text-xl font-bold text-primary mb-4">
            {{ formatPrice(product.priceCents, product.currencyCode) }}
          </p>
          <button
            :disabled="product.stockStatus === STOCK_STATUS_OUT_OF_STOCK"
            :class="[
              'w-full font-semibold py-3 px-4 rounded-full transition-all duration-300 shadow-md',
              product.stockStatus === STOCK_STATUS_OUT_OF_STOCK
                ? 'bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed'
                : 'bg-primary text-white hover:bg-opacity-90',
            ]"
            @click.stop="handleAddToCart(product)"
          >
            {{ product.stockStatus === STOCK_STATUS_OUT_OF_STOCK ? STOCK_STATUS_OUT_OF_STOCK : ADD_TO_CART_TEXT }}
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && !error && products.length === 0" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400 text-lg">No products found</p>
      <button
        @click="resetFilters"
        class="mt-4 bg-primary text-white font-semibold py-2 px-6 rounded-full hover:bg-opacity-90 transition-all duration-300"
      >
        Clear Filters
      </button>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && !error && products.length > 0" class="mt-12 flex justify-center items-center gap-4">
      <button
        :disabled="pagination.page === 1"
        :class="[
          'px-4 py-2 rounded-full font-medium transition-all duration-300',
          pagination.page === 1
            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-primary text-white hover:bg-opacity-90',
        ]"
        @click="handlePageChange(pagination.page - 1)"
      >
        Previous
      </button>
      <span class="text-gray-700 dark:text-gray-300">
        Page {{ pagination.page }} of {{ pagination.totalPages }}
      </span>
      <button
        :disabled="pagination.page >= pagination.totalPages"
        :class="[
          'px-4 py-2 rounded-full font-medium transition-all duration-300',
          pagination.page >= pagination.totalPages
            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-primary text-white hover:bg-opacity-90',
        ]"
        @click="handlePageChange(pagination.page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { productApi } from '@/services/product';
import { categoryApi } from '@/services/category';
import { useCartStore } from '@/stores/cart';
import type { ProductResponseDto } from '@/types/product';
import type { CategoryResponseDto } from '@/types/category';
import type { PaginationResponse } from '@/types/api';

const PRODUCTS_PATH = '/products';
const DEFAULT_CURRENCY_CODE = 'USD';
const CENTS_TO_CURRENCY_DIVISOR = 100;
const LOCALE_EN_US = 'en-US';
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;
const DEFAULT_CATEGORY_PAGE_SIZE = 100;
const DEFAULT_SORT = 'createdAt,DESC';
const SORT_SEPARATOR = ',';
const DEFAULT_PLACEHOLDER_IMAGE = 'https://placehold.co/400';
const STOCK_STATUS_IN_STOCK = 'In Stock';
const STOCK_STATUS_LOW_STOCK = 'Low Stock';
const STOCK_STATUS_OUT_OF_STOCK = 'Out of Stock';
const ADD_TO_CART_TEXT = 'Add To Cart';
const MIN_QUANTITY = 0;
const DEFAULT_QUANTITY = 1;
const SCROLL_TOP = 0;
const SCROLL_BEHAVIOR = 'smooth';

const router = useRouter();
const cartStore = useCartStore();

const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const products = ref<ProductResponseDto[]>([]);
const categories = ref<CategoryResponseDto[]>([]);
const pagination = ref({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  totalPages: 0,
  totalElements: 0,
});

const filters = ref({
  sort: DEFAULT_SORT,
  categoryId: undefined as number | undefined,
  name: undefined as string | undefined,
});

const stockStatus = computed(() => {
  return (product: ProductResponseDto): string => {
    const quantity = product.quantity ?? MIN_QUANTITY;
    const safetyStock = product.safetyStock ?? MIN_QUANTITY;

    if (quantity === MIN_QUANTITY) {
      return STOCK_STATUS_OUT_OF_STOCK;
    }
    if (quantity <= safetyStock) {
      return STOCK_STATUS_LOW_STOCK;
    }
    return STOCK_STATUS_IN_STOCK;
  };
});

const formatPrice = (priceCents: number, currencyCode: string = DEFAULT_CURRENCY_CODE): string => {
  const price = priceCents / CENTS_TO_CURRENCY_DIVISOR;
  return new Intl.NumberFormat(LOCALE_EN_US, {
    style: 'currency',
    currency: currencyCode,
  }).format(price);
};

const handleFilterChange = (): void => {
  // Debounce could be added here if needed
};

const handleApplyFilters = (): void => {
  pagination.value.page = DEFAULT_PAGE;
  fetchProducts();
};

const resetFilters = (): void => {
  filters.value = {
    sort: DEFAULT_SORT,
    categoryId: undefined,
    name: undefined,
  };
  pagination.value.page = DEFAULT_PAGE;
  fetchProducts();
};

const handlePageChange = (page: number): void => {
  pagination.value.page = page;
  fetchProducts();
  window.scrollTo({ top: SCROLL_TOP, behavior: SCROLL_BEHAVIOR });
};

const handleProductClick = (product: ProductResponseDto): void => {
  router.push(`${PRODUCTS_PATH}/${product.slug}`);
};

const handleAddToCart = async (product: ProductResponseDto): Promise<void> => {
  if (product.stockStatus === STOCK_STATUS_OUT_OF_STOCK) {
    return;
  }
  try {
    await cartStore.addItem(product.id, DEFAULT_QUANTITY);
  } catch {
    // Error is handled by cart store with toast
  }
};

const fetchCategories = async (): Promise<void> => {
  try {
    const response = await categoryApi.getAll({ page: DEFAULT_PAGE, size: DEFAULT_CATEGORY_PAGE_SIZE });
    if (response.success) {
      categories.value = response.data.content;
    }
  } catch {
    // Error handled silently - category filter will just be empty
  }
};

const fetchProducts = async (): Promise<void> => {
  loading.value = true;
  error.value = null;

  try {
    const [sortField, sortDirection] = filters.value.sort.split(SORT_SEPARATOR);
    const params: Record<string, string | number> = {
      page: pagination.value.page,
      size: pagination.value.size,
      sort: sortField,
      direction: sortDirection,
    };

    if (filters.value.categoryId) {
      params.categoryId = String(filters.value.categoryId);
    }

    if (filters.value.name) {
      params.name = filters.value.name;
    }

    const response = await productApi.getAll(params);

    if (response.success) {
      products.value = response.data.content.map((p) => ({
        ...p,
        image: p.imageUrl || DEFAULT_PLACEHOLDER_IMAGE,
        stockStatus: stockStatus.value(p),
      }));
      pagination.value = {
        page: response.data.page,
        size: response.data.size,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
      };
    } else {
      error.value = 'Failed to load products';
    }
  } catch (err: unknown) {
    const axiosError = err as { response?: { data?: { message?: string } } };
    error.value = axiosError.response?.data?.message || 'Failed to load products. Please try again.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCategories();
  fetchProducts();
  if (cartStore.cartCount === 0) {
    cartStore.initCart();
  }
});
</script>

