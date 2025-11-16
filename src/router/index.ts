import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
import AuthLayout from '@/components/layouts/AuthLayout.vue';

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
    path: '/signup',
    name: 'SignUp',
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
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true, layout: 'default' },
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('@/views/admin/AdminDashboardView.vue'),
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

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } else if ((to.name === 'Login' || to.name === 'Register') && authStore.isAuthenticated) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router;

