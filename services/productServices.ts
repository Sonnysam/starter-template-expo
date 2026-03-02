import api from '@/config/api';

interface ProductData {
  images?: string[];
  [key: string]: unknown;
}

const createProduct = async (productData: ProductData) => {
  const hasLocalImages =
    Array.isArray(productData.images) &&
    productData.images.some(
      (imageUri) => typeof imageUri === 'string' && imageUri.startsWith('file:'),
    );

  if (!hasLocalImages) {
    const response = await api.post('/products/', productData);
    return response;
  }

  const formData = new FormData();

  Object.entries(productData).forEach(([key, value]) => {
    if (key === 'images' || value === undefined || value === null) {
      return;
    }
    formData.append(key, String(value));
  });

  productData.images?.forEach((imageUri, index) => {
    if (typeof imageUri !== 'string' || !imageUri) {
      return;
    }

    const fileExtension = imageUri.split('.').pop()?.toLowerCase();
    const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';

    formData.append('images', {
      uri: imageUri,
      name: `product-image-${index}.${fileExtension === 'png' ? 'png' : 'jpg'}`,
      type: mimeType,
    } as unknown as Blob);
  });

  const response = await api.post('/products/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export default createProduct;
