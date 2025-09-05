import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, AuthActions } from '@/interfaces/auth';

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),

      clearError: () => set({ error: null }),

      login: (email: string, password: string) => {
        console.log('Login called with:', { email, password });
        set({
          isAuthenticated: true,
          user: {
            id: '1',
            email,
            name: 'User',
          },
        });
      },

      register: (name: string, email: string, password: string) => {
        console.log('Register called with:', { name, email, password });
        set({
          isAuthenticated: true,
          user: {
            id: '1',
            email,
            name,
          },
        });
      },

      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
