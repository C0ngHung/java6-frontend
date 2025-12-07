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
                class="active flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary dark:bg-primary/20 dark:text-white"
              >
                <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1">shopping_cart</span>
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
        <!-- Content Panel -->
        <div class="p-8">
          <!-- Page Heading -->
          <div class="mb-6">
            <p class="text-gray-900 dark:text-white text-3xl font-bold leading-tight">Orders Management</p>
            <p class="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">View, track, and manage all customer orders.</p>
          </div>

          <!-- Search and Filter Bar -->
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
                    placeholder="Search by order number or customer..."
                    class="rounded-r-lg rounded-l-none border-0 bg-transparent h-full focus-visible:ring-0 focus-visible:ring-offset-0"
                    @input="handleSearch"
                  />
                </div>
              </label>
            </div>
            <div class="flex gap-3">
              <div class="relative">
                <Button
                  variant="outline"
                  @click="showStatusFilter = !showStatusFilter"
                  class="h-12"
                >
                  <p class="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">
                    {{ statusFilter || 'Status' }}
                  </p>
                  <span class="material-symbols-outlined text-gray-500 dark:text-gray-400">expand_more</span>
                </Button>
                <!-- Status Dropdown -->
                <div v-if="showStatusFilter" class="absolute z-10 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-1 top-full left-0">
                  <div class="p-2">
                    <button
                      @click="handleStatusSelect(undefined)"
                      class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      :class="!statusFilter ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-300'"
                    >
                      All Status
                    </button>
                    <button
                      v-for="status in statusOptions"
                      :key="status"
                      @click="handleStatusSelect(status)"
                      class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      :class="statusFilter === status ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-300'"
                    >
                      {{ status }}
                    </button>
                  </div>
                </div>
              </div>
              <div class="relative">
                <Button
                  variant="outline"
                  @click="showDateRangeFilter = !showDateRangeFilter"
                  class="h-12"
                >
                  <p class="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">
                    {{ dateRangeFilter || 'Date Range' }}
                  </p>
                  <span class="material-symbols-outlined text-gray-500 dark:text-gray-400">expand_more</span>
                </Button>
                <!-- Date Range Dropdown -->
                <div v-if="showDateRangeFilter" class="absolute z-10 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-1 top-full left-0">
                  <div class="p-2">
                    <button
                      v-for="range in dateRangeOptions"
                      :key="range"
                      @click="handleDateRangeSelect(range)"
                      class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      :class="dateRangeFilter === range ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-300'"
                    >
                      {{ range || 'All Dates' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Orders Table -->
          <div class="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
            <!-- Loading State -->
            <div v-if="loading" class="p-8 text-center">
              <p class="text-gray-500 dark:text-gray-400">Loading orders...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="p-8 text-center">
              <p class="text-red-500">{{ error }}</p>
              <Button
                @click="fetchOrders"
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
                    <TableHead class="px-6 py-3">Order #</TableHead>
                    <TableHead class="px-6 py-3">Customer</TableHead>
                    <TableHead class="px-6 py-3">Date</TableHead>
                    <TableHead class="px-6 py-3">Total</TableHead>
                    <TableHead class="px-6 py-3">Status</TableHead>
                    <TableHead class="px-6 py-3 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    v-for="order in orders"
                    :key="order.id"
                    class="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <TableCell class="w-4 p-4">
                      <Checkbox
                        :model-value="selectedOrders.includes(order.id)"
                        @update:model-value="(value: boolean | 'indeterminate') => {
                          const checked = value === true;
                          if (checked) {
                            selectedOrders.push(order.id);
                          } else {
                            selectedOrders = selectedOrders.filter(id => id !== order.id);
                          }
                        }"
                      />
                    </TableCell>
                    <TableCell class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      #{{ order.orderNumber }}
                    </TableCell>
                    <TableCell class="px-6 py-4 whitespace-nowrap">{{ order.shippingName }}</TableCell>
                    <TableCell class="px-6 py-4 whitespace-nowrap">{{ formatDate(order.createdAt) }}</TableCell>
                    <TableCell class="px-6 py-4">{{ formatPrice(order.totalAmountCents, order.currencyCode) }}</TableCell>
                    <TableCell class="px-6 py-4">
                      <span
                        :class="[
                          'text-xs font-medium me-2 px-2.5 py-0.5 rounded-full',
                          getStatusClass(order.status),
                        ]"
                      >
                        {{ order.status }}
                      </span>
                    </TableCell>
                    <TableCell class="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        @click="handleEdit(order)"
                        class="p-2"
                      >
                        <span class="material-symbols-outlined text-base">edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        @click="handleDelete(order)"
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
            <div v-if="!loading && !error && orders.length === 0" class="p-8 text-center">
              <p class="text-gray-500 dark:text-gray-400 text-lg">No orders found</p>
            </div>

            <!-- Pagination -->
            <nav v-if="!loading && !error && orders.length > 0" aria-label="Table navigation" class="flex items-center justify-between p-4">
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

    <!-- Order Detail Modal -->
    <OrderDetailModal
      :open="isModalOpen"
      :order-id="selectedOrderId"
      :editable="true"
      @update:open="isModalOpen = $event"
      @updated="fetchOrders"
    />

    <!-- Delete Confirmation Dialog -->
    <AlertDialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Order</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete order #{{ orderToDelete?.orderNumber }}? This action cannot be undone.
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
import { orderApi } from '@/services/order';
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
import OrderDetailModal from '@/components/orders/OrderDetailModal.vue';
import type { OrderResponseDto } from '@/types/order';
import type { PaginationRequest } from '@/types/api';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

