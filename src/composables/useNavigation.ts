import { useRouter } from 'vue-router';

export const useNavigation = () => {
  const router = useRouter();

  const navigateToSearch = (query: string) => {
    if (query.trim()) {
      router.push({ path: '/products', query: { search: query } });
    }
  };

  const navigateToLogin = (redirect?: string) => {
    router.push({
      name: 'Login',
      query: redirect ? { redirect } : undefined,
    });
  };

  const navigateToRegister = () => {
    router.push({ name: 'Register' });
  };

  const navigateToDashboard = () => {
    router.push({ name: 'Dashboard' });
  };

  return {
    navigateToSearch,
    navigateToLogin,
    navigateToRegister,
    navigateToDashboard,
  };
};

