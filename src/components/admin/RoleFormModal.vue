<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>{{ isEditMode ? 'Edit Role' : 'Create Role' }}</DialogTitle>
        <DialogDescription>
          {{ isEditMode ? 'Update role details below.' : 'Add details for the new role below.' }}
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent class="space-y-4">
        <div class="flex flex-col gap-2">
          <Label for="role-code">
            Role Code <span class="text-red-500" aria-label="required">*</span>
          </Label>
          <Input
            id="role-code"
            v-model="form.code"
            type="text"
            placeholder="e.g. ADMIN"
            :class="errors.code && 'border-red-500'"
            :aria-invalid="!!errors.code"
            :aria-describedby="errors.code ? 'role-code-error' : undefined"
            required
          />
          <p v-if="errors.code" id="role-code-error" class="text-red-500 text-xs" role="alert">
            {{ errors.code }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Unique identifier for the role (uppercase, no spaces)
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <Label for="role-name">
            Role Name <span class="text-red-500" aria-label="required">*</span>
          </Label>
          <Input
            id="role-name"
            v-model="form.name"
            type="text"
            placeholder="e.g. Administrator"
            :class="errors.name && 'border-red-500'"
            :aria-invalid="!!errors.name"
            :aria-describedby="errors.name ? 'role-name-error' : undefined"
            required
          />
          <p v-if="errors.name" id="role-name-error" class="text-red-500 text-xs" role="alert">
            {{ errors.name }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <Label for="role-description">Description</Label>
          <Textarea
            id="role-description"
            v-model="form.description"
            rows="3"
            placeholder="Enter role description..."
            :class="errors.description && 'border-red-500'"
            :aria-invalid="!!errors.description"
            :aria-describedby="errors.description ? 'role-description-error' : undefined"
          />
          <p v-if="errors.description" id="role-description-error" class="text-red-500 text-xs" role="alert">
            {{ errors.description }}
          </p>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="handleClose" :disabled="saving">
            Cancel
          </Button>
          <Button type="button" @click="handleSubmit" :disabled="saving">
            {{ saving ? 'Saving...' : isEditMode ? 'Update Role' : 'Create Role' }}
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
import { Textarea } from '@/components/ui/textarea';
import { roleApi } from '@/services/role';
import { useToast } from '@/composables/useToast';
import { getErrorMessageWithFallback, DEFAULT_ERROR_MESSAGES } from '@/utils/getErrorMessage';
import type { RoleResponseDto, RoleRequestDto } from '@/types/role';

interface Props {
  isOpen: boolean;
  role: RoleResponseDto | null;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  close: [];
  saved: [];
}>();

const toast = useToast();
const saving = ref(false);
const errors = ref<Record<string, string>>({});

const isEditMode = computed(() => !!props.role);

const form = ref<RoleRequestDto>({
  code: '',
  name: '',
  description: '',
});

const MAX_CODE_LENGTH = 50;
const MAX_NAME_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 1000;

const validateForm = (): boolean => {
  errors.value = {};

  if (!form.value.code || form.value.code.trim().length === 0) {
    errors.value.code = 'Role code is required';
  } else if (form.value.code.length > MAX_CODE_LENGTH) {
    errors.value.code = `Role code must be less than ${MAX_CODE_LENGTH} characters`;
  }

  if (!form.value.name || form.value.name.trim().length === 0) {
    errors.value.name = 'Role name is required';
  } else if (form.value.name.length > MAX_NAME_LENGTH) {
    errors.value.name = `Role name must be less than ${MAX_NAME_LENGTH} characters`;
  }

  if (form.value.description && form.value.description.length > MAX_DESCRIPTION_LENGTH) {
    errors.value.description = `Description must be less than ${MAX_DESCRIPTION_LENGTH} characters`;
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
    const data: RoleRequestDto = {
      code: form.value.code.trim(),
      name: form.value.name.trim(),
      description: form.value.description?.trim() || undefined,
    };

    if (isEditMode.value && props.role) {
      await roleApi.update(props.role.id, data);
      toast.success('Role updated successfully!');
    } else {
      await roleApi.create(data);
      toast.success('Role created successfully!');
    }

    emits('saved');
    handleClose();
  } catch (err: any) {
    const errorMessage = getErrorMessageWithFallback(
      err,
      DEFAULT_ERROR_MESSAGES.GENERIC,
      true
    );
    toast.error(errorMessage);

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
    code: '',
    name: '',
    description: '',
  };
  errors.value = {};
};

const populateForm = (role: RoleResponseDto) => {
  form.value = {
    code: role.code,
    name: role.name,
    description: role.description || '',
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
  () => props.role,
  (newRole) => {
    if (newRole) {
      populateForm(newRole);
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen && props.role) {
      populateForm(props.role);
    } else if (!isOpen) {
      resetForm();
    }
  }
);
</script>

