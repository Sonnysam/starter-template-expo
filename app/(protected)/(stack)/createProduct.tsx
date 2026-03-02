import React, { useState } from 'react';
import { View, Alert, Pressable } from 'react-native';
import { Image } from 'expo-image';
import {
  Host,
  Form,
  Section,
  TextField,
  Button,
  Text as SwiftText,
  HStack,
  VStack,
  Image as SwiftImage,
} from '@expo/ui/swift-ui';
import {
  buttonStyle,
  controlSize,
  tint,
  font,
  foregroundStyle,
} from '@expo/ui/swift-ui/modifiers';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Dropdown from '@/components/common/Dropdown';
import MainContainer from '@/components/common/MainContainer';
import { useTheme } from '@/constants/themeContext';
import { useCreateProduct } from '@/hooks/useProduct';

const productCategories = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Books & Stationery', value: 'books' },
  { label: 'Food & Drinks', value: 'food' },
  { label: 'Health & Beauty', value: 'health' },
  { label: 'Home & Living', value: 'home' },
  { label: 'Sports & Outdoors', value: 'sports' },
  { label: 'Other', value: 'other' },
];

const conditionOptions = [
  { label: 'Brand New', value: 'new' },
  { label: 'Like New', value: 'like_new' },
  { label: 'Fairly Used', value: 'used' },
];

const deliveryOptions = [
  { label: 'Campus Delivery', value: 'campus_delivery' },
  { label: 'Meetup', value: 'meetup' },
];

export default function ProductCreationScreen() {
  const router = useRouter();
  const { mode } = useTheme();
  const { mutate: createProduct, isPending } = useCreateProduct();

  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');

  const handlePickImage = async () => {
    if (images.length >= 5) {
      Alert.alert('Limit reached', 'You can add up to 5 images');
      return;
    }
    try {
      const ImagePicker = await import('expo-image-picker');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        quality: 0.8,
      });
      if (!result.canceled && result.assets[0]) {
        setImages((prev) => [...prev, result.assets[0].uri]);
      }
    } catch {
      Alert.alert('Error', 'Could not open image picker');
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Product name is required');
      return;
    }
    if (!price.trim()) {
      Alert.alert('Error', 'Price is required');
      return;
    }
    if (!category) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('category', category);
    formData.append('condition', condition);
    formData.append('price', price);
    formData.append('description', description.trim());
    formData.append('deliveryMethod', deliveryMethod);

    images.forEach((uri, index) => {
      const filename = uri.split('/').pop() || `image_${index}.jpg`;
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';
      formData.append('images', {
        uri,
        name: filename,
        type,
      } as unknown as Blob);
    });

    createProduct(formData, {
      onSuccess: () => {
        Alert.alert('Success', 'Product listed successfully!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      },
      onError: (error: Error) => {
        Alert.alert('Error', error.message || 'Failed to create product');
      },
    });
  };

  return (
    <MainContainer scrollable={false}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
        <Ionicons
          name="close"
          size={24}
          color={mode === 'dark' ? '#FFF' : '#101828'}
          onPress={() => router.back()}
        />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Host matchContents>
            <SwiftText modifiers={[font({ size: 18, weight: 'semibold' })]}>List Product</SwiftText>
          </Host>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <Host style={{ flex: 1 }}>
        <Form>
          {/* Product Photos */}
          <Section title="Product Photos">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingVertical: 8 }}>
              {images.map((uri, index) => (
                <View key={index} style={{ position: 'relative' }}>
                  <Image
                    source={{ uri }}
                    style={{ width: 72, height: 72, borderRadius: 10 }}
                    contentFit="cover"
                  />
                  <Pressable
                    style={{
                      position: 'absolute',
                      top: -4,
                      right: -4,
                      backgroundColor: '#EF4444',
                      borderRadius: 10,
                      width: 20,
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="close" size={12} color="#FFF" />
                  </Pressable>
                  {index === 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        alignItems: 'center',
                        paddingVertical: 2,
                      }}
                    >
                      <Host matchContents>
                        <SwiftText modifiers={[font({ size: 9, weight: 'bold' }), foregroundStyle('white')]}>
                          Cover
                        </SwiftText>
                      </Host>
                    </View>
                  )}
                </View>
              ))}
              {images.length < 5 && (
                <Button
                  label="Add Photo"
                  systemImage="plus"
                  modifiers={[buttonStyle('bordered')]}
                  onPress={handlePickImage}
                />
              )}
            </View>
          </Section>

          {/* Product Details */}
          <Section title="Product Details">
            <TextField
              placeholder="Product Name"
              defaultValue={name}
              onChangeText={setName}
              autocorrection={false}
            />
            <View>
              <Dropdown
                options={productCategories}
                selectedValue={category}
                placeholder="Select a category"
                onSelect={(opt: { value: string }) => setCategory(opt.value)}
              />
            </View>
            <View>
              <Dropdown
                options={conditionOptions}
                selectedValue={condition}
                placeholder="Select condition"
                onSelect={(opt: { value: string }) => setCondition(opt.value)}
              />
            </View>
            <TextField
              placeholder="Price (GHC)"
              defaultValue={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
            />
            <TextField
              placeholder="Describe your product..."
              defaultValue={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </Section>

          {/* Delivery */}
          <Section title="Delivery Option">
            {deliveryOptions.map((option) => (
              <Button
                key={option.value}
                modifiers={[
                  buttonStyle('plain'),
                  foregroundStyle(deliveryMethod === option.value ? 'blue' : 'gray'),
                ]}
                onPress={() => setDeliveryMethod(option.value)}
              >
                <HStack>
                  <SwiftImage
                    systemName={
                      deliveryMethod === option.value
                        ? 'checkmark.circle.fill'
                        : 'circle'
                    }
                  />
                  <SwiftText>{option.label}</SwiftText>
                </HStack>
              </Button>
            ))}
          </Section>

          {/* Submit */}
          <Section>
            <Button
              label={isPending ? 'Listing Product...' : 'List Product'}
              modifiers={[
                buttonStyle('borderedProminent'),
                controlSize('large'),
                tint('#155DFC'),
              ]}
              onPress={handleSubmit}
            />
          </Section>
        </Form>
      </Host>
    </MainContainer>
  );
}
