import { useMutation } from '@tanstack/react-query';
import authServices from '@/services/authServices';
import useAuthStore from '@/store/auth';
import { saveTokens, saveUser } from '@/utils/storage';

interface AuthPayload {
  user: Record<string, unknown> | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const extractTokenFromCookieHeader = (cookieHeaderValue: string): string | null => {
  if (!cookieHeaderValue || typeof cookieHeaderValue !== 'string') {
    return null;
  }

  const tokenMatch = cookieHeaderValue.match(
    /(?:^|;\s*)(?:access_token|access|jwt|token)=([^;]+)/i,
  );

  if (tokenMatch) {
    return decodeURIComponent(tokenMatch[1]);
  }

  return null;
};

const extractAccessTokenFromHeaders = (
  headers: Record<string, unknown>,
): string | null => {
  if (!headers || typeof headers !== 'object') {
    return null;
  }

  const setCookieHeader =
    (headers['set-cookie'] as string | string[]) ||
    (headers['Set-Cookie'] as string | string[]);

  if (Array.isArray(setCookieHeader)) {
    for (const cookie of setCookieHeader) {
      const token = extractTokenFromCookieHeader(cookie);
      if (token) return token;
    }
    return null;
  }

  if (typeof setCookieHeader === 'string') {
    return extractTokenFromCookieHeader(setCookieHeader);
  }

  return null;
};

/**
 * Extracts user, accessToken, and refreshToken from the API response.
 *
 * NOTE: The Axios response interceptor in `config/api.ts` already unwraps
 * `response.data`, so `data` here is the server payload directly — NOT the
 * full Axios response. Header-based token extraction is kept as a fallback
 * for any edge case where the full response leaks through.
 */
const extractAuthPayload = (data: Record<string, unknown>): AuthPayload => {
  // data is already the unwrapped payload (response.data) thanks to the interceptor.
  // Fall back to data.data if the server nests further.
  const payload = (data?.data ?? data ?? {}) as Record<string, unknown>;
  const headers = (data?.headers ?? {}) as Record<string, unknown>;
  const tokenContainer = (payload?.tokens ?? payload?.token ?? {}) as Record<
    string,
    unknown
  >;

  const accessTokenFromCookie = extractAccessTokenFromHeaders(headers);

  const accessToken =
    accessTokenFromCookie ||
    (payload?.access as string) ||
    (payload?.access_token as string) ||
    (payload?.token as string) ||
    (payload?.jwt as string) ||
    (tokenContainer?.access as string) ||
    (tokenContainer?.access_token as string) ||
    (tokenContainer?.token as string) ||
    (tokenContainer?.jwt as string) ||
    null;

  const refreshToken =
    (payload?.refresh as string) ||
    (payload?.refresh_token as string) ||
    (tokenContainer?.refresh as string) ||
    (tokenContainer?.refresh_token as string) ||
    null;

  const nestedData = payload?.data as Record<string, unknown> | undefined;
  const user = (nestedData?.user ?? payload?.user ?? null) as Record<
    string,
    unknown
  > | null;

  return { user, accessToken, refreshToken };
};

const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authServices.register,
    onSuccess: async (data: Record<string, unknown>) => {
      const { user, accessToken, refreshToken } = extractAuthPayload(data);

      if (accessToken) {
        await saveTokens(accessToken, refreshToken || '');
      }

      if (user) {
        await saveUser(user);
        await setAuth(user as Parameters<typeof setAuth>[0]);
      }
    },
  });
};

const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (credentials: Parameters<typeof authServices.login>[0]) => {
      const data = await authServices.login(credentials);
      const result = data as Record<string, unknown>;
      const { user, accessToken, refreshToken } = extractAuthPayload(result);

      if (!user) {
        throw new Error('No user data in response');
      }

      if (!accessToken) {
        throw new Error('Login succeeded but no access token was returned.');
      }

      return { user, accessToken, refreshToken };
    },
    onSuccess: async ({ user, accessToken, refreshToken }) => {
      await saveTokens(accessToken!, refreshToken || '');
      await saveUser(user!);
      await setAuth(user as Parameters<typeof setAuth>[0]);
    },
  });
};

const useUploadAvatar = () => {
  const updateAvatar = useAuthStore((state) => state.updateAvatar);

  return useMutation({
    mutationFn: authServices.uploadAvatar,
    onSuccess: (data: Record<string, unknown>) => {
      const avatarUrl =
        (data?.avatarUrl as string) || (data?.avatar_url as string) || '';
      if (avatarUrl) {
        updateAvatar(avatarUrl);
      }
    },
  });
};

export { useRegister, useLogin, useUploadAvatar };

export default {
  useRegister,
  useLogin,
  useUploadAvatar,
};
