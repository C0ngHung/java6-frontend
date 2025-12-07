import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';

export interface UseNavigationReturn {
  navigateToSearch: (query: string) => void;
}

const PRODUCTS_PATH = '/products';
const SEARCH_QUERY_PARAM = 'search';

export const useNavigation = (): UseNavigationReturn => {
  const router: Router = useRouter();

  const navigateToSearch = (query: string): void => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }

    router.push({
      path: PRODUCTS_PATH,
      query: { [SEARCH_QUERY_PARAM]: trimmedQuery },
    });
  };

  return {
    navigateToSearch,
  };
};

