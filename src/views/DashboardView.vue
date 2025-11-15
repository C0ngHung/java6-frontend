<template>
  <div class="relative flex min-h-screen w-full flex-row">
    <!-- SideNavBar -->
    <aside class="flex h-screen w-64 flex-col border-r border-border-light dark:border-border-dark bg-white dark:bg-panel-dark fixed">
      <div class="flex h-full flex-col justify-between p-4">
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-3 px-2">
            <div class="flex size-8 items-center justify-center rounded-lg bg-green-600 text-white">
              <span class="material-symbols-outlined text-[20px]">store</span>
            </div>
            <div class="flex flex-col">
              <h1 class="text-base font-bold text-gray-900 dark:text-text-dark">E-commerce</h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
            </div>
          </div>
          <nav class="flex flex-col gap-2">
            <a class="active flex items-center gap-3 rounded-lg bg-green-600/10 px-3 py-2 text-green-700 dark:bg-green-600/20" href="#">
              <span class="material-symbols-outlined text-xl">dashboard</span>
              <p class="text-sm font-medium">Dashboard</p>
            </a>
            <a class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5" href="#">
              <span class="material-symbols-outlined text-xl">inventory_2</span>
              <p class="text-sm font-medium">Products</p>
            </a>
            <a class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5" href="#">
              <span class="material-symbols-outlined text-xl">category</span>
              <p class="text-sm font-medium">Categories</p>
            </a>
            <a class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5" href="#">
              <span class="material-symbols-outlined text-xl">warehouse</span>
              <p class="text-sm font-medium">Inventory</p>
            </a>
            <a class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5" href="#">
              <span class="material-symbols-outlined text-xl">group</span>
              <p class="text-sm font-medium">Users & Roles</p>
            </a>
          </nav>
        </div>
        <div class="flex flex-col gap-2 border-t border-border-light pt-4 dark:border-border-dark">
          <a class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5" href="#">
            <span class="material-symbols-outlined text-xl">settings</span>
            <p class="text-sm font-medium">Settings</p>
          </a>
          <button
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5 text-left"
            @click="handleLogout"
          >
            <span class="material-symbols-outlined text-xl">logout</span>
            <p class="text-sm font-medium">Logout</p>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="ml-64 flex-1">
      <!-- TopNavBar -->
      <header class="flex h-16 items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 bg-white px-8 dark:border-border-dark dark:bg-panel-dark sticky top-0 z-10">
        <div class="flex items-center gap-4">
          <h2 class="text-lg font-bold text-gray-900 dark:text-text-dark">Dashboard</h2>
        </div>
        <div class="flex items-center gap-4">
          <button class="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-gray-600 hover:bg-gray-100 dark:text-text-dark/80 dark:hover:bg-white/5">
            <span class="material-symbols-outlined text-2xl">notifications</span>
          </button>
          <div class="flex items-center gap-3">
            <div
              class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              :data-alt="`Avatar of ${authStore.user?.username || 'User'}`"
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCZ9-hq_kXULs2c942Dn9iHS5_oWynWuHdvtd4R6gPBfYkUzu09wktgtHKm07wMD7-N_L1DUT7eksMPHggoBHdzi2dxdC0iJtXjypvOctS1Tayqj98e6ErZmJO7wmPinsQfAWzugEOs0qJMSe1Oz7ulGy4eZmmxPqayfwYemRys97jxPP1-P0QwWi3CkSuzm1KnxdAmebdOwuijEwSU-rvUu8wZmAZmW5QVRcShhIpqmmRN5sc1Wde_7U2lw3pkkciXqOebHed__Kk");'
            ></div>
            <div class="flex flex-col text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-text-dark">{{ authStore.user?.username || 'User' }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Content Panel -->
      <div class="p-8">
        <!-- HeadlineText -->
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-text-dark">Welcome back, {{ authStore.user?.username || 'User' }}!</h1>
        <!-- BodyText -->
        <p class="mt-2 text-base font-normal text-gray-600 dark:text-gray-400">
          Here's a summary of your store's performance. Use the sidebar to manage products, users, and settings.
        </p>

        <!-- Stats Cards Section -->
        <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-border-dark dark:bg-panel-dark">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
              <span class="material-symbols-outlined text-xl text-green-500">trending_up</span>
            </div>
            <p class="mt-2 text-2xl font-bold text-gray-900 dark:text-text-dark">$45,231.89</p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">+20.1% from last month</p>
          </div>
          <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-border-dark dark:bg-panel-dark">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sales</p>
              <span class="material-symbols-outlined text-xl text-green-500">trending_up</span>
            </div>
            <p class="mt-2 text-2xl font-bold text-gray-900 dark:text-text-dark">+12,234</p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">+19% from last month</p>
          </div>
          <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-border-dark dark:bg-panel-dark">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">New Customers</p>
              <span class="material-symbols-outlined text-xl text-green-500">trending_up</span>
            </div>
            <p class="mt-2 text-2xl font-bold text-gray-900 dark:text-text-dark">+350</p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">+5 from yesterday</p>
          </div>
          <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-border-dark dark:bg-panel-dark">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Orders</p>
              <span class="material-symbols-outlined text-xl text-yellow-500">pending_actions</span>
            </div>
            <p class="mt-2 text-2xl font-bold text-gray-900 dark:text-text-dark">42</p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Requires attention</p>
          </div>
        </div>

        <!-- Recent Orders Table -->
        <div class="mt-8 flex flex-col">
          <h2 class="text-xl font-bold text-gray-900 dark:text-text-dark">Recent Orders</h2>
          <div class="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-border-dark dark:bg-panel-dark">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-border-dark">
                <thead class="bg-gray-50 dark:bg-white/5">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Order ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Customer</th>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Total</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-border-dark">
                  <tr>
                    <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-text-dark">#3066</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Liam Johnson</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">2024-05-22</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm">
                      <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 dark:bg-green-900/50 dark:text-green-300">Shipped</span>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">$250.00</td>
                  </tr>
                  <tr>
                    <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-text-dark">#3065</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Olivia Smith</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">2024-05-21</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm">
                      <span class="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">Processing</span>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">$150.00</td>
                  </tr>
                  <tr>
                    <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-text-dark">#3064</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Noah Williams</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">2024-05-21</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm">
                      <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 dark:bg-green-900/50 dark:text-green-300">Shipped</span>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">$350.00</td>
                  </tr>
                  <tr>
                    <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-text-dark">#3063</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Emma Brown</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">2024-05-20</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm">
                      <span class="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800 dark:bg-red-900/50 dark:text-red-300">Canceled</span>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">$75.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>