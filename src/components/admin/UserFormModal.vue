<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>{{ isEditMode ? 'Edit User' : 'Create User' }}</DialogTitle>
        <DialogDescription>
          {{ isEditMode ? 'Update user details below.' : 'Add details for the new user below.' }}
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent class="space-y-4">
        <div class="flex flex-col gap-2">
          <Label for="user-username">
            Username <span class="text-red-500" aria-label="required">*</span>
          </Label>
          <Input
            id="user-username"
            v-model="form.username"
            type="text"
            placeholder="e.g. johndoe"
            :class="errors.username && 'border-red-500'"
            :aria-invalid="!!errors.username"
            :aria-describedby="errors.username ? 'user-username-error' : undefined"
            :disabled="isEditMode"
            required
          />
          <p v-if="errors.username" id="user-username-error" class="text-red-500 text-xs" role="alert">
            {{ errors.username }}
          </p>
        </div>

        <div v-if="!isEditMode" class="flex flex-col gap-2">
          <Label for="user-password">
            Password <span class="text-red-500" aria-label="required">*</span>
          </Label>
          <Input
            id="user-password"
            v-model="form.password"
            type="password"
            placeholder="Enter password (min 6 characters)"
            :class="errors.password && 'border-red-500'"
            :aria-invalid="!!errors.password"
            :aria-describedby="errors.password ? 'user-password-error' : undefined"
            required
          />
          <p v-if="errors.password" id="user-password-error" class="text-red-500 text-xs" role="alert">
            {{ errors.password }}
          </p>
        </div>

        <div v-if="isEditMode" class="flex flex-col gap-2">
          <Label for="user-password-new">
            New Password (leave empty to keep current)
          </Label>
          <Input
            id="user-password-new"
            v-model="form.password"
            type="password"
            placeholder="Enter new password (min 6 characters)"
            :class="errors.password && 'border-red-500'"
            :aria-invalid="!!errors.password"
            :aria-describedby="errors.password ? 'user-password-new-error' : undefined"
          />
          <p v-if="errors.password" id="user-password-new-error" class="text-red-500 text-xs" role="alert">
            {{ errors.password }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <Label for="user-email">
            Email <span class="text-red-500" aria-label="required">*</span>
          </Label>
          <Input
            id="user-email"
            v-model="form.email"
            type="email"
            placeholder="e.g. john@example.com"
            :class="errors.email && 'border-red-500'"
            :aria-invalid="!!errors.email"
            :aria-describedby="errors.email ? 'user-email-error' : undefined"
            required
          />
          <p v-if="errors.email" id="user-email-error" class="text-red-500 text-xs" role="alert">
            {{ errors.email }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <Label for="user-full-name">
            Full Name <span class="text-red-500" aria-label="required">*</span>
          </Label>
          <Input
            id="user-full-name"
            v-model="form.fullName"
            type="text"
            placeholder="e.g. John Doe"
            :class="errors.fullName && 'border-red-500'"
            :aria-invalid="!!errors.fullName"
            :aria-describedby="errors.fullName ? 'user-full-name-error' : undefined"
            required
          />
          <p v-if="errors.fullName" id="user-full-name-error" class="text-red-500 text-xs" role="alert">
            {{ errors.fullName }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <Label for="user-phone">Phone</Label>
          <Input
            id="user-phone"
            v-model="form.phone"
            type="tel"
            placeholder="e.g. +1234567890"
            :class="errors.phone && 'border-red-500'"
            :aria-invalid="!!errors.phone"
            :aria-describedby="errors.phone ? 'user-phone-error' : undefined"
          />
          <p v-if="errors.phone" id="user-phone-error" class="text-red-500 text-xs" role="alert">
            {{ errors.phone }}
          </p>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="handleClose" :disabled="saving">
            Cancel
          </Button>
          <Button type="button" @click="handleSubmit" :disabled="saving">
            {{ saving ? 'Saving...' : isEditMode ? 'Update User' : 'Create User' }}
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
import { userApi } from '@/services/user';
import { useToast } from '@/composables/useToast';
import { getErrorMessageWithFallback, DEFAULT_ERROR_MESSAGES } from '@/utils/getErrorMessage';
import type { UserResponseDto, UserCreateDto, UserUpdateDto } from '@/types/user';

interface Props {
  isOpen: boolean;
  user: UserResponseDto | null;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  close: [];
  saved: [];
}>();

const toast = useToast();
const saving = ref(false);
const errors = ref<Record<string, string>>({});

const isEditMode = computed(() => !!props.user);

const form = ref<UserCreateDto & { password?: string }>({
  username: '',
  password: '',
  email: '',
  fullName: '',
  phone: '',
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const MAX_USERNAME_LENGTH = 50;
const MAX_PASSWORD_LENGTH = 255;
const MAX_EMAIL_LENGTH = 255;
const MAX_FULL_NAME_LENGTH = 100;
const MAX_PHONE_LENGTH = 15;

const validateForm = (): boolean => {
  errors.value = {};

  if (!isEditMode.value) {
    if (!form.value.username || form.value.username.trim().length === 0) {
      errors.value.username = 'Username is required';
    } else if (form.value.username.length > MAX_USERNAME_LENGTH) {
      errors.value.username = `Username must be less than ${MAX_USERNAME_LENGTH} characters`;
    }

    if (!form.value.password || form.value.password.length < MIN_PASSWORD_LENGTH) {
      errors.value.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    } else if (form.value.password.length > MAX_PASSWORD_LENGTH) {
      errors.value.password = `Password must be less than ${MAX_PASSWORD_LENGTH} characters`;
    }
  } else if (form.value.password && form.value.password.length > 0) {
    if (form.value.password.length < MIN_PASSWORD_LENGTH) {
      errors.value.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    } else if (form.value.password.length > MAX_PASSWORD_LENGTH) {
      errors.value.password = `Password must be less than ${MAX_PASSWORD_LENGTH} characters`;
    }
  }

  if (!form.value.email || form.value.email.trim().length === 0) {
    errors.value.email = 'Email is required';
  } else if (!EMAIL_PATTERN.test(form.value.email)) {
    errors.value.email = 'Invalid email format';
  } else if (form.value.email.length > MAX_EMAIL_LENGTH) {
    errors.value.email = `Email must be less than ${MAX_EMAIL_LENGTH} characters`;
  }

  if (!form.value.fullName || form.value.fullName.trim().length === 0) {
    errors.value.fullName = 'Full name is required';
  } else if (form.value.fullName.length > MAX_FULL_NAME_LENGTH) {
    errors.value.fullName = `Full name must be less than ${MAX_FULL_NAME_LENGTH} characters`;
  }

  if (form.value.phone && form.value.phone.length > MAX_PHONE_LENGTH) {
    errors.value.phone = `Phone must be less than ${MAX_PHONE_LENGTH} characters`;
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
    if (isEditMode.value && props.user) {
      const updateData: UserUpdateDto = {
        email: form.value.email.trim(),
        fullName: form.value.fullName.trim(),
        phone: form.value.phone?.trim() || undefined,
      };
      if (form.value.password && form.value.password.length > 0) {
        updateData.password = form.value.password;
      }
      await userApi.update(props.user.id, updateData);
      toast.success('User updated successfully!');
    } else {
      const createData: UserCreateDto = {
        username: form.value.username.trim(),
        password: form.value.password!,
        email: form.value.email.trim(),
        fullName: form.value.fullName.trim(),
        phone: form.value.phone?.trim() || undefined,
      };
      await userApi.create(createData);
      toast.success('User created successfully!');
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
    username: '',
    password: '',
    email: '',
    fullName: '',
    phone: '',
  };
  errors.value = {};
};

const populateForm = (user: UserResponseDto) => {
  form.value = {
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    phone: user.phone || '',
    password: '',
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
  () => props.user,
  (newUser) => {
    if (newUser) {
      populateForm(newUser);
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen && props.user) {
      populateForm(props.user);
    } else if (!isOpen) {
      resetForm();
    }
  }
);
</script>

