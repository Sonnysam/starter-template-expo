import { create } from 'zustand';
import { AuthState, AuthActions, User } from '@/interfaces/auth';
import { clearAllAuthData, getTokens, getUser } from '@/utils/storage';

const useAuthStore = create<AuthState & AuthActions>()((set) => ({
  user: null,
  isAuthenticated: false,

  setAuth: async (user) => {
    set({
      user,
      isAuthenticated: true,
    });
  },

  updateAvatar: (avatarUrl: string) => {
    set((state) => ({
      user: state.user ? { ...state.user, avatarUrl } : null,
    }));
  },

  logout: async () => {
    await clearAllAuthData();
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  hydrate: async () => {
    try {
      const { accessToken } = await getTokens();
      const userData = await getUser();

      if (accessToken && userData) {
        set({
          user: userData as User,
          isAuthenticated: true,
        });
      }
    } catch {
      // Hydration failed — user stays as guest
    }
  },
}));

export default useAuthStore;
