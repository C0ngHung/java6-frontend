<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <!-- Breadcrumbs -->
    <div class="flex justify-between items-center mb-16">
      <div class="text-sm text-text-secondary-light dark:text-text-secondary-dark">
        <RouterLink to="/" class="hover:text-text-light dark:hover:text-text-dark">Home</RouterLink>
        <span class="mx-2">/</span>
        <span class="text-text-light dark:text-text-dark">My Account</span>
      </div>
      <div class="text-sm">
        Welcome! <span class="text-primary">{{ authStore.user?.fullName || DEFAULT_USER_NAME }}</span>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-12 lg:gap-20">
      <!-- Left Sidebar -->
      <aside class="lg:w-1/4">
        <div class="space-y-6">
          <div>
            <h3 class="font-medium mb-4">Manage My Account</h3>
            <ul class="space-y-2 pl-6">
              <li>
                <a class="text-primary hover:underline" href="#" @click.prevent="activeSection = 'profile'">My Profile</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-medium mb-4">My Orders</h3>
            <ul class="space-y-2 pl-6">
              <li>
                <RouterLink
                  to="/orders"
                  class="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-light dark:hover:text-text-dark hover:underline"
                >
                  My Orders
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <section class="flex-1">
        <div class="shadow-md rounded-lg p-6 sm:p-10 bg-background-light dark:bg-secondary-dark">
          <h2 class="text-xl font-medium text-primary mb-6">Edit Your Profile</h2>
          <form 
            class="space-y-6" 
            @submit.prevent="handleSubmit"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium mb-2" for="username">
                  Username
                </label>
                <Input
                  id="username"
                  :model-value="form.username"
                  type="text"
                  disabled
                  class="bg-secondary-background cursor-not-allowed opacity-60"
                  placeholder="Username"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2" for="full-name">
                  Full Name<span class="text-red-500">*</span>
                </label>
                <Input
                  id="full-name"
                  v-model="form.fullName"
                  type="text"
                  required
                  :maxlength="MAX_FULL_NAME_LENGTH"
                  :class="errors.fullName ? 'border-red-500' : ''"
                  placeholder="Enter your full name"
                />
                <p v-if="errors.fullName" class="text-red-500 text-xs mt-1" role="alert">{{ errors.fullName }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2" for="email">
                  Email<span class="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  :maxlength="MAX_EMAIL_LENGTH"
                  :class="errors.email ? 'border-red-500' : ''"
                  placeholder="Enter your email"
                />
                <p v-if="errors.email" class="text-red-500 text-xs mt-1" role="alert">{{ errors.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2" for="phone">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  :maxlength="MAX_PHONE_LENGTH"
                  :class="errors.phone ? 'border-red-500' : ''"
                  placeholder="Enter your phone number"
                />
                <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
              </div>
            </div>
            <div class="space-y-4">
              <h3 class="text-base font-medium pt-2">Password Changes</h3>
              <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Leave blank if you don't want to change your password
              </p>
              <Input
                v-model="form.currentPassword"
                type="password"
                placeholder="Current Password"
                :class="errors.currentPassword ? 'border-red-500' : ''"
              />
              <p v-if="errors.currentPassword" class="text-red-500 text-xs mt-1">{{ errors.currentPassword }}</p>
              <Input
                v-model="form.newPassword"
                type="password"
                placeholder="New Password (minimum 6 characters)"
                :maxlength="MAX_PASSWORD_LENGTH"
                :class="errors.newPassword ? 'border-red-500' : ''"
              />
              <p v-if="errors.newPassword" class="text-red-500 text-xs mt-1" role="alert">{{ errors.newPassword }}</p>
              <Input
                v-model="form.confirmPassword"
                type="password"
                placeholder="Confirm New Password"
                :maxlength="MAX_PASSWORD_LENGTH"
                :class="errors.confirmPassword ? 'border-red-500' : ''"
              />
              <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1" role="alert">{{ errors.confirmPassword }}</p>
            </div>
            <div class="flex justify-end items-center gap-6 pt-4">
              <Button type="button" variant="outline" @click="handleCancel">Cancel</Button>
              <Button 
                type="submit" 
                :disabled="isSubmitting"
                @click.prevent="handleSubmit"
                aria-label="Save profile changes"
              >
                {{ isSubmitting ? SAVING_TEXT : SAVE_CHANGES_TEXT }}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useToast } from '@/composables/useToast';
import { userApi } from '@/services/user';
import type { UserUpdateRequest } from '@/types/user';
import { getErrorMessage, DEFAULT_ERROR_MESSAGES } from '@/utils/getErrorMessage';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { ROUTES } from '@/constants';

const MAX_FULL_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;
const MAX_PHONE_LENGTH = 15;
const MAX_PASSWORD_LENGTH = 255;
const MIN_PASSWORD_LENGTH = 6;
const SAVING_TEXT = 'Saving...';
const SAVE_CHANGES_TEXT = 'Save Changes';
const DEFAULT_USER_NAME = 'User';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const activeSection = ref<string>('profile');
const isSubmitting = ref<boolean>(false);

const form = ref({
  username: '',
  fullName: '',
  email: '',
  phone: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const errors = ref<Record<string, string>>({});

const validateForm = (): boolean => {
  errors.value = {};

  if (!form.value.fullName.trim()) {
    errors.value.fullName = 'Full name is required';
  } else if (form.value.fullName.length > MAX_FULL_NAME_LENGTH) {
    errors.value.fullName = `Full name must not exceed ${MAX_FULL_NAME_LENGTH} characters`;
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required';
  } else if (!validateEmail(form.value.email)) {
    errors.value.email = 'Please enter a valid email address';
  } else if (form.value.email.length > MAX_EMAIL_LENGTH) {
    errors.value.email = `Email must not exceed ${MAX_EMAIL_LENGTH} characters`;
  }

  if (form.value.phone && form.value.phone.length > MAX_PHONE_LENGTH) {
    errors.value.phone = `Phone number must not exceed ${MAX_PHONE_LENGTH} characters`;
  }

  if (form.value.currentPassword || form.value.newPassword || form.value.confirmPassword) {
    if (!form.value.currentPassword) {
      errors.value.currentPassword = 'Current password is required to change password';
    }
    if (!form.value.newPassword) {
      errors.value.newPassword = 'New password is required';
    } else if (form.value.newPassword.length < MIN_PASSWORD_LENGTH) {
      errors.value.newPassword = `New password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    } else if (form.value.newPassword.length > MAX_PASSWORD_LENGTH) {
      errors.value.newPassword = `New password must not exceed ${MAX_PASSWORD_LENGTH} characters`;
    }
    if (form.value.newPassword && form.value.newPassword !== form.value.confirmPassword) {
      errors.value.confirmPassword = 'Passwords do not match';
    }
  }

  return Object.keys(errors.value).length === 0;
};

const validateEmail = (email: string): boolean => {
  return EMAIL_PATTERN.test(email);
};

const handleSubmit = async () => {
  if (!validateForm()) {
    toast.error('Please fill in all required fields correctly');
    return;
  }

  if (!authStore.user?.id) {
    toast.error('User information not available');
    return;
  }

  isSubmitting.value = true;

  try {
    const updateData: UserUpdateRequest = {
      fullName: form.value.fullName,
      email: form.value.email,
      phone: form.value.phone || undefined,
    };

    if (form.value.newPassword) {
      updateData.password = form.value.newPassword;
    }

    const response = await userApi.updateProfile(authStore.user.id, updateData);

    if (response.success && response.data) {
      toast.success('Profile updated successfully!');
      
      const updatedUser = {
        ...authStore.user,
        fullName: response.data.fullName,
        email: response.data.email,
        phone: response.data.phone || authStore.user?.phone,
      };
      authStore.setUser(updatedUser);

      form.value.currentPassword = '';
      form.value.newPassword = '';
      form.value.confirmPassword = '';
    } else {
      toast.error(getErrorMessage(null, DEFAULT_ERROR_MESSAGES.PROFILE_UPDATE));
    }
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error, DEFAULT_ERROR_MESSAGES.PROFILE_UPDATE);
    toast.error(errorMessage);
  } finally {
    isSubmitting.value = false;
  }
};

const handleCancel = (): void => {
  loadUserData();
  errors.value = {};
};

const loadUserData = (): void => {
  if (authStore.user) {
    form.value.username = authStore.user.username || '';
    form.value.fullName = authStore.user.fullName || '';
    form.value.email = authStore.user.email || '';
    form.value.phone = authStore.user.phone || '';
  }
};

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'Login', query: { redirect: ROUTES.ACCOUNT } });
    return;
  }

  loadUserData();
});
</script>

