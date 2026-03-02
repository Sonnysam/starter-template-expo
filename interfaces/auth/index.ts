export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  university?: string;
  campus?: string;
  phone?: string;
  [key: string]: unknown;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface AuthActions {
  setAuth: (user: User) => Promise<void>;
  updateAvatar: (avatarUrl: string) => void;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}
