<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <!-- Breadcrumbs -->
    <div class="text-sm text-gray-500 dark:text-gray-400 mb-12">
      <RouterLink to="/" class="hover:text-primary">Account</RouterLink>
      <span class="mx-2">/</span>
      <RouterLink to="/dashboard" class="hover:text-primary">My Account</RouterLink>
      <span class="mx-2">/</span>
      <RouterLink to="/products" class="hover:text-primary">Product</RouterLink>
      <span class="mx-2">/</span>
      <RouterLink to="/cart" class="hover:text-primary">View Cart</RouterLink>
      <span class="mx-2">/</span>
      <span class="text-black dark:text-white">CheckOut</span>
    </div>

    <!-- Empty Cart State -->
    <div v-if="!cartStore.cart || cartStore.cart.items.length === 0" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400 mb-6">Your cart is empty</p>
      <RouterLink to="/products">
        <Button>Continue Shopping</Button>
      </RouterLink>
    </div>

    <!-- Checkout Form -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
      <!-- Left Column: Billing Details -->
      <div>
        <h1 class="text-4xl font-medium mb-8">Billing Details</h1>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- First Name -->
          <div>
            <label class="block text-sm text-gray-500 dark:text-gray-400 mb-2" for="first-name">
              First Name<span class="text-red-500">*</span>
            </label>
            <Input
              id="first-name"
              v-model="form.firstName"
              type="text"
              required
              :class="errors.firstName ? 'border-red-500' : ''"
              placeholder="Enter your first name"
            />
            <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">{{ errors.firstName }}</p>
          </div>

          <!-- Company Name -->
          <div>
            <label class="block text-sm text-gray-500 dark:text-gray-400 mb-2" for="company-name">
              Company Name
            </label>
            <Input
              id="company-name"
              v-model="form.companyName"
              type="text"
              placeholder="Enter company name (optional)"
            />
          </div>

          <!-- Street Address -->
          <div>
            <label class="block text-sm text-gray-500 dark:text-gray-400 mb-2" for="street-address">
              Street Address<span class="text-red-500">*</span>
            </label>
            <Input
              id="street-address"
              v-model="form.streetAddress"
              type="text"
              required
              :class="errors.streetAddress ? 'border-red-500' : ''"
              placeholder="Enter street address"
            />
            <p v-if="errors.streetAddress" class="text-red-500 text-xs mt-1">{{ errors.streetAddress }}</p>
          </div>

          <!-- Apartment -->
          <div>
            <label class="block text-sm text-gray-500 dark:text-gray-400 mb-2" for="apartment">
              Apartment, floor, etc. (optional)
            </label>
            <Input
              id="apartment"
              v-model="form.apartment"
              type="text"
              placeholder="Enter apartment, floor, etc. (optional)"
            />
          </div>

          <!-- Town/City -->
          <div>
            <label class="block text-sm text-gray-500 dark:text-gray-400 mb-2" for="town-city">
              Town/City<span class="text-red-500">*</span>
            </label>
            <Input
              id="town-city"
              v-model="form.townCity"
              type="text"
              required
              :class="errors.townCity ? 'border-red-500' : ''"
              placeholder="Enter town/city"
            />
            <p v-if="errors.townCity" class="text-red-500 text-xs mt-1">{{ errors.townCity }}</p>
          </div>

          <!-- Phone Number -->
          <div>
            <label class="block text-sm text-gray-500 dark:text-gray-400 mb-2" for="phone-number">
              Phone Number<span class="text-red-500">*</span>
            </label>
            <Input
              id="phone-number"
              v-model="form.phoneNumber"
              type="tel"
              required
              :class="errors.phoneNumber ? 'border-red-500' : ''"
              placeholder="Enter phone number"
            />
            <p v-if="errors.phoneNumber" class="text-red-500 text-xs mt-1">{{ errors.phoneNumber }}</p>
          </div>

          <!-- Email Address -->
          <div>
            <label class="block text-sm text-gray-500 dark:text-gray-400 mb-2" for="email-address">
              Email Address<span class="text-red-500">*</span>
            </label>
            <Input
              id="email-address"
              v-model="form.emailAddress"
              type="email"
              required
              :class="errors.emailAddress ? 'border-red-500' : ''"
              placeholder="Enter email address"
            />
            <p v-if="errors.emailAddress" class="text-red-500 text-xs mt-1">{{ errors.emailAddress }}</p>
          </div>

          <!-- Save Info Checkbox -->
          <div class="flex items-center">
            <Checkbox id="save-info" v-model:checked="form.saveInfo" />
            <label class="ml-3 text-sm cursor-pointer" for="save-info">
              Save this information for faster check-out next time
            </label>
          </div>
        </form>
      </div>

      <!-- Right Column: Order Summary -->
      <div>
        <div class="space-y-6">
          <!-- Cart Items -->
          <div v-for="item in cartStore.cart.items" :key="item.id" class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
              <img
                :alt="item.productName"
                :src="item.productImageUrl || 'https://placehold.co/56'"
                class="w-14 h-14 object-contain rounded"
              />
              <span class="text-sm font-medium">{{ item.productName }}</span>
            </div>
            <span class="text-sm font-medium">{{ formatPrice(item.subtotalCents, item.currencyCode) }}</span>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="mt-8 space-y-4">
          <div class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
            <span class="text-gray-600 dark:text-gray-400">Subtotal:</span>
            <span class="font-medium">{{ formatPrice(cartStore.totalPrice, cartStore.cart.items[0]?.currencyCode) }}</span>
          </div>
          <div class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
            <span class="text-gray-600 dark:text-gray-400">Shipping:</span>
            <span class="font-medium">Free</span>
          </div>
          <div class="flex justify-between pb-4 font-medium text-lg">
            <span>Total:</span>
            <span>{{ formatPrice(cartStore.totalPrice, cartStore.cart.items[0]?.currencyCode) }}</span>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="mt-8 space-y-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <input
                id="bank"
                v-model="paymentMethod"
                class="h-4 w-4 text-primary border-gray-300 dark:border-gray-600 focus:ring-primary cursor-pointer"
                name="payment-method"
                type="radio"
                value="bank"
              />
              <label class="ml-3 block text-sm cursor-pointer" for="bank">Bank</label>
            </div>
            <div class="flex items-center space-x-2">
              <img
                alt="bKash logo"
                class="h-4"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn0VGXomGxqPWNowuEYiQJz3MZImsYHXhjkCdLrKd0olCNh9c3Rr1pciOb9lELVapoVlwebjnEwsfIz-WFyITppoDh08UMlDEXR6vsSr7MJqhffAqeptJbbg6z8wOVip0_6d04khK-zE4shXp0qzMB053rjAl_sJtdcpICdINTkHKg6aLVA1-bPCThx-aJakqBBvPQV9ec01qDmfmU8-BZtTdlKRz98Kl73J3yjIbW74RN1qtkXNj23hfi-ZH7G0xozQq4s38XUao"
              />
              <img
                alt="Visa logo"
                class="h-4"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKXsBCCHi-k9XOp-cBXZjF5eB1cV7SeoQ2lZUL8E12hjnKtumlYmD9YdVldkkK5moopw9mxoxptDsA41D629I2b8JHC8BBWSLCYHsYnIags2bnI_aXliKL_V0QYQHW8q9vZZA8quQ_6TMvu7mUzXx8DL3-s8Y0i4DYzC4VuuU8HJXlXIhvZJWsJSV7hQTkzIF3VxoCDv6vzXDwMVb4C6XkV_Aw_d6i4JfOf27tNkENjOLYAuwNfzU0OLaH0WImmRkBY5RBsguFJ3I"
              />
              <img
                alt="Mastercard logo"
                class="h-4"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD30Jf1b-TyLFzHKncBFpMKWlQovkqjPM0Cxdo2GUMz92Isd41f1yoW_gsV5XbwZr1IDJg4dfhUbhGHpXukGkJFtY8fwKKoSGeqMnWPsRBQl7objHDAnEkSwplEa15xoggjz-SBDgHpWENNC_sBwP0MEom1hTXnssx3CUMbqLeXct2W8LEZyOLKPUIiwAA58ly1kkNUM82tYUY89u32fx0OTVSrNQ3xIGzEQn89hg0mRJH5BsZsdrC0qu0DL0sG99crNJKaQpHciOk"
              />
              <img
                alt="Nagad logo"
                class="h-4"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI1eIZcgiD9HrypwdE2dZRDmJSKRV1r_6iNbRUN7otPFb-ywgRLZCHYQqy4uI0ssg-YA2C2-wsBxsxMml6rCtaNhb4IyIj-dcE9SzLhZx_ewrGk9wFQSA-zIyIt2HUWNk5AI2iUz4PZvl7RGbju6Mv1Sv-nj81CEt1XqYpxUSIEmrRThjWwisb0HZH1jEYINYnglVu1De5ewUNTSvamhxbF8_zQ1DMrNi_FocxdTqjFYHn29Dv4ZTOQld8HBEPBhrWxiSox1Z8EW4"
              />
            </div>
          </div>
          <div class="flex items-center">
            <input
              id="cash-on-delivery"
              v-model="paymentMethod"
              checked
              class="h-4 w-4 text-primary border-gray-300 dark:border-gray-600 focus:ring-primary cursor-pointer"
              name="payment-method"
              type="radio"
              value="cash-on-delivery"
            />
            <label class="ml-3 block text-sm cursor-pointer" for="cash-on-delivery">Cash on delivery</label>
          </div>
        </div>

        <!-- Coupon Code -->
        <div class="mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Input
            v-model="couponCode"
            class="w-full sm:flex-grow"
            placeholder="Coupon Code"
            type="text"
          />
          <Button
            type="button"
            class="w-full sm:w-auto bg-primary text-white px-8 py-3 hover:bg-primary/90 transition-colors"
            @click="handleApplyCoupon"
          >
            Apply Coupon
          </Button>
        </div>

        <!-- Place Order Button -->
        <div class="mt-6">
          <Button
            type="button"
            class="w-full bg-primary text-white px-10 py-3 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="placingOrder || !isFormValid"
            @click="handlePlaceOrder"
          >
            <span v-if="placingOrder" class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent mr-2"></span>
            {{ placingOrder ? 'Placing Order...' : 'Place Order' }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import { useToast } from '@/composables/useToast';
import { orderApi } from '@/services/order';
import type { OrderRequestDto } from '@/types/order';
import { getErrorMessage, DEFAULT_ERROR_MESSAGES } from '@/utils/getErrorMessage';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';

const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();
const toast = useToast();

// Form state
const form = ref({
  firstName: '',
  companyName: '',
  streetAddress: '',
  apartment: '',
  townCity: '',
  phoneNumber: '',
  emailAddress: '',
  saveInfo: false,
});

const errors = ref<Record<string, string>>({});
const paymentMethod = ref('cash-on-delivery');
const couponCode = ref('');
const placingOrder = ref(false);

// Computed
const isFormValid = computed(() => {
  return (
    form.value.firstName.trim() !== '' &&
    form.value.streetAddress.trim() !== '' &&
    form.value.townCity.trim() !== '' &&
    form.value.phoneNumber.trim() !== '' &&
    form.value.emailAddress.trim() !== '' &&
    validateEmail(form.value.emailAddress)
  );
});

// Methods
const formatPrice = (priceCents: number, currencyCode: string = 'USD'): string => {
  const price = priceCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateForm = (): boolean => {
  errors.value = {};

  if (!form.value.firstName.trim()) {
    errors.value.firstName = 'First name is required';
  }

  if (!form.value.streetAddress.trim()) {
    errors.value.streetAddress = 'Street address is required';
  }

  if (!form.value.townCity.trim()) {
    errors.value.townCity = 'Town/City is required';
  }

  if (!form.value.phoneNumber.trim()) {
    errors.value.phoneNumber = 'Phone number is required';
  }

  if (!form.value.emailAddress.trim()) {
    errors.value.emailAddress = 'Email address is required';
  } else if (!validateEmail(form.value.emailAddress)) {
    errors.value.emailAddress = 'Please enter a valid email address';
  }

  return Object.keys(errors.value).length === 0;
};

const handleApplyCoupon = () => {
  if (!couponCode.value.trim()) {
    toast.error('Please enter a coupon code');
    return;
  }
  toast.error('Coupon code validation not implemented yet');
};

const buildShippingAddress = (): string => {
  const parts: string[] = [];
  if (form.value.streetAddress) parts.push(form.value.streetAddress);
  if (form.value.apartment) parts.push(form.value.apartment);
  if (form.value.townCity) parts.push(form.value.townCity);
  return parts.join(', ');
};

const handlePlaceOrder = async () => {
  if (!validateForm()) {
    toast.error('Please fill in all required fields');
    return;
  }

  if (!cartStore.cart || cartStore.cart.items.length === 0) {
    toast.error('Your cart is empty');
    router.push('/cart');
    return;
  }

  if (!cartStore.cart.id) {
    toast.error('Invalid cart. Please try again.');
    return;
  }

  placingOrder.value = true;

  try {
    const orderData: OrderRequestDto = {
      cartId: cartStore.cart.id,
      shippingName: form.value.firstName,
      shippingPhone: form.value.phoneNumber,
      shippingAddress: buildShippingAddress(),
      paymentMethod: paymentMethod.value,
      notes: form.value.companyName ? `Company: ${form.value.companyName}` : undefined,
    };

    const response = await orderApi.create(orderData);

    if (response.success && response.data) {
    toast.success('Order placed successfully!');
    
    // Clear cart after successful order
    await cartStore.clearCart();
    
    // Save billing info if checkbox is checked
    if (form.value.saveInfo) {
      localStorage.setItem('billingInfo', JSON.stringify(form.value));
    }

    // Redirect to order confirmation page (or home)
    router.push('/');
    } else {
      toast.error(getErrorMessage(null, DEFAULT_ERROR_MESSAGES.ORDER_CREATE));
    }
  } catch (error: any) {
    console.error('Order creation error:', error);
    const errorMessage = getErrorMessage(error, DEFAULT_ERROR_MESSAGES.ORDER_CREATE);
    toast.error(errorMessage);
  } finally {
    placingOrder.value = false;
  }
};

const handleSubmit = () => {
  handlePlaceOrder();
};

// Load saved billing info if available
const loadSavedBillingInfo = () => {
  const savedInfo = localStorage.getItem('billingInfo');
  if (savedInfo) {
    try {
      const parsed = JSON.parse(savedInfo);
      form.value = { ...form.value, ...parsed };
    } catch (error) {
      // Silently fail - form will use default values
    }
  }

  // Pre-fill with user info if authenticated
  if (authStore.user) {
    if (authStore.user.fullName) {
      const nameParts = authStore.user.fullName.split(' ');
      form.value.firstName = nameParts[0] || '';
    }
    if (authStore.user.email) {
      form.value.emailAddress = authStore.user.email;
    }
    if (authStore.user.phone) {
      form.value.phoneNumber = authStore.user.phone;
    }
  }
};

// Lifecycle
onMounted(async () => {
  // Redirect to cart if cart is empty
  if (!cartStore.cart || cartStore.cart.items.length === 0) {
    router.push('/cart');
    return;
  }

  // Ensure cart is loaded
  await cartStore.initCart();

  // Load saved billing info
  loadSavedBillingInfo();
});
</script>
