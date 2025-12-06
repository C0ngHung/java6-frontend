<template>
  <div class="relative flex min-h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
    <!-- Top Header (if needed) -->
    
    <div class="flex flex-1 flex-row">
      <!-- SideNavBar -->
      <aside class="flex w-64 flex-col border-r border-border-light dark:border-border-dark bg-panel-light dark:bg-panel-dark overflow-y-auto">
      <div class="flex h-full flex-col justify-between p-4">
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-3 px-2">
            <div class="flex size-8 items-center justify-center rounded-lg bg-accent-green text-white">
              <span class="material-symbols-outlined text-[20px]">store</span>
            </div>
            <div class="flex flex-col">
              <h1 class="text-base font-bold text-text-light dark:text-text-dark">E-commerce</h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
            </div>
          </div>
          <nav class="flex flex-col gap-2">
            <RouterLink
              to="/admin/dashboard"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-text-light/80 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5"
            >
              <span class="material-symbols-outlined text-xl">dashboard</span>
              <p class="text-sm font-medium">Dashboard</p>
            </RouterLink>
            <RouterLink
              to="/admin/products"
              class="active flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary dark:bg-primary/20 dark:text-white"
            >
              <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1">inventory_2</span>
              <p class="text-sm font-medium">Products</p>
            </RouterLink>
            <RouterLink
              to="/admin/categories"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-text-light/80 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5"
            >
              <span class="material-symbols-outlined text-xl">category</span>
              <p class="text-sm font-medium">Categories</p>
            </RouterLink>
            <RouterLink
              to="/admin/inventory"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-text-light/80 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5"
            >
              <span class="material-symbols-outlined text-xl">warehouse</span>
              <p class="text-sm font-medium">Inventory</p>
            </RouterLink>
            <RouterLink
              to="/admin/users"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-text-light/80 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5"
            >
              <span class="material-symbols-outlined text-xl">group</span>
              <p class="text-sm font-medium">Users & Roles</p>
            </RouterLink>
          </nav>
        </div>
        <div class="flex flex-col gap-2 border-t border-border-light pt-4 dark:border-border-dark">
          <RouterLink
            to="/admin/settings"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-text-light/80 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5"
          >
            <span class="material-symbols-outlined text-xl">settings</span>
            <p class="text-sm font-medium">Settings</p>
          </RouterLink>
          <button
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-text-light/80 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5 w-full text-left"
            @click="handleLogout"
          >
            <span class="material-symbols-outlined text-xl">logout</span>
            <p class="text-sm font-medium">Log Out</p>
          </button>
        </div>
      </div>
    </aside>

      <!-- Main Content Area -->
      <main class="flex-1">
      <!-- TopNavBar -->
      <header class="flex h-16 items-center justify-between whitespace-nowrap border-b border-solid border-border-light bg-panel-light px-8 dark:border-border-dark dark:bg-panel-dark sticky top-0 z-10">
        <div class="flex items-center gap-4">
          <h2 class="text-lg font-bold text-text-light dark:text-text-dark">Product Management</h2>
        </div>
        <div class="flex items-center gap-4">
          <button class="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-text-light/80 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5">
            <span class="material-symbols-outlined text-2xl">notifications</span>
          </button>
          <div class="flex items-center gap-3">
            <div
              class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              data-alt="User avatar"
              :style="{ backgroundImage: `url('${userAvatar}')` }"
            ></div>
            <div class="flex flex-col text-right">
              <p class="text-sm font-medium text-text-light dark:text-text-dark">{{ userName }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ userRole }}</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Content Panel -->
      <div class="p-8">
        <!-- Page Heading -->
        <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div class="flex flex-col gap-1">
            <p class="text-gray-900 dark:text-white text-3xl font-bold leading-tight">Product Management</p>
            <p class="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Manage, add, and edit all products for your store.</p>
          </div>
          <Button
            @click="handleAddNew"
            class="rounded-full h-11 px-5"
          >
            <span class="material-symbols-outlined">add_circle</span>
            <span class="truncate">Add New Product</span>
          </Button>
        </div>

        <!-- Search and Filter Bar -->
        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <div class="flex-grow">
            <label class="flex flex-col min-w-40 h-12 w-full">
              <div class="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div class="text-gray-500 dark:text-gray-400 flex bg-white dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg border border-gray-200 dark:border-gray-700 border-r-0">
                  <span class="material-symbols-outlined">search</span>
                </div>
                <Input
                  v-model="filters.search"
                  type="text"
                  placeholder="Search by product name or SKU..."
                  class="rounded-r-lg rounded-l-none border-l-0 h-full"
                  @input="handleSearch"
                />
              </div>
            </label>
          </div>
          <div class="flex gap-3">
            <Button
              variant="outline"
              @click="showCategoryFilter = !showCategoryFilter"
              class="h-12"
            >
              <p class="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">
                {{ selectedCategory ? selectedCategory.name : 'Category' }}
              </p>
              <span class="material-symbols-outlined text-gray-500 dark:text-gray-400">expand_more</span>
            </Button>
            <Button
              variant="outline"
              @click="showStockFilter = !showStockFilter"
              class="h-12"
            >
              <p class="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">
                {{ stockStatusFilter || 'Stock Status' }}
              </p>
              <span class="material-symbols-outlined text-gray-500 dark:text-gray-400">expand_more</span>
            </button>
          </div>
        </div>

        <!-- Dropdown Filters -->
        <div v-if="showCategoryFilter" class="relative mb-4">
          <div class="absolute z-10 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-1">
            <div class="p-2">
              <button
                @click="handleCategorySelect(undefined)"
                class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                :class="!selectedCategory ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-300'"
              >
                All Categories
              </button>
              <button
                v-for="category in categories"
                :key="category.id"
                @click="handleCategorySelect(category)"
                class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                :class="selectedCategory?.id === category.id ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-300'"
              >
                {{ category.name }}
              </button>
            </div>
          </div>
        </div>

        <div v-if="showStockFilter" class="relative mb-4">
          <div class="absolute z-10 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-1">
            <div class="p-2">
              <button
                v-for="status in stockStatusOptions"
                :key="status"
                @click="handleStockStatusSelect(status)"
                class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                :class="stockStatusFilter === status ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-300'"
              >
                {{ status || 'All' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Products Table -->
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
          <!-- Loading State -->
          <div v-if="loading" class="p-8 text-center">
            <p class="text-gray-500 dark:text-gray-400">Loading products...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="p-8 text-center">
            <p class="text-red-500">{{ error }}</p>
            <Button
              @click="fetchProducts"
              class="mt-4 rounded-full"
            >
              Retry
            </Button>
          </div>

          <!-- Table -->
          <div v-else class="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="p-4">
                    <Checkbox
                      :model-value="selectAll"
                      @update:model-value="(value: boolean | 'indeterminate') => handleSelectAll(value === true)"
                    />
                  </TableHead>
                  <TableHead class="px-6 py-3">Product</TableHead>
                  <TableHead class="px-6 py-3">SKU</TableHead>
                  <TableHead class="px-6 py-3">Category</TableHead>
                  <TableHead class="px-6 py-3">Price</TableHead>
                  <TableHead class="px-6 py-3">Stock</TableHead>
                  <TableHead class="px-6 py-3 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  v-for="product in products"
                  :key="product.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <TableCell class="w-4 p-4">
                    <Checkbox
                      :model-value="selectedProducts.includes(product.id)"
                      @update:model-value="(value: boolean | 'indeterminate') => {
                        const checked = value === true;
                        if (checked) {
                          selectedProducts.push(product.id);
                        } else {
                          selectedProducts = selectedProducts.filter(id => id !== product.id);
                        }
                      }"
                    />
                  </TableCell>
                  <TableCell class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    <div class="flex items-center gap-3">
                      <img
                        :alt="product.name"
                        :src="product.imageUrl || 'https://placehold.co/40'"
                        class="w-10 h-10 rounded object-cover"
                      />
                      {{ product.name }}
                    </div>
                  </TableCell>
                  <TableCell class="px-6 py-4">{{ product.sku }}</TableCell>
                  <TableCell class="px-6 py-4">{{ product.categoryName || 'N/A' }}</TableCell>
                  <TableCell class="px-6 py-4">{{ formatPrice(product.priceCents, product.currencyCode) }}</TableCell>
                  <TableCell class="px-6 py-4">
                    <span
                      :class="[
                        'text-xs font-medium me-2 px-2.5 py-0.5 rounded-full',
                        getStockStatusClass(product),
                      ]"
                    >
                      {{ getStockStatusText(product) }}
                    </span>
                  </TableCell>
                  <TableCell class="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      @click="handleEdit(product)"
                      class="p-2"
                    >
                      <span class="material-symbols-outlined text-base">edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      @click="handleDelete(product)"
                      class="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-500"
                    >
                      <span class="material-symbols-outlined text-base">delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Empty State -->
          <div v-if="!loading && !error && products.length === 0" class="p-8 text-center">
            <p class="text-gray-500 dark:text-gray-400 text-lg">No products found</p>
          </div>

          <!-- Pagination -->
          <nav v-if="!loading && !error && products.length > 0" aria-label="Table navigation" class="flex items-center justify-between p-4">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span class="font-semibold text-gray-900 dark:text-white">
                {{ (pagination.page - 1) * pagination.size + 1 }}-{{ Math.min(pagination.page * pagination.size, pagination.totalElements) }}
              </span>
              of
              <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.totalElements }}</span>
            </span>
            <div class="inline-flex -space-x-px text-sm h-8">
              <Button
                variant="outline"
                size="sm"
                :disabled="pagination.page === 1"
                class="rounded-l-lg rounded-r-none"
                @click="handlePageChange(pagination.page - 1)"
              >
                Previous
              </Button>
              <Button
                v-for="page in visiblePages"
                :key="page"
                variant="outline"
                size="sm"
                :class="[
                  'rounded-none',
                  page === pagination.page && 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20'
                ]"
                @click="handlePageChange(page)"
              >
                {{ page }}
              </Button>
              <Button
                variant="outline"
                size="sm"
                :disabled="pagination.page >= pagination.totalPages"
                class="rounded-r-lg rounded-l-none"
                @click="handlePageChange(pagination.page + 1)"
              >
                Next
              </Button>
            </div>
          </nav>
        </div>
      </div>
      </main>
    </div>

    <!-- Product Form Modal -->
    <ProductFormModal
      :is-open="isModalOpen"
      :product="selectedProduct"
      @close="handleModalClose"
      @saved="handleModalSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { productApi } from '@/services/product';
