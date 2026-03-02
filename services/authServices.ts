import api from '@/config/api';

const register = async (userData: Record<string, unknown>) => {
  const response = await api.post('/auth/register/', userData);
  return response;
};

const login = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/auth/login/', credentials);
  return response;
};

const verifyEmail = async (data: Record<string, unknown>) => {
  const response = await api.post('/auth/verify-email/', data);
  return response;
};

const logout = async (logoutData?: Record<string, unknown>) => {
  const response = await api.post('/auth/logout/', logoutData);
  return response;
};

const resendVerification = async () => {
  const response = await api.post('/auth/resend-verification/');
  return response;
};

const forgotPassword = async (email: string) => {
  const response = await api.post('/auth/forgot-password/', { email });
  return response;
};

const resetPassword = async (data: Record<string, unknown>) => {
  const response = await api.post('/auth/reset-password/', data);
  return response;
};

const checkAuthStatus = async () => {
  const response = await api.get('/auth/check-status');
  return response;
};

const uploadAvatar = async (imageUri: string) => {
  const formData = new FormData();
  formData.append('avatar', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'avatar.jpg',
  } as unknown as Blob);

  const response = await api.post('/users/me/avatar/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export default {
  register,
  login,
  verifyEmail,
  logout,
  resendVerification,
  forgotPassword,
  uploadAvatar,
  resetPassword,
  checkAuthStatus,
};
