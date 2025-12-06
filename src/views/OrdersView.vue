<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <!-- Breadcrumbs -->
    <div class="flex justify-between items-center mb-16">
      <div class="text-sm text-text-secondary-light dark:text-text-secondary-dark">
        <RouterLink to="/" class="hover:text-text-light dark:hover:text-text-dark">Home</RouterLink>
        <span class="mx-2">/</span>
        <span class="text-text-light dark:text-text-dark">My Orders</span>
      </div>
      <div class="text-sm">
        Welcome! <span class="text-primary">{{ authStore.user?.fullName || 'User' }}</span>
      </div>
    </div>

    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-text-primary mb-2">My Orders</h1>
      <p class="text-text-secondary-light dark:text-text-secondary-dark">View and manage your order history</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-text-secondary-light dark:text-text-secondary-dark">Loading orders...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!orders || orders.length === 0" class="text-center py-12">
      <p class="text-text-secondary-light dark:text-text-secondary-dark mb-4">You haven't placed any orders yet.</p>
      <RouterLink to="/products">
        <Button>Start Shopping</Button>
      </RouterLink>
    </div>

    <!-- Orders List -->
    <div v-else class="space-y-6">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-background-light dark:bg-secondary-dark rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
      >
        <!-- Order Header -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div class="flex items-center gap-4 mb-2">
                <h3 class="text-lg font-semibold text-text-primary">Order #{{ order.orderNumber }}</h3>
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :class="getStatusClass(order.status)"
                >
                  {{ order.status }}
                </span>
              </div>
              <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Placed on {{ formatDate(order.createdAt) }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-lg font-bold text-text-primary">
                {{ formatPrice(order.totalAmountCents, order.currencyCode) }}
              </p>
              <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                {{ order.items.length }} item{{ order.items.length !== 1 ? 's' : '' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="p-6">
          <div class="space-y-4">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
            >
              <div class="flex-1">
                <h4 class="font-medium text-text-primary">{{ item.productName }}</h4>
                <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  Quantity: {{ item.quantity }} × {{ formatPrice(item.unitPriceCents, item.currencyCode) }}
                </p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-text-primary">
                  {{ formatPrice(item.subtotalCents, item.currencyCode) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Footer -->
        <div class="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              <p><strong>Shipping to:</strong> {{ order.shippingName }}</p>
              <p>{{ order.shippingAddress }}</p>
              <p>{{ order.shippingPhone }}</p>
            </div>
            <div class="flex gap-3">
              <Button variant="outline" @click="viewOrderDetails(order.id)">View Details</Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="orders && orders.length > 0 && totalPages > 1" class="mt-8 flex justify-center gap-2">
      <Button
        variant="outline"
        :disabled="currentPage === 0"
        @click="goToPage(currentPage - 1)"
      >
        Previous
      </Button>
      <span class="flex items-center px-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">
        Page {{ currentPage + 1 }} of {{ totalPages }}
      </span>
      <Button
        variant="outline"
        :disabled="currentPage >= totalPages - 1"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </Button>
    </div>

    <!-- Order Detail Modal -->
    <OrderDetailModal
      :open="isModalOpen"
      :order-id="selectedOrderId"
      @update:open="isModalOpen = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useToast } from '@/composables/useToast';
import { orderApi } from '@/services/order';
import { getErrorMessage, DEFAULT_ERROR_MESSAGES } from '@/utils/getErrorMessage';
import type { OrderResponseDto } from '@/types/order';
import type { PaginationResponse } from '@/types/api';
import Button from '@/components/ui/button/Button.vue';
import OrderDetailModal from '@/components/orders/OrderDetailModal.vue';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const orders = ref<OrderResponseDto[]>([]);
const loading = ref(false);
const currentPage = ref(0);
const pageSize = ref(10);
const totalPages = ref(0);
const totalElements = ref(0);
const isModalOpen = ref(false);
const selectedOrderId = ref<number | null>(null);

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
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const getStatusClass = (status: string): string => {
  const statusLower = status.toLowerCase();
  if (statusLower.includes('pending') || statusLower.includes('processing')) {
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
  } else if (statusLower.includes('completed') || statusLower.includes('delivered')) {
    return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
  } else if (statusLower.includes('cancelled') || statusLower.includes('canceled')) {
    return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200';
  } else {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200';
  }
};

const fetchOrders = async () => {
  if (!authStore.user?.id) {
    return;
  }

  loading.value = true;
  try {
    const response = await orderApi.getUserOrders(currentPage.value, pageSize.value);
    
    if (response.success && response.data) {
      // Handle pagination response
      if ('content' in response.data) {
        const paginationData = response.data as PaginationResponse<OrderResponseDto>;
        orders.value = paginationData.content;
        totalPages.value = paginationData.totalPages;
        totalElements.value = paginationData.totalElements;
        currentPage.value = paginationData.page;
      } else if (Array.isArray(response.data)) {
        // If response is array directly
        orders.value = response.data;
        totalPages.value = 1;
        totalElements.value = response.data.length;
      } else {
        // Single order object
        orders.value = [response.data as OrderResponseDto];
        totalPages.value = 1;
        totalElements.value = 1;
      }
    }
  } catch (error: any) {
    console.error('Failed to fetch orders:', error);
    toast.error(getErrorMessage(error, DEFAULT_ERROR_MESSAGES.ORDER_LOAD));
  } finally {
    loading.value = false;
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
  fetchOrders();
};

const viewOrderDetails = (orderId: number) => {
  selectedOrderId.value = orderId;
  isModalOpen.value = true;
};

onMounted(() => {
  // Redirect to login if not authenticated
  if (!authStore.isAuthenticated) {
    router.push({ name: 'Login', query: { redirect: '/orders' } });
    return;
  }

  fetchOrders();
});
</script>

