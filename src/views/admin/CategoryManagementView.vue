<template>
  <div class="relative flex min-h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
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
                to="/admin/orders"
                class="flex items-center gap-3 rounded-lg px-3 py-2 text-text-light/80 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5"
              >
                <span class="material-symbols-outlined text-xl">shopping_cart</span>
                <p class="text-sm font-medium">Orders</p>
              </RouterLink>
              <RouterLink
                to="/admin/products"
                class="flex items-center gap-3 rounded-lg px-3 py-2 text-text-light/80 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5"
              >
                <span class="material-symbols-outlined text-xl">inventory_2</span>
                <p class="text-sm font-medium">Products</p>
              </RouterLink>
              <RouterLink
                to="/admin/categories"
                class="active flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary dark:bg-primary/20 dark:text-white"
              >
                <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1">category</span>
                <p class="text-sm font-medium">Categories</p>
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
        <div class="p-8">
          <!-- Page Heading -->
          <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div class="flex flex-col gap-1">
              <p class="text-gray-900 dark:text-white text-3xl font-bold leading-tight">Category Management</p>
              <p class="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Manage, add, and edit all product categories.</p>
            </div>
            <Button
              @click="handleAddNew"
              class="rounded-full h-11 px-5"
            >
              <span class="material-symbols-outlined">add_circle</span>
              <span class="truncate">Add New Category</span>
            </Button>
          </div>

          <!-- Search Bar -->
          <div class="flex flex-col md:flex-row gap-4 mb-6">
            <div class="flex-grow">
              <label class="flex flex-col min-w-40 h-12 w-full">
                <div class="flex w-full flex-1 items-stretch rounded-lg h-full border bg-background shadow-xs dark:bg-input/30 dark:border-input">
                  <div class="text-gray-500 dark:text-gray-400 flex items-center justify-center pl-4 rounded-l-lg border-r border-gray-200 dark:border-input">
                    <span class="material-symbols-outlined">search</span>
                  </div>
                  <Input
                    v-model="filters.search"
                    type="text"
                    placeholder="Search by category name or slug..."
                    class="rounded-r-lg rounded-l-none border-0 bg-transparent h-full focus-visible:ring-0 focus-visible:ring-offset-0"
                    @input="handleSearch"
                  />
                </div>
              </label>
            </div>
          </div>

          <!-- Categories Table -->
          <div class="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
            <!-- Loading State -->
            <div v-if="loading" class="p-8 text-center">
              <p class="text-gray-500 dark:text-gray-400">Loading categories...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="p-8 text-center">
              <p class="text-red-500">{{ error }}</p>
              <Button
                @click="fetchCategories"
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
                    <TableHead class="px-6 py-3">ID</TableHead>
                    <TableHead class="px-6 py-3">Name</TableHead>
                    <TableHead class="px-6 py-3">Slug</TableHead>
                    <TableHead class="px-6 py-3 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    v-for="category in categories"
                    :key="category.id"
                    class="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <TableCell class="w-4 p-4">
                      <Checkbox
                        :model-value="selectedCategories.includes(category.id)"
                        @update:model-value="(value: boolean | 'indeterminate') => {
                          const checked = value === true;
                          if (checked) {
                            selectedCategories.push(category.id);
                          } else {
                            selectedCategories = selectedCategories.filter(id => id !== category.id);
                          }
                        }"
                      />
                    </TableCell>
                    <TableCell class="px-6 py-4 whitespace-nowrap">{{ category.id }}</TableCell>
                    <TableCell class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {{ category.name }}
                    </TableCell>
                    <TableCell class="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {{ category.slug }}
                    </TableCell>
                    <TableCell class="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        @click="handleEdit(category)"
                        class="p-2"
                      >
                        <span class="material-symbols-outlined text-base">edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        @click="handleDelete(category)"
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
            <div v-if="!loading && !error && categories.length === 0" class="p-8 text-center">
              <p class="text-gray-500 dark:text-gray-400 text-lg">No categories found</p>
            </div>

            <!-- Pagination -->
            <nav v-if="!loading && !error && categories.length > 0" aria-label="Table navigation" class="flex items-center justify-between p-4">
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
                    page === pagination.page && 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20',
                    page === -1 && 'pointer-events-none'
                  ]"
                  :disabled="page === -1"
                  @click="page !== -1 && handlePageChange(page)"
                >
                  {{ page === -1 ? '...' : page }}
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

    <!-- Category Form Modal -->
    <CategoryFormModal
      :is-open="isModalOpen"
      :category="selectedCategory"
      @close="handleModalClose"
      @saved="handleModalSaved"
    />

    <!-- Delete Confirmation Dialog -->
    <AlertDialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Category</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete category "{{ categoryToDelete?.name }}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            @click="confirmDelete"
            class="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { categoryApi } from '@/services/category';
