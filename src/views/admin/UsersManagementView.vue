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
                class="flex items-center gap-3 rounded-lg px-3 py-2 text-text-light/80 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5"
              >
                <span class="material-symbols-outlined text-xl">category</span>
                <p class="text-sm font-medium">Categories</p>
              </RouterLink>
              <RouterLink
                to="/admin/users"
                class="active flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary dark:bg-primary/20 dark:text-white"
              >
                <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1">group</span>
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
          <div class="flex flex-col gap-1 mb-6">
            <p class="text-gray-900 dark:text-white text-3xl font-bold leading-tight">Users & Roles Management</p>
            <p class="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Manage users, roles, and permissions for your store.</p>
          </div>

          <!-- Tabs -->
          <Tabs default-value="users" class="w-full">
            <TabsList class="mb-6">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="roles">Roles</TabsTrigger>
            </TabsList>

            <!-- Users Tab -->
            <TabsContent value="users" class="space-y-6">
              <div class="flex flex-wrap justify-between items-center gap-4">
                <div class="flex-grow">
                  <label class="flex flex-col min-w-40 h-12 w-full">
                    <div class="flex w-full flex-1 items-stretch rounded-lg h-full border bg-background shadow-xs dark:bg-input/30 dark:border-input">
                      <div class="text-gray-500 dark:text-gray-400 flex items-center justify-center pl-4 rounded-l-lg border-r border-gray-200 dark:border-input">
                        <span class="material-symbols-outlined">search</span>
                      </div>
                      <Input
                        v-model="userFilters.search"
                        type="text"
                        placeholder="Search by username, email, or full name..."
                        class="rounded-r-lg rounded-l-none border-0 bg-transparent h-full focus-visible:ring-0 focus-visible:ring-offset-0"
                        @input="handleUserSearch"
                      />
                    </div>
                  </label>
                </div>
                <Button
                  @click="handleAddNewUser"
                  class="rounded-full h-11 px-5"
                >
                  <span class="material-symbols-outlined">add_circle</span>
                  <span class="truncate">Add New User</span>
                </Button>
              </div>

              <!-- Users Table -->
              <div class="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
                <div v-if="userLoading" class="p-8 text-center">
                  <p class="text-gray-500 dark:text-gray-400">Loading users...</p>
                </div>
                <div v-else-if="userError" class="p-8 text-center">
                  <p class="text-red-500">{{ userError }}</p>
                  <Button @click="fetchUsers" class="mt-4 rounded-full">Retry</Button>
                </div>
                <div v-else class="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead class="px-6 py-3">ID</TableHead>
                        <TableHead class="px-6 py-3">Username</TableHead>
                        <TableHead class="px-6 py-3">Email</TableHead>
                        <TableHead class="px-6 py-3">Full Name</TableHead>
                        <TableHead class="px-6 py-3">Phone</TableHead>
                        <TableHead class="px-6 py-3 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow
                        v-for="user in users"
                        :key="user.id"
                        class="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <TableCell class="px-6 py-4 whitespace-nowrap">{{ user.id }}</TableCell>
                        <TableCell class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {{ user.username }}
                        </TableCell>
                        <TableCell class="px-6 py-4 whitespace-nowrap">{{ user.email }}</TableCell>
                        <TableCell class="px-6 py-4 whitespace-nowrap">{{ user.fullName }}</TableCell>
                        <TableCell class="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                          {{ user.phone || '-' }}
                        </TableCell>
                        <TableCell class="px-6 py-4 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            @click="handleAssignRole(user)"
                            class="p-2"
                            title="Assign Role"
                          >
                            <span class="material-symbols-outlined text-base">admin_panel_settings</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            @click="handleEditUser(user)"
                            class="p-2"
                            title="Edit User"
                          >
                            <span class="material-symbols-outlined text-base">edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            @click="handleDeleteUser(user)"
                            class="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-500"
                            title="Delete User"
                          >
                            <span class="material-symbols-outlined text-base">delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div v-if="!userLoading && !userError && users.length === 0" class="p-8 text-center">
                  <p class="text-gray-500 dark:text-gray-400 text-lg">No users found</p>
                </div>
              </div>

              <!-- Users Pagination -->
              <nav v-if="!userLoading && !userError && users.length > 0" aria-label="Table navigation" class="flex items-center justify-between">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Showing
                  <span class="font-semibold text-gray-900 dark:text-white">
                    {{ (userPagination.page - 1) * userPagination.size + 1 }}-{{ Math.min(userPagination.page * userPagination.size, userPagination.totalElements) }}
                  </span>
                  of
                  <span class="font-semibold text-gray-900 dark:text-white">{{ userPagination.totalElements }}</span>
                </span>
                <div class="inline-flex -space-x-px text-sm h-8">
                  <Button
                    variant="outline"
                    size="sm"
                    :disabled="userPagination.page === 1"
                    class="rounded-l-lg rounded-r-none"
                    @click="handleUserPageChange(userPagination.page - 1)"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    :disabled="userPagination.page >= userPagination.totalPages"
                    class="rounded-r-lg rounded-l-none"
                    @click="handleUserPageChange(userPagination.page + 1)"
                  >
                    Next
                  </Button>
                </div>
              </nav>
            </TabsContent>

            <!-- Roles Tab -->
            <TabsContent value="roles" class="space-y-6">
              <div class="flex flex-wrap justify-between items-center gap-4">
                <div class="flex-grow">
                  <label class="flex flex-col min-w-40 h-12 w-full">
                    <div class="flex w-full flex-1 items-stretch rounded-lg h-full border bg-background shadow-xs dark:bg-input/30 dark:border-input">
                      <div class="text-gray-500 dark:text-gray-400 flex items-center justify-center pl-4 rounded-l-lg border-r border-gray-200 dark:border-input">
                        <span class="material-symbols-outlined">search</span>
                      </div>
                      <Input
                        v-model="roleFilters.search"
                        type="text"
                        placeholder="Search by role code or name..."
                        class="rounded-r-lg rounded-l-none border-0 bg-transparent h-full focus-visible:ring-0 focus-visible:ring-offset-0"
                        @input="handleRoleSearch"
                      />
                    </div>
                  </label>
                </div>
                <Button
                  @click="handleAddNewRole"
                  class="rounded-full h-11 px-5"
                >
                  <span class="material-symbols-outlined">add_circle</span>
                  <span class="truncate">Add New Role</span>
                </Button>
              </div>

              <!-- Roles Table -->
              <div class="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
                <div v-if="roleLoading" class="p-8 text-center">
                  <p class="text-gray-500 dark:text-gray-400">Loading roles...</p>
                </div>
                <div v-else-if="roleError" class="p-8 text-center">
                  <p class="text-red-500">{{ roleError }}</p>
                  <Button @click="fetchRoles" class="mt-4 rounded-full">Retry</Button>
                </div>
                <div v-else class="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead class="px-6 py-3">ID</TableHead>
                        <TableHead class="px-6 py-3">Code</TableHead>
                        <TableHead class="px-6 py-3">Name</TableHead>
                        <TableHead class="px-6 py-3">Description</TableHead>
                        <TableHead class="px-6 py-3 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow
                        v-for="role in roles"
                        :key="role.id"
                        class="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <TableCell class="px-6 py-4 whitespace-nowrap">{{ role.id }}</TableCell>
                        <TableCell class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {{ role.code }}
                        </TableCell>
                        <TableCell class="px-6 py-4 whitespace-nowrap">{{ role.name }}</TableCell>
                        <TableCell class="px-6 py-4 text-gray-500 dark:text-gray-400">
                          {{ role.description || '-' }}
                        </TableCell>
                        <TableCell class="px-6 py-4 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            @click="handleEditRole(role)"
                            class="p-2"
                          >
                            <span class="material-symbols-outlined text-base">edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            @click="handleDeleteRole(role)"
                            class="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-500"
                          >
                            <span class="material-symbols-outlined text-base">delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div v-if="!roleLoading && !roleError && roles.length === 0" class="p-8 text-center">
                  <p class="text-gray-500 dark:text-gray-400 text-lg">No roles found</p>
                </div>
              </div>

              <!-- Roles Pagination -->
              <nav v-if="!roleLoading && !roleError && roles.length > 0" aria-label="Table navigation" class="flex items-center justify-between">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Showing
                  <span class="font-semibold text-gray-900 dark:text-white">
                    {{ (rolePagination.page - 1) * rolePagination.size + 1 }}-{{ Math.min(rolePagination.page * rolePagination.size, rolePagination.totalElements) }}
                  </span>
                  of
                  <span class="font-semibold text-gray-900 dark:text-white">{{ rolePagination.totalElements }}</span>
                </span>
                <div class="inline-flex -space-x-px text-sm h-8">
                  <Button
                    variant="outline"
                    size="sm"
                    :disabled="rolePagination.page === 1"
                    class="rounded-l-lg rounded-r-none"
                    @click="handleRolePageChange(rolePagination.page - 1)"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    :disabled="rolePagination.page >= rolePagination.totalPages"
                    class="rounded-r-lg rounded-l-none"
                    @click="handleRolePageChange(rolePagination.page + 1)"
                  >
                    Next
                  </Button>
                </div>
              </nav>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>

    <!-- User Form Modal -->
    <UserFormModal
      :is-open="isUserModalOpen"
      :user="selectedUser"
      @close="handleUserModalClose"
      @saved="handleUserModalSaved"
    />

    <!-- Role Form Modal -->
    <RoleFormModal
      :is-open="isRoleModalOpen"
      :role="selectedRole"
      @close="handleRoleModalClose"
      @saved="handleRoleModalSaved"
    />

    <!-- Assign Role Modal -->
    <Dialog :open="isAssignRoleModalOpen" @update:open="(open) => !open && handleAssignRoleModalClose()">
      <DialogContent class="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Manage Roles for {{ selectedUserForRole?.username }}</DialogTitle>
          <DialogDescription>
            Assign or remove roles for this user.
          </DialogDescription>
        </DialogHeader>

        <div v-if="loadingUserRoles" class="p-4 text-center">
          <p class="text-gray-500 dark:text-gray-400">Loading roles...</p>
        </div>

        <div v-else class="space-y-4">
          <!-- Current Roles -->
          <div>
            <h3 class="text-sm font-medium mb-2">Current Roles</h3>
            <div v-if="userRoles.length === 0" class="text-sm text-gray-500 dark:text-gray-400 p-4 border rounded-lg">
              No roles assigned
            </div>
            <div v-else class="space-y-2">
              <div
                v-for="userRole in userRoles"
                :key="userRole.roleId"
                class="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p class="font-medium">{{ userRole.roleName }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ userRole.roleCode }}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="handleRemoveRole(userRole.roleId)"
                  :disabled="removingRole"
                  class="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
                >
                  <span class="material-symbols-outlined text-base">remove_circle</span>
                  Remove
                </Button>
              </div>
            </div>
          </div>

          <!-- Available Roles -->
          <div>
            <h3 class="text-sm font-medium mb-2">Available Roles</h3>
            <div v-if="availableRoles.length === 0" class="text-sm text-gray-500 dark:text-gray-400 p-4 border rounded-lg">
              No available roles
            </div>
            <div v-else class="space-y-2 max-h-60 overflow-y-auto">
              <div
                v-for="role in availableRoles"
                :key="role.id"
                class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div>
                  <p class="font-medium">{{ role.name }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ role.code }}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  @click="handleAssignRoleToUser(role.id)"
                  :disabled="assigningRole"
                >
                  <span class="material-symbols-outlined text-base">add_circle</span>
                  Assign
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="handleAssignRoleModalClose">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Delete Confirmation Dialogs -->
    <AlertDialog :open="showUserDeleteDialog" @update:open="showUserDeleteDialog = $event">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete User</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete user "{{ userToDelete?.username }}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            @click="confirmDeleteUser"
            class="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <AlertDialog :open="showRoleDeleteDialog" @update:open="showRoleDeleteDialog = $event">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Role</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete role "{{ roleToDelete?.name }}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            @click="confirmDeleteRole"
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
import { ref, computed, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { userApi } from '@/services/user';
import { roleApi } from '@/services/role';
import UserFormModal from '@/components/admin/UserFormModal.vue';
import RoleFormModal from '@/components/admin/RoleFormModal.vue';
import { useToast } from '@/composables/useToast';
import { getErrorMessageWithFallback, DEFAULT_ERROR_MESSAGES } from '@/utils/getErrorMessage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import type { UserResponseDto, UserRoleResponseDto } from '@/types/user';
import type { RoleResponseDto } from '@/types/role';
import type { PaginationRequest } from '@/types/api';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

// Users State
const userLoading = ref(false);
const userError = ref<string | null>(null);
const users = ref<UserResponseDto[]>([]);
const userFilters = ref({ search: '' });
const isUserModalOpen = ref(false);
const selectedUser = ref<UserResponseDto | null>(null);
const showUserDeleteDialog = ref(false);
const userToDelete = ref<UserResponseDto | null>(null);
const userPagination = ref({
  page: 1,
  size: 10,
  totalPages: 0,
  totalElements: 0,
});

// Roles State
const roleLoading = ref(false);
const roleError = ref<string | null>(null);
const roles = ref<RoleResponseDto[]>([]);
const roleFilters = ref({ search: '' });
const isRoleModalOpen = ref(false);
const selectedRole = ref<RoleResponseDto | null>(null);
const showRoleDeleteDialog = ref(false);
const roleToDelete = ref<RoleResponseDto | null>(null);
const rolePagination = ref({
  page: 1,
  size: 10,
  totalPages: 0,
  totalElements: 0,
});

// Assign Role Modal State
const isAssignRoleModalOpen = ref(false);
const selectedUserForRole = ref<UserResponseDto | null>(null);
const userRoles = ref<UserRoleResponseDto[]>([]);
const allRoles = ref<RoleResponseDto[]>([]);
const loadingUserRoles = ref(false);
const assigningRole = ref(false);
const removingRole = ref(false);

// Methods - Users
const fetchUsers = async () => {
  userLoading.value = true;
  userError.value = null;
  try {
    const params: PaginationRequest = {
      page: userPagination.value.page,
      size: userPagination.value.size,
      sort: 'createdAt',
      direction: 'DESC',
    };
    const response = await userApi.getAll(params);
    if (response.success) {
      users.value = response.data.content;
      userPagination.value.totalPages = response.data.totalPages;
      userPagination.value.totalElements = response.data.totalElements;
    }
  } catch (err: unknown) {
    userError.value = getErrorMessageWithFallback(err, DEFAULT_ERROR_MESSAGES.GENERIC, true);
    toast.error(userError.value);
  } finally {
    userLoading.value = false;
  }
};

const handleUserSearch = () => {
  userPagination.value.page = 1;
  fetchUsers();
};

const handleUserPageChange = (page: number) => {
  userPagination.value.page = page;
  fetchUsers();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleAddNewUser = () => {
  selectedUser.value = null;
  isUserModalOpen.value = true;
};

const handleEditUser = (user: UserResponseDto) => {
  selectedUser.value = user;
  isUserModalOpen.value = true;
};

const handleUserModalClose = () => {
  isUserModalOpen.value = false;
  selectedUser.value = null;
};

const handleUserModalSaved = () => {
  fetchUsers();
};

const handleDeleteUser = (user: UserResponseDto) => {
  userToDelete.value = user;
  showUserDeleteDialog.value = true;
};

const confirmDeleteUser = async () => {
  if (!userToDelete.value) return;
  try {
    await userApi.delete(userToDelete.value.id);
    toast.success('User deleted successfully!');
    await fetchUsers();
  } catch (err: unknown) {
    toast.error(getErrorMessageWithFallback(err, DEFAULT_ERROR_MESSAGES.GENERIC, true));
  } finally {
    showUserDeleteDialog.value = false;
    userToDelete.value = null;
  }
};

// Methods - Roles
const fetchRoles = async () => {
  roleLoading.value = true;
  roleError.value = null;
  try {
    const params: PaginationRequest = {
      page: rolePagination.value.page,
      size: rolePagination.value.size,
      sort: 'createdAt',
      direction: 'DESC',
    };
    const response = await roleApi.getAll(params);
    if (response.success) {
      roles.value = response.data.content;
      rolePagination.value.totalPages = response.data.totalPages;
      rolePagination.value.totalElements = response.data.totalElements;
    }
  } catch (err: unknown) {
    roleError.value = getErrorMessageWithFallback(err, DEFAULT_ERROR_MESSAGES.GENERIC, true);
    toast.error(roleError.value);
  } finally {
    roleLoading.value = false;
  }
};

const handleRoleSearch = () => {
  rolePagination.value.page = 1;
  fetchRoles();
};

const handleRolePageChange = (page: number) => {
  rolePagination.value.page = page;
  fetchRoles();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleAddNewRole = () => {
  selectedRole.value = null;
  isRoleModalOpen.value = true;
};

const handleEditRole = (role: RoleResponseDto) => {
  selectedRole.value = role;
  isRoleModalOpen.value = true;
};

const handleRoleModalClose = () => {
  isRoleModalOpen.value = false;
  selectedRole.value = null;
};

const handleRoleModalSaved = () => {
  fetchRoles();
};

const handleDeleteRole = (role: RoleResponseDto) => {
  roleToDelete.value = role;
  showRoleDeleteDialog.value = true;
};

const confirmDeleteRole = async () => {
  if (!roleToDelete.value) return;
  try {
    await roleApi.delete(roleToDelete.value.id);
    toast.success('Role deleted successfully!');
    await fetchRoles();
  } catch (err: unknown) {
    toast.error(getErrorMessageWithFallback(err, DEFAULT_ERROR_MESSAGES.GENERIC, true));
  } finally {
    showRoleDeleteDialog.value = false;
    roleToDelete.value = null;
  }
};

// Methods - Assign Role
const handleAssignRole = async (user: UserResponseDto) => {
  selectedUserForRole.value = user;
  isAssignRoleModalOpen.value = true;
  await loadUserRoles(user.id);
  await loadAllRoles();
};

const handleAssignRoleModalClose = () => {
  isAssignRoleModalOpen.value = false;
  selectedUserForRole.value = null;
  userRoles.value = [];
  allRoles.value = [];
};

const loadUserRoles = async (userId: number) => {
  loadingUserRoles.value = true;
  try {
    const response = await userApi.getRoles(userId);
    if (response.success) {
      userRoles.value = response.data;
    }
  } catch (err: unknown) {
    toast.error(getErrorMessageWithFallback(err, DEFAULT_ERROR_MESSAGES.GENERIC, true));
  } finally {
    loadingUserRoles.value = false;
  }
};

const loadAllRoles = async () => {
  try {
    const response = await roleApi.getAll({
      page: 1,
      size: 100,
      sort: 'name',
      direction: 'ASC',
    });
    if (response.success) {
      allRoles.value = response.data.content;
    }
  } catch (err: unknown) {
    toast.error(getErrorMessageWithFallback(err, DEFAULT_ERROR_MESSAGES.GENERIC, true));
  }
};

const availableRoles = computed(() => {
  const assignedRoleIds = userRoles.value.map((ur) => ur.roleId);
  return allRoles.value.filter((role) => !assignedRoleIds.includes(role.id));
});

const handleAssignRoleToUser = async (roleId: number) => {
  if (!selectedUserForRole.value) return;

  assigningRole.value = true;
  try {
    await userApi.assignRole(selectedUserForRole.value.id, roleId);
    toast.success('Role assigned successfully!');
    await loadUserRoles(selectedUserForRole.value.id);
  } catch (err: unknown) {
    toast.error(getErrorMessageWithFallback(err, DEFAULT_ERROR_MESSAGES.GENERIC, true));
  } finally {
    assigningRole.value = false;
  }
};

const handleRemoveRole = async (roleId: number) => {
  if (!selectedUserForRole.value) return;

  removingRole.value = true;
  try {
    await userApi.removeRole(selectedUserForRole.value.id, roleId);
    toast.success('Role removed successfully!');
    await loadUserRoles(selectedUserForRole.value.id);
  } catch (err: unknown) {
    toast.error(getErrorMessageWithFallback(err, DEFAULT_ERROR_MESSAGES.GENERIC, true));
  } finally {
    removingRole.value = false;
  }
};

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};

onMounted(() => {
  fetchUsers();
  fetchRoles();
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

