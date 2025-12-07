<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-2">
        {{ cartStore.cart?.items.length || 0 }} item(s) in your cart
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="cartStore.loading" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">Loading cart...</p>
    </div>

    <!-- Empty Cart -->
    <div v-else-if="!cartStore.cart || cartStore.cart.items.length === 0" class="text-center py-12">
      <span class="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">shopping_cart</span>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
      <p class="text-gray-500 dark:text-gray-400 mb-6">Add some products to get started!</p>
      <RouterLink :to="PRODUCTS_PATH">
        <Button>Continue Shopping</Button>
      </RouterLink>
    </div>

    <!-- Cart Content -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div
              v-for="item in cartStore.cart.items"
              :key="item.id"
              class="p-6 flex flex-col sm:flex-row gap-4"
            >
              <!-- Product Image -->
              <div class="flex-shrink-0">
                <img
                  :src="item.productImageUrl || DEFAULT_PLACEHOLDER_IMAGE"
                  :alt="item.productName"
                  class="w-24 h-24 object-cover rounded-lg"
                />
              </div>

              <!-- Product Info -->
              <div class="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {{ item.productName }}
                  </h3>
                  <p class="text-primary font-bold">
                    {{ formatPrice(item.unitPriceCents) }}
                  </p>
                </div>

                <!-- Quantity Controls -->
                <div class="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    class="h-8 w-8"
                    :disabled="item.quantity <= MIN_QUANTITY"
                    @click="handleDecreaseQuantity(item.id, item.quantity)"
                    aria-label="Decrease quantity"
                  >
                    <span class="material-symbols-outlined text-base" aria-hidden="true">remove</span>
                  </Button>
                  <span class="text-lg font-medium text-gray-900 dark:text-white w-8 text-center">
                    {{ item.quantity }}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    class="h-8 w-8"
                    @click="handleIncreaseQuantity(item.id, item.quantity)"
                    aria-label="Increase quantity"
                  >
                    <span class="material-symbols-outlined text-base" aria-hidden="true">add</span>
                  </Button>
                </div>

                <!-- Item Total -->
                <div class="flex items-center justify-between sm:justify-end gap-4">
                  <p class="text-lg font-bold text-gray-900 dark:text-white">
                    {{ formatPrice(item.subtotalCents) }}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    @click="handleRemoveItem(item.id)"
                    aria-label="Remove item from cart"
                  >
                    <span class="material-symbols-outlined text-xl" aria-hidden="true">delete</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Continue Shopping -->
        <div class="mt-6">
          <RouterLink :to="PRODUCTS_PATH">
            <Button variant="outline">
              <span class="material-symbols-outlined mr-2" aria-hidden="true">arrow_back</span>
              Continue Shopping
            </Button>
          </RouterLink>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

          <div class="space-y-4 mb-6">
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>{{ formatPrice(cartStore.totalPrice) }}</span>
            </div>
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Tax</span>
              <span>Calculated at checkout</span>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div class="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>{{ formatPrice(cartStore.totalPrice) }}</span>
              </div>
            </div>
          </div>

          <Button
            class="w-full mb-4"
            size="lg"
            @click="handleCheckout"
          >
            Proceed to Checkout
          </Button>

          <Button
            variant="outline"
            class="w-full"
            @click="handleClearCart"
          >
            Clear Cart
          </Button>

          <!-- Guest User Notice -->
          <div v-if="!authStore.isAuthenticated" class="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p class="text-sm text-yellow-800 dark:text-yellow-200">
              <span class="material-symbols-outlined text-base align-middle mr-1" aria-hidden="true">info</span>
              You'll need to login to complete your purchase
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Clear Cart Confirmation Dialog -->
    <AlertDialog v-model:open="showClearCartDialog">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear Cart</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to clear your cart? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="showClearCartDialog = false">Cancel</AlertDialogCancel>
          <AlertDialogAction @click="confirmClearCart">Clear Cart</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import { Button } from '@/components/ui/button';
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
const DEFAULT_PLACEHOLDER_IMAGE = 'https://placehold.co/150';
const MIN_QUANTITY = 1;
const CENTS_TO_CURRENCY_DIVISOR = 100;
const LOCALE_VI_VN = 'vi-VN';
const CURRENCY_VND = 'VND';
const CHECKOUT_PATH = '/checkout';
const PRODUCTS_PATH = '/products';

const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();

const showClearCartDialog = ref<boolean>(false);

const formatPrice = (priceCents: number): string => {
  const price = priceCents / CENTS_TO_CURRENCY_DIVISOR;
  return new Intl.NumberFormat(LOCALE_VI_VN, {
    style: 'currency',
    currency: CURRENCY_VND,
  }).format(price);
};

const handleIncreaseQuantity = async (itemId: number, currentQuantity: number): Promise<void> => {
  try {
    await cartStore.updateItem(itemId, currentQuantity + 1);
  } catch {
    // Error handled by store
  }
};

const handleDecreaseQuantity = async (itemId: number, currentQuantity: number): Promise<void> => {
  if (currentQuantity <= MIN_QUANTITY) {
    return;
  }
  try {
    await cartStore.updateItem(itemId, currentQuantity - 1);
  } catch {
    // Error handled by store
  }
};

const handleRemoveItem = async (itemId: number): Promise<void> => {
  try {
    await cartStore.removeItem(itemId);
  } catch {
    // Error handled by store
  }
};

const handleClearCart = (): void => {
  showClearCartDialog.value = true;
};

const confirmClearCart = async (): Promise<void> => {
  try {
    await cartStore.clearCart();
    showClearCartDialog.value = false;
  } catch {
    // Error handled by store
  }
};

const handleCheckout = (): void => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'Login', query: { redirect: CHECKOUT_PATH } });
  } else {
    router.push(CHECKOUT_PATH);
  }
};

onMounted(() => {
  // Fetch cart if not already loaded
  if (!cartStore.cart) {
    cartStore.initCart();
  }
});
</script>

