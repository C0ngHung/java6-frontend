import { useRouter } from 'vue-router';

export const useNavigation = () => {
  const router = useRouter();

  const navigateToSearch = (query: string) => {
    if (query.trim()) {
      router.push({ path: '/products', query: { search: query } });
    }
  };

  return {
    navigateToSearch,
  };
};

