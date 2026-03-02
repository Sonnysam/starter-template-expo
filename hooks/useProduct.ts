import { useMutation } from '@tanstack/react-query';
import createProduct from '@/services/productServices';

const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
  });
};

export { useCreateProduct };
export default useCreateProduct;