import { categoryApi } from '@/services/category';
import ProductFormModal from '@/components/admin/ProductFormModal.vue';
import { useToast } from '@/composables/useToast';
import { getErrorMessage, DEFAULT_ERROR_MESSAGES } from '@/utils/getErrorMessage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { ProductResponseDto } from '@/types/product';
import type { CategoryResponseDto } from '@/types/category';
import type { PaginationRequest } from '@/types/api';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

// User info
const userName = computed(() => authStore.user?.username || 'Admin');
const userRole = computed(() => 'Administrator');
const userAvatar = ref(
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ9-hq_kXULs2c942Dn9iHS5_oWynWuHdvtd4R6gPBfYkUzu09wktgtHKm07wMD7-N_L1DUT7eksMPHggoBHdzi2dxdC0iJtXjypvOctS1Tayqj98e6ErZmJO7wmPinsQfAWzugEOs0qJMSe1Oz7ulGy4eZmmxPqayfwYemRys97jxPP1-P0QwWi3CkSuzm1KnxdAmebdOwuijEwSU-rvUu8wZmAZmW5QVRcShhIpqmmRN5sc1Wde_7U2lw3pkkciXqOebHed__Kk'
);

// State
const loading = ref(false);
const error = ref<string | null>(null);
const products = ref<ProductResponseDto[]>([]);
const categories = ref<CategoryResponseDto[]>([]);
const selectedProducts = ref<number[]>([]);
const selectAll = ref(false);
const showCategoryFilter = ref(false);
const showStockFilter = ref(false);

