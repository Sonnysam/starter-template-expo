import { useMutation } from '@tanstack/react-query';
import createRestaurant from '@/services/restaurantServices';

const useCreateRestaurant = () => {
  return useMutation({
    mutationFn: createRestaurant,
  });
};

export { useCreateRestaurant };
export default useCreateRestaurant;