import CategoryFormModal from '@/components/admin/CategoryFormModal.vue';
import { useToast } from '@/composables/useToast';
import { getErrorMessageWithFallback, DEFAULT_ERROR_MESSAGES } from '@/utils/getErrorMessage';
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
import type { CategoryResponseDto } from '@/types/category';
import type { PaginationRequest } from '@/types/api';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

// State
const loading = ref(false);
const error = ref<string | null>(null);
const categories = ref<CategoryResponseDto[]>([]);
const selectedCategories = ref<number[]>([]);
const selectAll = ref(false);

// Filters
const filters = ref({
  search: '',
});

// Modal state
const isModalOpen = ref(false);
const selectedCategory = ref<CategoryResponseDto | null>(null);

// Delete confirmation dialog
const showDeleteDialog = ref(false);
const categoryToDelete = ref<CategoryResponseDto | null>(null);

// Pagination - Start with page 1 (1-based for frontend)
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
const handleSelectAll = (checked?: boolean) => {
  const isChecked = checked !== undefined ? checked : !selectAll.value;
  if (isChecked) {
    selectedCategories.value = categories.value.map((c) => c.id);
  } else {
    selectedCategories.value = [];
  }
};

const handleSearch = () => {
  pagination.value.page = 1;
  fetchCategories();
};

const handlePageChange = (page: number) => {
  pagination.value.page = page;
  fetchCategories();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleAddNew = () => {
  selectedCategory.value = null;
  isModalOpen.value = true;
};

const handleEdit = (category: CategoryResponseDto) => {
  selectedCategory.value = category;
  isModalOpen.value = true;
};

const handleModalClose = () => {
  isModalOpen.value = false;
  selectedCategory.value = null;
};

const handleModalSaved = () => {
  fetchCategories();
};

const handleDelete = (category: CategoryResponseDto) => {
  categoryToDelete.value = category;
  showDeleteDialog.value = true;
};

const confirmDelete = async () => {
  if (!categoryToDelete.value) return;

  try {
    await categoryApi.delete(categoryToDelete.value.id);
    toast.success('Category deleted successfully!');
    await fetchCategories();
  } catch (err: unknown) {
    toast.error(
      getErrorMessageWithFallback(
        err,
        DEFAULT_ERROR_MESSAGES.CATEGORY_DELETE,
        true // Use backend message as fallback to handle code conflicts
      )
    );
  } finally {
    showDeleteDialog.value = false;
    categoryToDelete.value = null;
  }
};

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};

const fetchCategories = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Backend expects 1-based page (PaginationRequest has @Min(1))
    const params: PaginationRequest & { name?: string } = {
      page: pagination.value.page,
      size: pagination.value.size,
      sort: 'createdAt',
      direction: 'DESC',
    };

    // Search by name or slug
    if (filters.value.search) {
      params.search = filters.value.search;
    }

    const response = await categoryApi.getAll(params);

    if (response.success) {
      categories.value = response.data.content;
      // Backend returns 1-based page
      pagination.value = {
        page: response.data.page || 1,
        size: response.data.size || pagination.value.size,
        totalPages: response.data.totalPages || 1,
        totalElements: response.data.totalElements || 0,
      };
    } else {
      error.value = 'Failed to load categories';
    }
  } catch (err: unknown) {
    const axiosError = err as { response?: { data?: { message?: string } } };
    error.value = axiosError.response?.data?.message || 'Failed to load categories. Please try again.';
  } finally {
    loading.value = false;
  }
};

// Watch for selectAll changes
watch(
  () => selectedCategories.value.length,
  (newLength) => {
    selectAll.value = newLength === categories.value.length && categories.value.length > 0;
  }
);

// Lifecycle
onMounted(() => {
  fetchCategories();
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