// Filters
const filters = ref({
  search: '',
  categoryId: undefined as number | undefined,
  stockStatus: undefined as string | undefined,
});

const selectedCategory = ref<CategoryResponseDto | undefined>(undefined);
const stockStatusFilter = ref<string | undefined>(undefined);

const stockStatusOptions = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

// Modal state
const isModalOpen = ref(false);
const selectedProduct = ref<ProductResponseDto | null>(null);

// Delete confirmation dialog
const showDeleteDialog = ref(false);
const productToDelete = ref<ProductResponseDto | null>(null);

// Pagination
const pagination = ref({
  page: 1,
  size: 10,
  totalPages: 0,
  totalElements: 0,
});

// Computed
const visiblePages = computed(() => {
  const total = pagination.value.totalPages;
  const current = pagination.value.page;
  const pages: number[] = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 3) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push(-1); // Ellipsis
      pages.push(total);
    } else if (current >= total - 2) {
      pages.push(1);
      pages.push(-1); // Ellipsis
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push(-1); // Ellipsis
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push(-1); // Ellipsis
      pages.push(total);
    }
  }

  return pages;
});

// Methods
const formatPrice = (priceCents: number, currencyCode: string = 'USD'): string => {
  const price = priceCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);
};

const getStockStatus = (product: ProductResponseDto): string => {
  const quantity = product.quantity ?? 0;
  const safetyStock = product.safetyStock ?? 0;

  if (quantity === 0) return 'Out of Stock';
  if (quantity <= safetyStock) return 'Low Stock';
  return 'In Stock';
};

