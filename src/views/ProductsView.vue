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
              product.stockStatus === 'In Stock' ? 'bg-green-500' : '',
              product.stockStatus === 'Low Stock' ? 'bg-orange-500' : '',
              product.stockStatus === 'Out of Stock' ? 'bg-red-500' : '',
            ]"
          >
            {{ product.stockStatus }}
          </div>
        </div>
        <div class="p-6">
          <RouterLink :to="`/products/${product.slug}`" class="block mb-2">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors">
              {{ product.name }}
            </h3>
          </RouterLink>
          <p class="text-xl font-bold text-primary mb-4">
            {{ formatPrice(product.priceCents, product.currencyCode) }}
          </p>
          <button
            :disabled="product.stockStatus === 'Out of Stock'"
            :class="[
              'w-full font-semibold py-3 px-4 rounded-full transition-all duration-300 shadow-md',
              product.stockStatus === 'Out of Stock'
                ? 'bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed'
                : 'bg-primary text-white hover:bg-opacity-90',
            ]"
            @click.stop="handleAddToCart(product)"
          >
            {{ product.stockStatus === 'Out of Stock' ? 'Out of Stock' : 'Add To Cart' }}
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

// Router
const router = useRouter();

// Stores
const cartStore = useCartStore();

// State
const loading = ref(false);
const error = ref<string | null>(null);
const products = ref<ProductResponseDto[]>([]);
const categories = ref<CategoryResponseDto[]>([]);
const pagination = ref({
  page: 1,
  size: 12,
  totalPages: 0,
  totalElements: 0,
});

// Filters
const filters = ref({
  sort: 'createdAt,DESC',
  categoryId: undefined as number | undefined,
  name: undefined as string | undefined,
});

// Computed
const stockStatus = computed(() => {
  return (product: ProductResponseDto) => {
    const quantity = product.quantity ?? 0;
    const safetyStock = product.safetyStock ?? 0;

    if (quantity === 0) return 'Out of Stock';
    if (quantity <= safetyStock) return 'Low Stock';
    return 'In Stock';
  };
});

// Methods
const formatPrice = (priceCents: number, currencyCode: string = 'USD'): string => {
  const price = priceCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);
};

const handleFilterChange = () => {
  // Debounce could be added here if needed
};

const handleApplyFilters = () => {
  pagination.value.page = 1;
  fetchProducts();
};

const resetFilters = () => {
  filters.value = {
    sort: 'createdAt,DESC',
    categoryId: undefined,
    name: undefined,
  };
  pagination.value.page = 1;
  fetchProducts();
};

const handlePageChange = (page: number) => {
  pagination.value.page = page;
  fetchProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleProductClick = (product: ProductResponseDto) => {
  router.push(`/products/${product.slug}`);
};

const handleAddToCart = async (product: ProductResponseDto) => {
  if (product.stockStatus === 'Out of Stock') {
    return;
  }
  try {
    await cartStore.addItem(product.id, 1);
  } catch (error) {
    // Error is handled by cart store with toast
  }
};

const fetchCategories = async () => {
  try {
    const response = await categoryApi.getAll({ page: 1, size: 100 });
    if (response.success) {
      categories.value = response.data.content;
    }
  } catch (err) {
    // Error handled silently - category filter will just be empty
  }
};

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;

  try {
    const [sortField, sortDirection] = filters.value.sort.split(',');
    const params: Record<string, any> = {
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
        image: p.imageUrl || 'https://placehold.co/400',
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
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load products. Please try again.';
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchCategories();
  fetchProducts();
  // Initialize cart if not already loaded
  if (cartStore.cartCount === 0) {
    cartStore.initCart();
  }
});
</script>

