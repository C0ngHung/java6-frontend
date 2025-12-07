<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>{{ isEditMode ? 'Edit Category' : 'Create Category' }}</DialogTitle>
        <DialogDescription>
          {{ isEditMode ? 'Update category details below.' : 'Add details for the new category below.' }}
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent class="space-y-4">
        <div class="flex flex-col gap-2">
          <Label for="category-name">
            Category Name <span class="text-red-500" aria-label="required">*</span>
          </Label>
          <Input
            id="category-name"
            v-model="form.name"
            type="text"
            placeholder="e.g. Electronics"
            :class="errors.name && 'border-red-500'"
            :aria-invalid="!!errors.name"
            :aria-describedby="errors.name ? 'category-name-error' : undefined"
            required
          />
          <p v-if="errors.name" id="category-name-error" class="text-red-500 text-xs" role="alert">
            {{ errors.name }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <Label for="category-slug">
            Slug <span class="text-red-500" aria-label="required">*</span>
          </Label>
          <Input
            id="category-slug"
            v-model="form.slug"
            type="text"
            placeholder="e.g. electronics"
            :class="errors.slug && 'border-red-500'"
            :aria-invalid="!!errors.slug"
            :aria-describedby="errors.slug ? 'category-slug-error' : 'category-slug-hint'"
            required
          />
          <p v-if="errors.slug" id="category-slug-error" class="text-red-500 text-xs" role="alert">
            {{ errors.slug }}
          </p>
          <p id="category-slug-hint" class="text-xs text-gray-500 dark:text-gray-400">
            URL-friendly version of the name (lowercase, hyphens instead of spaces)
          </p>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="handleClose" :disabled="saving">
            Cancel
          </Button>
          <Button type="button" @click="handleSubmit" :disabled="saving">
            {{ saving ? 'Saving...' : isEditMode ? 'Update Category' : 'Create Category' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { categoryApi } from '@/services/category';
import { useToast } from '@/composables/useToast';
import { getErrorMessageWithFallback, DEFAULT_ERROR_MESSAGES } from '@/utils/getErrorMessage';
import type { CategoryResponseDto, CategoryCreateDto, CategoryUpdateDto } from '@/types/category';

interface Props {
  isOpen: boolean;
  category: CategoryResponseDto | null;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  close: [];
  saved: [];
}>();

const toast = useToast();
const saving = ref(false);
const errors = ref<Record<string, string>>({});

const isEditMode = computed(() => !!props.category);

const form = ref<CategoryCreateDto>({
  name: '',
  slug: '',
});

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_NAME_LENGTH = 100;
const MAX_SLUG_LENGTH = 100;

const validateForm = (): boolean => {
  errors.value = {};

  if (!form.value.name || form.value.name.trim().length === 0) {
    errors.value.name = 'Category name is required';
  } else if (form.value.name.length > MAX_NAME_LENGTH) {
    errors.value.name = `Category name must be less than ${MAX_NAME_LENGTH} characters`;
  }

  if (!form.value.slug || form.value.slug.trim().length === 0) {
    errors.value.slug = 'Slug is required';
  } else if (!SLUG_PATTERN.test(form.value.slug)) {
    errors.value.slug = 'Slug must be lowercase letters, numbers, and hyphens only';
  } else if (form.value.slug.length > MAX_SLUG_LENGTH) {
    errors.value.slug = `Slug must be less than ${MAX_SLUG_LENGTH} characters`;
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  saving.value = true;
  errors.value = {};

  try {
    if (isEditMode.value && props.category) {
      const updateData: CategoryUpdateDto = {
        name: form.value.name.trim(),
        slug: form.value.slug.trim(),
      };
      await categoryApi.update(props.category.id, updateData);
      toast.success('Category updated successfully!');
    } else {
      const createData: CategoryCreateDto = {
        name: form.value.name.trim(),
        slug: form.value.slug.trim(),
      };
      await categoryApi.create(createData);
      toast.success('Category created successfully!');
    }

    emits('saved');
    handleClose();
  } catch (err: any) {
    const errorMessage = getErrorMessageWithFallback(
      err,
      DEFAULT_ERROR_MESSAGES.CATEGORY_SAVE,
      true // Use backend message as fallback to handle code conflicts
    );
    toast.error(errorMessage);

    // Handle validation errors from backend
    if (err.response?.data?.error?.details) {
      const details = err.response.data.error.details;
      if (Array.isArray(details)) {
        details.forEach((detail: any) => {
          if (detail.field) {
            errors.value[detail.field] = detail.message || detail.error;
          }
        });
      }
    }
  } finally {
    saving.value = false;
  }
};

const resetForm = () => {
  form.value = {
    name: '',
    slug: '',
  };
  errors.value = {};
};

const populateForm = (category: CategoryResponseDto) => {
  form.value = {
    name: category.name,
    slug: category.slug,
  };
};

const handleClose = () => {
  resetForm();
  emits('close');
};

const handleOpenChange = (open: boolean) => {
  if (!open) {
    handleClose();
  }
};

watch(
  () => props.category,
  (newCategory) => {
    if (newCategory) {
      populateForm(newCategory);
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen && props.category) {
      populateForm(props.category);
    } else if (!isOpen) {
      resetForm();
    }
  }
);
</script>