const getStockStatusText = (product: ProductResponseDto): string => {
  const status = getStockStatus(product);
  const quantity = product.quantity ?? 0;
  if (status === 'In Stock') {
    return `In Stock (${quantity})`;
  }
  return status;
};

const getStockStatusClass = (product: ProductResponseDto): string => {
  const status = getStockStatus(product);
  const classMap: Record<string, string> = {
    'In Stock': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Low Stock': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Out of Stock': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };
  return classMap[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
};

const handleSelectAll = (checked?: boolean) => {
  const isChecked = checked !== undefined ? checked : !selectAll.value;
  if (isChecked) {
    selectedProducts.value = products.value.map((p) => p.id);
  } else {
    selectedProducts.value = [];
  }
};

const handleCategorySelect = (category: CategoryResponseDto | undefined) => {
  selectedCategory.value = category;
  filters.value.categoryId = category?.id;
  showCategoryFilter.value = false;
  pagination.value.page = 1;
  fetchProducts();
};

const handleStockStatusSelect = (status: string) => {
  stockStatusFilter.value = status === 'All' ? undefined : status;
  filters.value.stockStatus = stockStatusFilter.value;
  showStockFilter.value = false;
  pagination.value.page = 1;
  fetchProducts();
};

const handleSearch = () => {
  pagination.value.page = 1;
  fetchProducts();
};

const handlePageChange = (page: number) => {
  pagination.value.page = page;
  fetchProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleAddNew = () => {
  selectedProduct.value = null;
  isModalOpen.value = true;
};

const handleEdit = (product: ProductResponseDto) => {
  selectedProduct.value = product;
  isModalOpen.value = true;
};

const handleModalClose = () => {
  isModalOpen.value = false;
  selectedProduct.value = null;
};

const handleModalSaved = () => {
  fetchProducts();
};

const handleDelete = (product: ProductResponseDto) => {
  productToDelete.value = product;
  showDeleteDialog.value = true;
};

const confirmDelete = async () => {
  if (!productToDelete.value) return;

  try {
    await productApi.delete(productToDelete.value.id);
    toast.success('Product deleted successfully!');
    await fetchProducts();
  } catch (err: any) {
    toast.error(getErrorMessage(err, DEFAULT_ERROR_MESSAGES.PRODUCT_DELETE));
  } finally {
    showDeleteDialog.value = false;
    productToDelete.value = null;
  }
};

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};

const fetchCategories = async () => {
  try {
    const response = await categoryApi.getAll({ page: 1, size: 100 });
    if (response.success) {
      categories.value = response.data.content;
    }
  } catch (err) {
    // Error handled silently - categories filter will just be empty
  }
};

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;

  try {
    const params: PaginationRequest & Record<string, any> = {
      page: pagination.value.page,
      size: pagination.value.size,
      sort: 'createdAt',
      direction: 'DESC',
    };

    // Search by name or SKU
    if (filters.value.search) {
      params.name = filters.value.search;
    }

    // Category filter
    if (filters.value.categoryId) {
      params.categoryId = String(filters.value.categoryId);
    }

    // Stock status filter (would need backend support or frontend filtering)
    // For now, we'll filter on frontend after fetching

    const response = await productApi.getAll(params);

    if (response.success) {
      let filteredProducts = response.data.content;

      // Frontend filtering for stock status (until backend supports it)
      if (filters.value.stockStatus) {
        filteredProducts = filteredProducts.filter((p) => {
          const status = getStockStatus(p);
          return status === filters.value.stockStatus;
        });
      }

      products.value = filteredProducts;
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

// Watch for selectAll changes
watch(
  () => selectedProducts.value.length,
  (newLength) => {
    selectAll.value = newLength === products.value.length && products.value.length > 0;
  }
);

// Close dropdowns when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    showCategoryFilter.value = false;
    showStockFilter.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchCategories();
  fetchProducts();
  document.addEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.active .material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>