// State
const loading = ref(false);
const error = ref<string | null>(null);
const orders = ref<OrderResponseDto[]>([]);
const selectedOrders = ref<number[]>([]);
const selectAll = ref(false);
const showStatusFilter = ref(false);
const showDateRangeFilter = ref(false);

// Filters
const filters = ref({
  search: '',
  status: undefined as string | undefined,
  dateRange: undefined as string | undefined,
});

const statusFilter = ref<string | undefined>(undefined);
const dateRangeFilter = ref<string | undefined>(undefined);

const statusOptions = ['Pending', 'Confirmed', 'Shipping', 'Delivered', 'Cancelled'];
const dateRangeOptions = ['Today', 'This Week', 'This Month', 'Last Month', 'All Dates'];

// Modal state
const isModalOpen = ref(false);
const selectedOrderId = ref<number | null>(null);

// Delete confirmation dialog
const showDeleteDialog = ref(false);
const orderToDelete = ref<OrderResponseDto | null>(null);

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

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

const getStatusClass = (status: string): string => {
  const statusLower = status.toLowerCase();
  if (statusLower.includes('delivered')) {
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
  } else if (statusLower.includes('shipping')) {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
  } else if (statusLower.includes('confirmed')) {
    return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
  } else if (statusLower.includes('pending')) {
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
  } else if (statusLower.includes('cancelled') || statusLower.includes('canceled')) {
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  } else {
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

const handleSelectAll = (checked?: boolean) => {
  const isChecked = checked !== undefined ? checked : !selectAll.value;
  if (isChecked) {
    selectedOrders.value = orders.value.map((o) => o.id);
  } else {
    selectedOrders.value = [];
  }
};

const handleStatusSelect = (status: string | undefined) => {
  statusFilter.value = status;
  filters.value.status = status;
  showStatusFilter.value = false;
  pagination.value.page = 1;
  fetchOrders();
};

const handleDateRangeSelect = (range: string) => {
  dateRangeFilter.value = range === 'All Dates' ? undefined : range;
  filters.value.dateRange = dateRangeFilter.value;
  showDateRangeFilter.value = false;
  pagination.value.page = 1;
  fetchOrders();
};

const handleSearch = () => {
  pagination.value.page = 1;
  fetchOrders();
};

const handlePageChange = (page: number) => {
  pagination.value.page = page;
  fetchOrders();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleEdit = (order: OrderResponseDto) => {
  selectedOrderId.value = order.id;
  isModalOpen.value = true;
};

const handleDelete = (order: OrderResponseDto) => {
  orderToDelete.value = order;
  showDeleteDialog.value = true;
};

const confirmDelete = async () => {
  if (!orderToDelete.value) return;

  try {
    await orderApi.delete(orderToDelete.value.id);
    toast.success('Order deleted successfully!');
    await fetchOrders();
  } catch (err: any) {
    toast.error(getErrorMessage(err, DEFAULT_ERROR_MESSAGES.ORDER_DELETE || 'Failed to delete order'));
  } finally {
    showDeleteDialog.value = false;
    orderToDelete.value = null;
  }
};

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};

const fetchOrders = async () => {
  loading.value = true;
  error.value = null;

  try {
    const params: PaginationRequest & { orderNumber?: string; shippingName?: string; status?: string; startDate?: string; endDate?: string } = {
      page: pagination.value.page - 1, // Backend uses 0-based indexing
      size: pagination.value.size,
      sort: 'createdAt',
      direction: 'DESC',
    };

    // Search by order number or customer name
    if (filters.value.search) {
      params.search = filters.value.search;
    }

    // Status filter
    if (filters.value.status) {
      params.status = filters.value.status;
    }

    // Date range filter (would need backend support or frontend filtering)
    // For now, we'll filter on frontend after fetching

    const response = await orderApi.getAll(params);

    if (response.success) {
      let filteredOrders = response.data.content || [];

      // Frontend filtering for date range (until backend supports it)
      if (filters.value.dateRange) {
        const now = new Date();
        filteredOrders = filteredOrders.filter((order: OrderResponseDto) => {
          const orderDate = new Date(order.createdAt);
          switch (filters.value.dateRange) {
            case 'Today':
              return orderDate.toDateString() === now.toDateString();
            case 'This Week':
              const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
              return orderDate >= weekAgo;
            case 'This Month':
              return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
            case 'Last Month':
              const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
              const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
              return orderDate >= lastMonth && orderDate < thisMonth;
            default:
              return true;
          }
        });
      }

      orders.value = filteredOrders;
      pagination.value = {
        page: (response.data.page || 0) + 1, // Convert to 1-based for display
        size: response.data.size || pagination.value.size,
        totalPages: response.data.totalPages || 1,
        totalElements: response.data.totalElements || filteredOrders.length,
      };
    } else {
      error.value = 'Failed to load orders';
    }
  } catch (err: unknown) {
    const axiosError = err as { response?: { data?: { message?: string } } };
    error.value = axiosError.response?.data?.message || 'Failed to load orders. Please try again.';
    toast.error(getErrorMessage(err, DEFAULT_ERROR_MESSAGES.ORDER_LOAD));
  } finally {
    loading.value = false;
  }
};

// Watch for selectAll changes
watch(
  () => selectedOrders.value.length,
  (newLength) => {
    selectAll.value = newLength === orders.value.length && orders.value.length > 0;
  }
);

// Close dropdowns when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  // Check if click is outside the filter buttons and their dropdowns
  const filterContainer = target.closest('.flex.gap-3');
  if (!filterContainer) {
    showStatusFilter.value = false;
    showDateRangeFilter.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchOrders();
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

