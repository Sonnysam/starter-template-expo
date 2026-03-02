import { QueryClient } from '@tanstack/react-query';

export const QUERY_KEYS = {
  AUTH_STATUS: ['auth', 'status'],
  USER_PROFILE: ['user', 'profile'],
  CONVERSATIONS: ['conversations'],
  PRODUCTS: ['products'],
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
