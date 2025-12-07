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
      <main class="flex-1 overflow-y-auto">
        <div class="flex flex-1 justify-center p-4 sm:p-6 lg:p-8">
          <div class="flex flex-col w-full max-w-7xl flex-1">
            <!-- Page Heading -->
            <div class="flex flex-wrap items-center justify-between gap-4 py-4">
              <div class="flex flex-col gap-1">
                <p class="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tighter">
                  {{ isEditMode ? 'Edit Product' : 'Create Product' }}
                </p>
                <p class="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                  {{ isEditMode ? 'Update product details below.' : 'Add details for the new product below.' }}
                </p>
              </div>
              <div class="flex items-center gap-3">
                <button
                  @click="handleCancel"
                  class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors hover:bg-slate-300 dark:hover:bg-slate-600"
                >
                  <span class="truncate">Cancel</span>
                </button>
                <button
                  @click="handleSave"
                  :disabled="loading"
                  class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="truncate">{{ loading ? 'Saving...' : 'Save Product' }}</span>
                </button>
              </div>
            </div>

            <!-- Main Form Content -->
            <div class="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <!-- Left Column: Product Information -->
              <div class="lg:col-span-2">
                <div class="flex flex-col gap-8">
                  <!-- Product Information -->
                  <div class="bg-white dark:bg-slate-800/50 p-6 md:p-8 rounded-lg shadow-sm">
                    <h2 class="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-6">Product Information</h2>
                    <div class="flex flex-col gap-6">
                      <label class="flex flex-col w-full">
                        <p class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Product Name *</p>
                        <input
                          v-model="form.name"
                          type="text"
                          class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 text-base font-normal leading-normal"
                          placeholder="e.g. Premium Leather Wallet"
                        />
                        <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
                      </label>
                      <label class="flex flex-col w-full">
                        <p class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">SKU *</p>
                        <input
                          v-model="form.sku"
                          type="text"
                          class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 text-base font-normal leading-normal"
                          placeholder="e.g. PLW-001"
                        />
                        <p v-if="errors.sku" class="text-red-500 text-xs mt-1">{{ errors.sku }}</p>
                      </label>
                      <label class="flex flex-col w-full">
                        <p class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Slug *</p>
                        <input
                          v-model="form.slug"
                          type="text"
                          class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 text-base font-normal leading-normal"
                          placeholder="e.g. premium-leather-wallet"
                        />
                        <p v-if="errors.slug" class="text-red-500 text-xs mt-1">{{ errors.slug }}</p>
                      </label>
                      <label class="flex flex-col w-full">
                        <p class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Description</p>
                        <textarea
                          v-model="form.description"
                          class="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 min-h-40 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-base font-normal leading-normal"
                          placeholder="Describe the product in detail..."
                        ></textarea>
                      </label>
                    </div>
                  </div>

                  <!-- Media -->
                  <div class="bg-white dark:bg-slate-800/50 p-6 md:p-8 rounded-lg shadow-sm">
                    <h2 class="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-6">Media</h2>
                    <div class="flex flex-col gap-6">
                      <!-- Image Upload Area -->
                      <div
                        @click="triggerFileInput"
                        @drop.prevent="handleDrop"
                        @dragover.prevent
                        class="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 p-8 text-center transition-colors hover:border-primary/80 dark:hover:border-primary/60 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                      >
                        <span class="material-symbols-outlined text-4xl text-slate-400 dark:text-slate-500">upload_file</span>
                        <p class="mt-2 font-semibold text-slate-700 dark:text-slate-300">Drag & drop images here</p>
                        <p class="text-sm text-slate-500 dark:text-slate-400">or click to browse</p>
                        <input
                          ref="fileInputRef"
                          type="file"
                          accept="image/*"
                          class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          @change="handleFileSelect"
                        />
                      </div>

                      <!-- Uploaded Images -->
                      <div v-if="form.imageUrl" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <div class="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                          <img
                            :alt="form.name || 'Product image'"
                            :src="form.imageUrl"
                            class="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <button
                            @click="removeImage"
                            class="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-red-500"
                            type="button"
                          >
                            <span class="material-symbols-outlined text-sm">close</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column: Organization and Pricing -->
              <div class="lg:col-span-1">
                <div class="flex flex-col gap-8">
                  <!-- Organization -->
                  <div class="bg-white dark:bg-slate-800/50 p-6 md:p-8 rounded-lg shadow-sm">
                    <h2 class="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-6">Organization</h2>
                    <div class="flex flex-col gap-6">
                      <label class="flex flex-col w-full">
                        <p class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Category</p>
                        <div class="relative">
                          <select
                            v-model="form.categoryId"
                            class="form-select flex w-full appearance-none min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 text-base font-normal leading-normal"
                          >
                            <option :value="undefined">Select a category</option>
                            <option v-for="category in categories" :key="category.id" :value="category.id">
                              {{ category.name }}
                            </option>
                          </select>
                          <span class="material-symbols-outlined pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 dark:text-slate-500">expand_more</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <!-- Pricing & Stock -->
                  <div class="bg-white dark:bg-slate-800/50 p-6 md:p-8 rounded-lg shadow-sm">
                    <h2 class="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-6">Pricing & Stock</h2>
                    <div class="flex flex-col gap-6">
                      <label class="flex flex-col w-full">
                        <p class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Price *</p>
                        <div class="relative">
                          <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">{{ form.currencyCode || 'USD' }}</span>
                          <input
                            v-model.number="priceInput"
                            type="number"
                            step="0.01"
                            min="0"
                            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 pl-14 pr-4 text-base font-normal leading-normal"
                            placeholder="0.00"
                            @input="updatePriceCents"
                          />
                        </div>
                        <p v-if="errors.priceCents" class="text-red-500 text-xs mt-1">{{ errors.priceCents }}</p>
                      </label>
                      <div class="grid grid-cols-2 gap-4">
                        <label class="flex flex-col w-full">
                          <p class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Stock</p>
                          <input
                            v-model.number="form.quantity"
                            type="number"
                            min="0"
                            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 text-base font-normal leading-normal"
                            placeholder="100"
                          />
                        </label>
                        <label class="flex flex-col w-full">
                          <p class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Safety Stock</p>
                          <input
                            v-model.number="form.safetyStock"
                            type="number"
                            min="0"
                            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 text-base font-normal leading-normal"
                            placeholder="10"
                          />
                        </label>
                      </div>
                      <label class="flex items-center gap-2">
                        <input
                          v-model="form.isActive"
                          type="checkbox"
                          class="form-checkbox rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-primary focus:ring-primary/50"
                        />
                        <p class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal">Active</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { productApi } from '@/services/product';
