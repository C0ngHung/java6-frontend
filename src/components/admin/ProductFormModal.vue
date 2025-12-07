<template>
  <Dialog :open="isOpen" @update:open="(open) => !open && handleClose()">
    <DialogContent class="!w-[95vw] !max-w-[95vw] sm:!max-w-7xl max-h-[90vh] overflow-y-auto flex flex-col p-0">
      <DialogHeader class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <DialogTitle class="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-tighter">
          {{ isEditMode ? 'Edit Product' : 'Create Product' }}
        </DialogTitle>
        <DialogDescription class="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
          {{ isEditMode ? 'Update product details below.' : 'Add details for the new product below.' }}
        </DialogDescription>
      </DialogHeader>

      <!-- Modal Body -->
      <div class="flex-1 overflow-y-auto p-6">
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <!-- Left Column: Product Information -->
              <div class="lg:col-span-2">
                <div class="flex flex-col gap-8">
                  <!-- Product Information -->
                  <Card class="bg-white dark:bg-slate-800/50">
                    <CardHeader>
                      <CardTitle class="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Product Information</CardTitle>
                    </CardHeader>
                    <CardContent class="p-6 md:p-8 pt-0">
                    <div class="flex flex-col gap-6">
                      <div class="flex flex-col w-full">
                        <Label class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">
                          Product Name *
                        </Label>
                        <Input
                          v-model="form.name"
                          type="text"
                          placeholder="e.g. Premium Leather Wallet"
                          :class="['h-12', errors.name && 'border-red-500']"
                        />
                        <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
                      </div>
                      <div class="flex flex-col w-full">
                        <Label class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">
                          SKU *
                        </Label>
                        <Input
                          v-model="form.sku"
                          type="text"
                          placeholder="e.g. PLW-001"
                          :class="['h-12', errors.sku && 'border-red-500']"
                        />
                        <p v-if="errors.sku" class="text-red-500 text-xs mt-1">{{ errors.sku }}</p>
                      </div>
                      <div class="flex flex-col w-full">
                        <Label class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">
                          Slug *
                        </Label>
                        <Input
                          v-model="form.slug"
                          type="text"
                          placeholder="e.g. premium-leather-wallet"
                          :class="['h-12', errors.slug && 'border-red-500']"
                        />
                        <p v-if="errors.slug" class="text-red-500 text-xs mt-1">{{ errors.slug }}</p>
                      </div>
                      <div class="flex flex-col w-full">
                        <Label class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">
                          Description
                        </Label>
                        <Textarea
                          v-model="form.description"
                          placeholder="Describe the product in detail..."
                          class="min-h-32"
                        />
                      </div>
                    </div>
                    </CardContent>
                  </Card>

                  <!-- Media -->
                  <Card class="bg-white dark:bg-slate-800/50">
                    <CardHeader>
                      <CardTitle class="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Media</CardTitle>
                    </CardHeader>
                    <CardContent class="p-6 md:p-8 pt-0">
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
                    </CardContent>
                  </Card>
                </div>
              </div>

              <!-- Right Column: Organization and Pricing -->
              <div class="lg:col-span-1">
                <div class="flex flex-col gap-8">
                  <!-- Organization -->
                  <Card class="bg-white dark:bg-slate-800/50">
                    <CardHeader>
                      <CardTitle class="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Organization</CardTitle>
                    </CardHeader>
                    <CardContent class="p-6 md:p-8 pt-0">
                    <div class="flex flex-col gap-6">
                      <div class="flex flex-col w-full">
                        <Label class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">
                          Category
                        </Label>
                        <Select v-model="form.categoryId">
                          <SelectTrigger class="h-12 w-full">
                            <SelectValue :placeholder="form.categoryId && form.categoryId !== DEFAULT_CATEGORY_ID ? categories.find(c => c.id === form.categoryId)?.name : 'Select a category'" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem :value="DEFAULT_CATEGORY_ID" disabled>Select a category</SelectItem>
                            <SelectItem v-for="category in categories" :key="category.id" :value="category.id">
                              {{ category.name }}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    </CardContent>
                  </Card>

                  <!-- Pricing & Stock -->
                  <Card class="bg-white dark:bg-slate-800/50">
                    <CardHeader>
                      <CardTitle class="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Pricing & Stock</CardTitle>
                    </CardHeader>
                    <CardContent class="p-6 md:p-8 pt-0">
                    <div class="flex flex-col gap-6">
                      <div class="flex flex-col w-full">
                        <Label class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">
                          Price *
                        </Label>
                        <div class="relative">
                          <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500 z-10" aria-hidden="true">{{ form.currencyCode || DEFAULT_CURRENCY_CODE }}</span>
                          <Input
                            v-model.number="form.priceCents"
                            type="number"
                            min="0"
                            placeholder="0"
                            :class="['h-12 pl-14', errors.priceCents && 'border-red-500']"
                          />
                        </div>
                        <p v-if="errors.priceCents" class="text-red-500 text-xs mt-1">{{ errors.priceCents }}</p>
                      </div>
                      <div class="grid grid-cols-2 gap-4">
                        <div class="flex flex-col w-full">
                          <Label class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">
                            Stock
                          </Label>
                          <Input
                            v-model.number="form.quantity"
                            type="number"
                            min="0"
                            placeholder="100"
                            class="h-12"
                          />
                        </div>
                        <div class="flex flex-col w-full">
                          <Label class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">
                            Safety Stock
                          </Label>
                          <Input
                            v-model.number="form.safetyStock"
                            type="number"
                            min="0"
                            placeholder="10"
                            class="h-12"
                          />
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <Checkbox v-model="form.isActive" />
                        <Label class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal cursor-pointer">
                          Active
                        </Label>
                      </div>
                    </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
      </div>

      <!-- Modal Footer -->
      <DialogFooter class="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <Button
          variant="outline"
          @click="handleClose"
          :disabled="loading"
          class="h-12 px-6 rounded-full"
        >
          Cancel
        </Button>
        <Button
          @click="handleSave"
          :disabled="loading"
          class="h-12 px-6 rounded-full"
        >
          {{ loading ? 'Saving...' : 'Save Product' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { productApi } from '@/services/product';
import { categoryApi } from '@/services/category';
import { useToast } from '@/composables/useToast';
import { getErrorMessage, DEFAULT_ERROR_MESSAGES } from '@/utils/getErrorMessage';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import type { ProductResponseDto, ProductCreateDto, ProductUpdateDto } from '@/types/product';
import type { CategoryResponseDto } from '@/types/category';

interface Props {
  isOpen: boolean;
  product?: ProductResponseDto | null;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  product: null,
});

const emit = defineEmits<{
  close: [];
  saved: [];
}>();

// Refs
const fileInputRef = ref<HTMLInputElement | null>(null);
const loading = ref(false);
const categories = ref<CategoryResponseDto[]>([]);
const toast = useToast();

const DEFAULT_CATEGORY_ID = 0;
const DEFAULT_CURRENCY_CODE = 'VND';

const form = ref<Partial<ProductCreateDto> & { categoryId?: number }>({
  sku: '',
  slug: '',
  name: '',
  description: '',
  imageUrl: '',
  priceCents: 0,
  currencyCode: DEFAULT_CURRENCY_CODE,
  categoryId: DEFAULT_CATEGORY_ID,
  isActive: true,
  quantity: 0,
  safetyStock: 0,
});

const errors = ref<Record<string, string>>({});

// Computed
const isEditMode = computed(() => !!props.product);

// Methods
const resetForm = () => {
  form.value = {
    sku: '',
    slug: '',
    name: '',
    description: '',
    imageUrl: '',
    priceCents: 0,
    currencyCode: DEFAULT_CURRENCY_CODE,
    categoryId: DEFAULT_CATEGORY_ID,
    isActive: true,
    quantity: 0,
    safetyStock: 0,
  };
};

// Watch for product changes
watch(
  () => props.product,
  (product) => {
    if (product) {
      form.value = {
        sku: product.sku,
        slug: product.slug,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        priceCents: product.priceCents,
        currencyCode: product.currencyCode,
        categoryId: product.categoryId ?? DEFAULT_CATEGORY_ID,
        isActive: product.isActive,
        quantity: product.quantity ?? 0,
        safetyStock: product.safetyStock ?? 0,
      };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

// Watch for modal open/close
watch(
  () => props.isOpen,
  (isOpen) => {
    if (!isOpen) {
      resetForm();
      errors.value = {};
    } else if (!props.product) {
      resetForm();
    }
  }
);

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
    if (isEditMode.value && props.product) {
      const updateData: ProductUpdateDto = {
        ...form.value,
        categoryId: form.value.categoryId === DEFAULT_CATEGORY_ID ? undefined : form.value.categoryId,
      };
      await productApi.update(props.product.id, updateData);
    } else {
      const createData: ProductCreateDto = {
        sku: form.value.sku!,
        slug: form.value.slug!,
        name: form.value.name!,
        description: form.value.description,
        imageUrl: form.value.imageUrl,
        priceCents: form.value.priceCents!,
            currencyCode: form.value.currencyCode || DEFAULT_CURRENCY_CODE,
        categoryId: form.value.categoryId === 0 ? undefined : form.value.categoryId,
        isActive: form.value.isActive ?? true,
        quantity: form.value.quantity ?? 0,
        safetyStock: form.value.safetyStock ?? 0,
      };
      await productApi.create(createData);
    }
    emit('saved');
    toast.success(isEditMode.value ? 'Product updated successfully!' : 'Product created successfully!');
    handleClose();
  } catch (error: any) {
    toast.error(getErrorMessage(error, DEFAULT_ERROR_MESSAGES.PRODUCT_SAVE));
  } finally {
    loading.value = false;
  }
};

const handleClose = () => {
  emit('close');
};

// Fetch categories on mount
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

// Initialize
fetchCategories();
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

</style>

