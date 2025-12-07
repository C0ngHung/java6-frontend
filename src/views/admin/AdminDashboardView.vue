<template>
  <div class="relative flex min-h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
    <!-- Top Header (if needed) -->
    
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
              class="active flex items-center gap-3 rounded-lg bg-accent-green/10 px-3 py-2 text-accent-green dark:bg-accent-green/20"
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
            <p class="text-sm font-medium">Logout</p>
          </button>
        </div>
      </div>
    </aside>

      <!-- Main Content Area -->
      <main class="flex-1">
      <!-- Content Panel -->
      <div class="p-8">
        <!-- HeadlineText -->
        <h1 class="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark">Welcome back, {{ userName }}!</h1>
        <!-- BodyText -->
        <p class="mt-2 text-base font-normal text-gray-600 dark:text-gray-400">
          Here's a summary of your store's performance. Use the sidebar to manage products, users, and settings.
        </p>

        <!-- Stats Cards Section -->
        <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="stat in stats"
            :key="stat.id"
            class="rounded-xl border border-border-light bg-panel-light p-5 dark:border-border-dark dark:bg-panel-dark"
          >
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
              <span class="material-symbols-outlined text-xl" :class="stat.iconColor">{{ stat.icon }}</span>
            </div>
            <p class="mt-2 text-2xl font-bold text-text-light dark:text-text-dark">{{ stat.value }}</p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ stat.change }}</p>
          </div>
        </div>

        <!-- Recent Orders Table -->
        <div class="mt-8 flex flex-col">
          <h2 class="text-xl font-bold text-text-light dark:text-text-dark">Recent Orders</h2>
          <div class="mt-4 overflow-hidden rounded-xl border border-border-light bg-panel-light dark:border-border-dark dark:bg-panel-dark">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-border-light dark:divide-border-dark">
                <thead class="bg-gray-50 dark:bg-white/5">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Order ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Customer</th>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Total</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border-light dark:divide-border-dark">
                  <tr v-for="order in recentOrders" :key="order.id">
                    <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-text-light dark:text-text-dark">#{{ order.id }}</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{{ order.customer }}</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{{ order.date }}</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm">
                      <span
                        class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                        :class="getStatusClass(order.status)"
                      >
                        {{ order.status }}
                      </span>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">${{ order.total.toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const userName = computed(() => authStore.user?.username || 'Alex Turner');

const stats = ref([
  {
    id: 1,
    label: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1% from last month',
    icon: 'trending_up',
    iconColor: 'text-green-500',
  },
  {
    id: 2,
    label: 'Total Sales',
    value: '+12,234',
    change: '+19% from last month',
    icon: 'trending_up',
    iconColor: 'text-green-500',
  },
  {
    id: 3,
    label: 'New Customers',
    value: '+350',
    change: '+5 from yesterday',
    icon: 'trending_up',
    iconColor: 'text-green-500',
  },
  {
    id: 4,
    label: 'Pending Orders',
    value: '42',
    change: 'Requires attention',
    icon: 'pending_actions',
    iconColor: 'text-yellow-500',
  },
]);

const recentOrders = ref([
  {
    id: 3066,
    customer: 'Liam Johnson',
    date: '2024-05-22',
    status: 'Shipped',
    total: 250.0,
  },
  {
    id: 3065,
    customer: 'Olivia Smith',
    date: '2024-05-21',
    status: 'Processing',
    total: 150.0,
  },
  {
    id: 3064,
    customer: 'Noah Williams',
    date: '2024-05-21',
    status: 'Shipped',
    total: 350.0,
  },
  {
    id: 3063,
    customer: 'Emma Brown',
    date: '2024-05-20',
    status: 'Canceled',
    total: 75.0,
  },
]);

const getStatusClass = (status: string) => {
  const statusMap: Record<string, string> = {
    Shipped: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Processing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    Canceled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  };
  return statusMap[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
};

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.active .material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>

