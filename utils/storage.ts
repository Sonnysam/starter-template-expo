import * as SecureStore from 'expo-secure-store';

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
};

export const saveTokens = async (accessToken: string, refreshToken: string): Promise<void> => {
  await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

export const getTokens = async (): Promise<{
  accessToken: string | null;
  refreshToken: string | null;
}> => {
  try {
    const accessToken = await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
    const refreshToken = await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
    return { accessToken, refreshToken };
  } catch {
    return { accessToken: null, refreshToken: null };
  }
};

export const removeTokens = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
  await SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
};

export const saveUser = async (userData: Record<string, unknown>): Promise<void> => {
  const userString = JSON.stringify(userData);
  await SecureStore.setItemAsync(STORAGE_KEYS.USER_DATA, userString);
};

export const getUser = async (): Promise<Record<string, unknown> | null> => {
  try {
    const userString = await SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA);
    return userString ? JSON.parse(userString) : null;
  } catch {
    return null;
  }
};

export const removeUser = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA);
};

export const clearAllAuthData = async (): Promise<void> => {
  await removeTokens();
  await removeUser();
};

export default {
  saveTokens,
  getTokens,
  removeTokens,
  saveUser,
  getUser,
  removeUser,
  clearAllAuthData,
};