import { categoryApi } from '@/services/category';
import { useToast } from '@/composables/useToast';
import { getErrorMessage, DEFAULT_ERROR_MESSAGES } from '@/utils/getErrorMessage';
import type { ProductResponseDto, ProductCreateDto, ProductUpdateDto } from '@/types/product';
import type { CategoryResponseDto } from '@/types/category';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const toast = useToast();

// Refs
const fileInputRef = ref<HTMLInputElement | null>(null);
const loading = ref(false);
const categories = ref<CategoryResponseDto[]>([]);
const priceInput = ref<number | string>('');

// Form state
const form = ref<Partial<ProductCreateDto>>({
  sku: '',
  slug: '',
  name: '',
  description: '',
  imageUrl: '',
  priceCents: 0,
  currencyCode: 'USD',
  categoryId: undefined,
  isActive: true,
  quantity: 0,
  safetyStock: 0,
});

const errors = ref<Record<string, string>>({});

// Computed
const isEditMode = computed(() => !!route.params.id);
const productId = computed(() => (route.params.id ? Number(route.params.id) : null));

// Methods
const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    await uploadImage(file);
  }
};

const handleDrop = async (event: DragEvent) => {
  const file = event.dataTransfer?.files[0];
  if (file && file.type.startsWith('image/')) {
    await uploadImage(file);
  }
};

const uploadImage = async (file: File) => {
  loading.value = true;
  try {
    // Create a local URL preview (image upload service will be implemented when backend is ready)
    const reader = new FileReader();
    reader.onload = (e) => {
      form.value.imageUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } catch (error) {
    toast.error(getErrorMessage(error, DEFAULT_ERROR_MESSAGES.PRODUCT_UPLOAD));
  } finally {
    loading.value = false;
  }
};

const removeImage = () => {
  form.value.imageUrl = '';
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
};

const updatePriceCents = () => {
  const price = typeof priceInput.value === 'string' ? parseFloat(priceInput.value) : priceInput.value;
  if (!isNaN(price) && price >= 0) {
    form.value.priceCents = Math.round(price * 100);
  }
};

const validateForm = (): boolean => {
  errors.value = {};

  if (!form.value.name?.trim()) {
    errors.value.name = 'Product name is required';
  }

  if (!form.value.sku?.trim()) {
    errors.value.sku = 'SKU is required';
  }

  if (!form.value.slug?.trim()) {
    errors.value.slug = 'Slug is required';
  }

  if (!form.value.priceCents || form.value.priceCents <= 0) {
    errors.value.priceCents = 'Price must be greater than 0';
  }

  return Object.keys(errors.value).length === 0;
};

const handleSave = async () => {
  if (!validateForm()) {
    return;
  }

  loading.value = true;
  try {
    if (isEditMode.value && productId.value) {
      const updateData: ProductUpdateDto = {
        ...form.value,
      };
      await productApi.update(productId.value, updateData);
    } else {
      const createData: ProductCreateDto = {
        sku: form.value.sku!,
        slug: form.value.slug!,
        name: form.value.name!,
        description: form.value.description,
        imageUrl: form.value.imageUrl,
        priceCents: form.value.priceCents!,
        currencyCode: form.value.currencyCode || 'USD',
        categoryId: form.value.categoryId,
        isActive: form.value.isActive ?? true,
        quantity: form.value.quantity ?? 0,
        safetyStock: form.value.safetyStock ?? 0,
      };
      await productApi.create(createData);
    }
    router.push('/admin/products');
  } catch (error: unknown) {
    toast.error(getErrorMessage(error, DEFAULT_ERROR_MESSAGES.PRODUCT_SAVE));
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  router.push('/admin/products');
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
  } catch (error) {
    // Error handled silently - category dropdown will just be empty
  }
};

const fetchProduct = async () => {
  if (!isEditMode.value || !productId.value) {
    return;
  }

  loading.value = true;
  try {
    const response = await productApi.getById(productId.value);
    if (response.success) {
      const product = response.data;
      form.value = {
        sku: product.sku,
        slug: product.slug,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        priceCents: product.priceCents,
        currencyCode: product.currencyCode,
        categoryId: product.categoryId,
        isActive: product.isActive,
        quantity: product.quantity ?? 0,
        safetyStock: product.safetyStock ?? 0,
      };
      priceInput.value = (product.priceCents / 100).toFixed(2);
    }
  } catch (error: unknown) {
    toast.error(getErrorMessage(error, DEFAULT_ERROR_MESSAGES.PRODUCT_LOAD));
    router.push('/admin/products');
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(async () => {
  await fetchCategories();
  if (isEditMode.value) {
    await fetchProduct();
  }
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

