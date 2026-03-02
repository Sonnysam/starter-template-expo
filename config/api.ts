import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const { getTokens } = await import('@/utils/storage');
  const { accessToken } = await getTokens();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;

    let message = 'An unexpected error occurred. Please try again.';

    if (status === 401) {
      message = 'Session expired. Please login again.';
    } else if (status === 403) {
      message = 'You do not have permission to perform this action.';
    } else if (status === 404) {
      message = 'Resource not found.';
    } else if (status === 422 || status === 400) {
      message = data?.message || data?.detail || 'Invalid request data.';
    } else if (status >= 500) {
      message = 'Server error. Please try again later.';
    } else if (data?.message) {
      message = data.message;
    }

    return Promise.reject(message);
  },
);

export { API_BASE_URL };
export default api;
