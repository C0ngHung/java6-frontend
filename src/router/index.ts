import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: false, layout: 'default' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { requiresAuth: false, layout: 'auth' },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/SignUpView.vue'),
    meta: { requiresAuth: false, layout: 'auth' },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/auth/ForgotPasswordView.vue'),
    meta: { requiresAuth: false, layout: 'auth' },
  },
  {
    path: '/password-reset',
    name: 'PasswordReset',
    component: () => import('@/views/auth/PasswordResetView.vue'),
    meta: { requiresAuth: false, layout: 'auth' },
  },
  {
    path: '/otp-verification',
    name: 'OtpVerification',
    component: () => import('@/views/auth/OtpVerificationView.vue'),
    meta: { requiresAuth: false, layout: 'auth' },
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/ProductsView.vue'),
    meta: { requiresAuth: false, layout: 'default' },
  },
  {
    path: '/products/:slug',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetailView.vue'),
    meta: { requiresAuth: false, layout: 'default' },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/CartView.vue'),
    meta: { requiresAuth: false, layout: 'default' },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/CheckoutView.vue'),
    meta: { requiresAuth: true, layout: 'default' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true, layout: 'default' },
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/views/AccountView.vue'),
    meta: { requiresAuth: true, layout: 'default' },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/OrdersView.vue'),
    meta: { requiresAuth: true, layout: 'default' },
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('@/views/admin/AdminDashboardView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'default' },
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: () => import('@/views/admin/ProductManagementView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'default' },
  },
  {
    path: '/admin/products/new',
    name: 'AdminProductCreate',
    component: () => import('@/views/admin/ProductFormView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'default' },
  },
  {
    path: '/admin/products/:id/edit',
    name: 'AdminProductEdit',
    component: () => import('@/views/admin/ProductFormView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'default' },
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/views/LogoutView.vue'),
    meta: { requiresAuth: false, layout: 'default' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { layout: 'default' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Initialize auth state from localStorage if needed
  if (!authStore.user && authStore.accessToken) {
    authStore.initAuth();
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login with return URL
    next({ name: 'Login', query: { redirect: to.fullPath } });
    return;
  }

  // Check if route requires admin role
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    // Redirect non-admin users away from admin routes
    next({ name: 'Home' });
    return;
  }

  // Redirect authenticated users away from login/register pages
  if ((to.name === 'Login' || to.name === 'Register') && authStore.isAuthenticated) {
    const redirect = (to.query.redirect as string) || '/dashboard';
    next(redirect);
    return;
  }

  next();
});

export default router;

