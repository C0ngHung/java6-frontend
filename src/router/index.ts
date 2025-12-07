import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router';
import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

interface CustomRouteMeta extends RouteMeta {
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
  layout?: string;
}

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
    path: '/admin/orders',
    name: 'AdminOrders',
    component: () => import('@/views/admin/OrdersManagementView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'default' },
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: () => import('@/views/admin/ProductManagementView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'default' },
  },
  {
    path: '/admin/products/create',
    name: 'AdminProductCreate',
    component: () => import('@/views/admin/ProductFormView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'default' },
  },
  {
    path: '/admin/products/:id/update',
    name: 'AdminProductEdit',
    component: () => import('@/views/admin/ProductFormView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'default' },
  },
  {
    path: '/admin/categories',
    name: 'AdminCategories',
    component: () => import('@/views/admin/CategoryManagementView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'default' },
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: () => import('@/views/admin/UsersManagementView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, layout: 'default' },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { requiresAuth: false, layout: 'default' },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { requiresAuth: false, layout: 'default' },
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

const DEFAULT_REDIRECT_PATH = '/account';
const ROUTE_NAMES = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  HOME: 'Home',
} as const;

const initializeAuthIfNeeded = (authStore: ReturnType<typeof useAuthStore>): void => {
  if (!authStore.user && authStore.accessToken) {
    authStore.initAuth();
  }
};

const handleUnauthenticatedAccess = (
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
  authStore: ReturnType<typeof useAuthStore>
): boolean => {
  const meta = to.meta as CustomRouteMeta;
  if (meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: ROUTE_NAMES.LOGIN, query: { redirect: to.fullPath } });
    return true;
  }
  return false;
};

const handleUnauthorizedAccess = (
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
  authStore: ReturnType<typeof useAuthStore>
): boolean => {
  const meta = to.meta as CustomRouteMeta;
  if (meta.requiresAdmin && !authStore.isAdmin) {
    next({ name: ROUTE_NAMES.HOME });
    return true;
  }
  return false;
};

const handleAuthenticatedUserRedirect = (
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
  authStore: ReturnType<typeof useAuthStore>
): boolean => {
  if ((to.name === ROUTE_NAMES.LOGIN || to.name === ROUTE_NAMES.REGISTER) && authStore.isAuthenticated) {
    const redirect = (to.query.redirect as string) || DEFAULT_REDIRECT_PATH;
    next(redirect);
    return true;
  }
  return false;
};

router.beforeEach((to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const authStore = useAuthStore();

  initializeAuthIfNeeded(authStore);

  if (handleUnauthenticatedAccess(to, next, authStore)) {
    return;
  }

  if (handleUnauthorizedAccess(to, next, authStore)) {
    return;
  }

  if (handleAuthenticatedUserRedirect(to, next, authStore)) {
    return;
  }

  next();
});

export default router;

