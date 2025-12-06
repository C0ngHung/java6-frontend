<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogContent class="!w-[95vw] !max-w-[95vw] sm:!max-w-7xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Order Details</DialogTitle>
      </DialogHeader>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <p class="text-text-secondary-light dark:text-text-secondary-dark">Loading order details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="py-4">
        <Alert variant="destructive">
          <AlertDescription>{{ error }}</AlertDescription>
        </Alert>
      </div>

      <!-- Order Details -->
      <div v-else-if="order" class="space-y-6">
        <!-- Order Header -->
        <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 class="text-xl font-semibold text-text-primary mb-2">
                Order #{{ order.orderNumber }}
              </h3>
              <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Placed on {{ formatDate(order.createdAt) }}
              </p>
            </div>
            <div class="flex items-center gap-3">
              <span
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="getStatusClass(order.status)"
              >
                {{ order.status }}
              </span>
              <span class="text-2xl font-bold text-primary">
                {{ formatPrice(order.totalAmountCents, order.currencyCode) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div>
          <h4 class="text-lg font-semibold text-text-primary mb-4">Order Items</h4>
          <div class="space-y-4">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <!-- Product Image -->
              <div class="flex-shrink-0">
                <img
                  v-if="item.productImageUrl"
                  :src="item.productImageUrl"
                  :alt="item.productName"
                  class="w-32 h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  @error="handleImageError"
                />
                <div
                  v-else
                  class="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center"
                >
                  <svg
                    class="w-12 h-12 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <!-- Product Details -->
              <div class="flex-1 min-w-0">
                <h5 class="font-medium text-text-primary mb-1">{{ item.productName }}</h5>
                <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  Product ID: {{ item.productId }}
                </p>
                <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                  Quantity: {{ item.quantity }} × {{ formatPrice(item.unitPriceCents, item.currencyCode) }}
                </p>
              </div>

              <!-- Price -->
              <div class="text-right flex-shrink-0">
                <p class="font-semibold text-text-primary text-lg">
                  {{ formatPrice(item.subtotalCents, item.currencyCode) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Shipping Information -->
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 class="font-semibold text-text-primary mb-3">Shipping Information</h4>
            <div class="space-y-2 text-sm">
              <p class="text-text-secondary-light dark:text-text-secondary-dark">
                <span class="font-medium text-text-primary">Name:</span> {{ order.shippingName }}
              </p>
              <p class="text-text-secondary-light dark:text-text-secondary-dark">
                <span class="font-medium text-text-primary">Phone:</span> {{ order.shippingPhone }}
              </p>
              <p class="text-text-secondary-light dark:text-text-secondary-dark">
                <span class="font-medium text-text-primary">Address:</span> {{ order.shippingAddress }}
              </p>
            </div>
          </div>

          <!-- Payment Information -->
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 class="font-semibold text-text-primary mb-3">Payment Information</h4>
            <div class="space-y-2 text-sm">
              <p class="text-text-secondary-light dark:text-text-secondary-dark">
                <span class="font-medium text-text-primary">Method:</span> {{ order.paymentMethod }}
              </p>
              <p class="text-text-secondary-light dark:text-text-secondary-dark">
                <span class="font-medium text-text-primary">Status:</span>
                <span
                  class="ml-2 px-2 py-0.5 rounded text-xs"
                  :class="getPaymentStatusClass(order.paymentStatus)"
                >
                  {{ order.paymentStatus }}
                </span>
              </p>
              <p class="text-text-secondary-light dark:text-text-secondary-dark mt-4">
                <span class="font-medium text-text-primary">Total Amount:</span>
                <span class="ml-2 text-lg font-bold text-primary">
                  {{ formatPrice(order.totalAmountCents, order.currencyCode) }}
                </span>
              </p>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="order.notes" class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 class="font-semibold text-text-primary mb-2">Order Notes</h4>
          <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            {{ order.notes }}
          </p>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { orderApi } from '@/services/order';
import { productApi } from '@/services/product';
import { getErrorMessage, DEFAULT_ERROR_MESSAGES } from '@/utils/getErrorMessage';
import { useToast } from '@/composables/useToast';
import type { OrderResponseDto, OrderItemResponseDto } from '@/types/order';

interface Props {
  open: boolean;
  orderId: number | null;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  'update:open': [value: boolean];
}>();

const toast = useToast();
const isOpen = ref(props.open);
const loading = ref(false);
const error = ref<string | null>(null);
const order = ref<OrderResponseDto | null>(null);

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

const getPaymentStatusClass = (status: string): string => {
  const statusLower = status.toLowerCase();
  if (statusLower.includes('pending') || statusLower.includes('processing')) {
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
  } else if (statusLower.includes('completed') || statusLower.includes('paid')) {
    return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
  } else if (statusLower.includes('failed') || statusLower.includes('cancelled')) {
    return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200';
  } else {
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const fetchOrderDetails = async () => {
  if (!props.orderId) {
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const response = await orderApi.getById(props.orderId);
    
    if (response.success && response.data) {
      order.value = response.data;
      
      // Fetch product images for each order item
      if (order.value.items && order.value.items.length > 0) {
        await fetchProductImages(order.value.items);
      }
    } else {
      error.value = getErrorMessage(null, DEFAULT_ERROR_MESSAGES.ORDER_LOAD);
    }
  } catch (err: any) {
    console.error('Failed to fetch order details:', err);
    error.value = getErrorMessage(err, DEFAULT_ERROR_MESSAGES.ORDER_LOAD);
    toast.error(error.value);
  } finally {
    loading.value = false;
  }
};

const fetchProductImages = async (items: OrderItemResponseDto[]) => {
  if (!order.value) return;

  // Fetch product images for items that don't have imageUrl
  const itemsWithoutImage = items.filter(item => !item.productImageUrl);
  
  if (itemsWithoutImage.length === 0) return;

  try {
    const productPromises = itemsWithoutImage.map(async (item) => {
      try {
        const productResponse = await productApi.getById(item.productId);
        if (productResponse.success && productResponse.data?.imageUrl) {
          item.productImageUrl = productResponse.data.imageUrl;
        }
      } catch (err) {
        // Silently fail for individual product fetches
      }
    });

    await Promise.all(productPromises);
  } catch (err) {
    // Silently fail - product images are optional
  }
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.style.display = 'none';
};

const handleOpenChange = (value: boolean) => {
  isOpen.value = value;
  emits('update:open', value);
  
  if (!value) {
    // Reset state when closing
    order.value = null;
    error.value = null;
  }
};

// Watch for open changes
watch(() => props.open, (newValue) => {
  isOpen.value = newValue;
  if (newValue && props.orderId) {
    fetchOrderDetails();
  }
});

// Watch for orderId changes
watch(() => props.orderId, (newId) => {
  if (isOpen.value && newId) {
    fetchOrderDetails();
  }
});
</script>

