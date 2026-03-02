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
  Spacer,
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

const storeCategories = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Books & Stationery', value: 'books' },
  { label: 'Food & Drinks', value: 'food' },
  { label: 'Health & Beauty', value: 'health' },
  { label: 'Services', value: 'services' },
];

export default function StoreCreationScreen() {
  const router = useRouter();
  const { mode } = useTheme();

  const [storeName, setStoreName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [logoUri, setLogoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePickLogo = async () => {
    try {
      const ImagePicker = await import('expo-image-picker');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled && result.assets[0]) {
        setLogoUri(result.assets[0].uri);
      }
    } catch {
      Alert.alert('Error', 'Could not open image picker');
    }
  };

  const handleCreate = () => {
    if (!storeName.trim()) {
      Alert.alert('Error', 'Please enter a store name');
      return;
    }
    if (!category) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    setLoading(true);
    // TODO: API call to create store
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Your store has been created!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }, 1500);
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
            <SwiftText modifiers={[font({ size: 18, weight: 'semibold' })]}>Create Store</SwiftText>
          </Host>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <Host style={{ flex: 1 }}>
        <Form>
          {/* Store Logo */}
          <Section title="Store Logo">
            <Pressable onPress={handlePickLogo}>
              <View style={{ alignItems: 'center', paddingVertical: 12 }}>
                {logoUri ? (
                  <Image
                    source={{ uri: logoUri }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                    contentFit="cover"
                  />
                ) : (
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      backgroundColor: '#F3F4F6',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons name="camera-outline" size={32} color="#9CA3AF" />
                  </View>
                )}
              </View>
            </Pressable>
            <Button
              label="Choose Logo"
              systemImage="photo"
              modifiers={[buttonStyle('bordered')]}
              onPress={handlePickLogo}
            />
          </Section>

          {/* Store Details */}
          <Section title="Store Details">
            <TextField
              placeholder="Store Name"
              defaultValue={storeName}
              onChangeText={setStoreName}
              autocorrection={false}
            />
            <View>
              <Dropdown
                options={storeCategories}
                selectedValue={category}
                placeholder="Select a category"
                onSelect={(opt: { value: string }) => setCategory(opt.value)}
              />
            </View>
            <TextField
              placeholder="Tell customers about your store..."
              defaultValue={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </Section>

          {/* Subscription Info */}
          <Section title="Store Subscription">
            <HStack>
              <SwiftImage systemName="sparkles" modifiers={[foregroundStyle('#F59E0B')]} />
              <SwiftText modifiers={[font({ weight: 'semibold' })]}>GHC 25 per semester</SwiftText>
            </HStack>
            <VStack>
              <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 14 })]}>
                Full access to seller tools, analytics, and customer support.
              </SwiftText>
            </VStack>
            {['Product listings', 'Order management', 'Analytics dashboard', 'Customer chat'].map(
              (feature) => (
                <HStack key={feature}>
                  <SwiftImage systemName="checkmark.circle.fill" modifiers={[foregroundStyle('#10B981')]} />
                  <SwiftText>{feature}</SwiftText>
                </HStack>
              ),
            )}
          </Section>

          {/* Submit */}
          <Section>
            <Button
              label={loading ? 'Creating Store...' : 'Create Store — GHC 25'}
              modifiers={[
                buttonStyle('borderedProminent'),
                controlSize('large'),
                tint('#155DFC'),
              ]}
              onPress={handleCreate}
            />
          </Section>
        </Form>
      </Host>
    </MainContainer>
  );
}
