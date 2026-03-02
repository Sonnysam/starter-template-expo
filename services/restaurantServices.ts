import api from '@/config/api';

const createRestaurant = async (restaurantData: Record<string, unknown>) => {
  const response = await api.post('/restaurants/', restaurantData);
  return response;
};

export default createRestaurant;
