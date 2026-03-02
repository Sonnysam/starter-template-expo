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
import { useCreateRestaurant } from '@/hooks/useRestaurant';

interface RestaurantFormData {
  name: string;
  cuisineType: string;
  description: string;
  imageUri: string;
  address: string;
  phone: string;
  university: string;
  operatingHours: string;
  deliveryFee: string;
  minimumOrder: string;
  estimatedDeliveryTime: string;
}

/* ---- Progress Indicator ---- */
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <Host matchContents>
      <HStack>
        <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 13 })]}>
          Step {current} of {total}
        </SwiftText>
      </HStack>
    </Host>
  );
}

/* ---- Screen 1: Basic Info ---- */
function ScreenOne({
  data,
  onChange,
}: {
  data: RestaurantFormData;
  onChange: (key: string, val: string) => void;
}) {
  const handlePickImage = async () => {
    try {
      const ImagePicker = await import('expo-image-picker');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });
      if (!result.canceled && result.assets[0]) {
        onChange('imageUri', result.assets[0].uri);
      }
    } catch {
      Alert.alert('Error', 'Could not open image picker');
    }
  };

  return (
    <>
      <Section title="Cover Photo">
        <Pressable onPress={handlePickImage}>
          <View style={{ alignItems: 'center', paddingVertical: 8 }}>
            {data.imageUri ? (
              <Image
                source={{ uri: data.imageUri }}
                style={{ width: '100%', height: 140, borderRadius: 10 }}
                contentFit="cover"
              />
            ) : (
              <View
                style={{
                  width: '100%',
                  height: 140,
                  borderRadius: 10,
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
          label="Choose Photo"
          systemImage="photo"
          modifiers={[buttonStyle('bordered')]}
          onPress={handlePickImage}
        />
      </Section>

      <Section title="Basic Information">
        <TextField
          placeholder="Restaurant Name"
          defaultValue={data.name}
          onChangeText={(v: string) => onChange('name', v)}
          autocorrection={false}
        />
        <View>
          <Dropdown
            options={[
              { label: 'Ghanaian', value: 'ghanaian' },
              { label: 'Chinese', value: 'chinese' },
              { label: 'Continental', value: 'continental' },
              { label: 'Fast Food', value: 'fast_food' },
              { label: 'Beverages', value: 'beverages' },
            ]}
            selectedValue={data.cuisineType}
            placeholder="Select cuisine type"
            onSelect={(opt: { value: string }) => onChange('cuisineType', opt.value)}
          />
        </View>
        <TextField
          placeholder="Describe your restaurant..."
          defaultValue={data.description}
          onChangeText={(v: string) => onChange('description', v)}
          multiline
          numberOfLines={3}
        />
      </Section>
    </>
  );
}

/* ---- Screen 2: Location & Contact ---- */
function ScreenTwo({
  data,
  onChange,
}: {
  data: RestaurantFormData;
  onChange: (key: string, val: string) => void;
}) {
  return (
    <Section title="Location & Contact">
      <TextField
        placeholder="Address (e.g. Near Republic Hall, KNUST)"
        defaultValue={data.address}
        onChangeText={(v: string) => onChange('address', v)}
      />
      <TextField
        placeholder="Phone Number"
        defaultValue={data.phone}
        onChangeText={(v: string) => onChange('phone', v)}
        keyboardType="phone-pad"
      />
      <View>
        <Dropdown
          options={[
            { label: 'KNUST', value: 'knust' },
            { label: 'UG', value: 'ug' },
            { label: 'UCC', value: 'ucc' },
          ]}
          selectedValue={data.university}
          placeholder="Select university"
          onSelect={(opt: { value: string }) => onChange('university', opt.value)}
        />
      </View>
      <TextField
        placeholder="Operating Hours (e.g. 8:00 AM - 10:00 PM)"
        defaultValue={data.operatingHours}
        onChangeText={(v: string) => onChange('operatingHours', v)}
      />
    </Section>
  );
}

/* ---- Screen 3: Delivery Settings ---- */
function ScreenThree({
  data,
  onChange,
}: {
  data: RestaurantFormData;
  onChange: (key: string, val: string) => void;
}) {
  return (
    <>
      <Section title="Delivery Settings">
        <TextField
          placeholder="Delivery Fee (GHC)"
          defaultValue={data.deliveryFee}
          onChangeText={(v: string) => onChange('deliveryFee', v)}
          keyboardType="decimal-pad"
        />
        <TextField
          placeholder="Minimum Order (GHC)"
          defaultValue={data.minimumOrder}
          onChangeText={(v: string) => onChange('minimumOrder', v)}
          keyboardType="decimal-pad"
        />
        <TextField
          placeholder="Estimated Delivery Time (e.g. 20-30 mins)"
          defaultValue={data.estimatedDeliveryTime}
          onChangeText={(v: string) => onChange('estimatedDeliveryTime', v)}
        />
      </Section>
      <Section>
        <HStack>
          <SwiftImage systemName="info.circle.fill" modifiers={[foregroundStyle('#155DFC')]} />
          <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 13 })]}>
            Delivery is limited to campus and surrounding areas within 2km.
          </SwiftText>
        </HStack>
      </Section>
    </>
  );
}

/* ---- Main Screen ---- */
export default function RestaurantCreationScreen() {
  const router = useRouter();
  const { mode } = useTheme();
  const { mutate: createRestaurant, isPending } = useCreateRestaurant();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState<RestaurantFormData>({
    name: '',
    cuisineType: '',
    description: '',
    imageUri: '',
    address: '',
    phone: '',
    university: '',
    operatingHours: '',
    deliveryFee: '',
    minimumOrder: '',
    estimatedDeliveryTime: '',
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    } else {
      router.back();
    }
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Restaurant name is required');
      return;
    }

    createRestaurant(formData, {
      onSuccess: () => {
        Alert.alert('Success', 'Restaurant created successfully!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      },
      onError: (error: Error) => {
        Alert.alert('Error', error.message || 'Failed to create restaurant');
      },
    });
  };

  const renderScreen = () => {
    switch (currentStep) {
      case 1:
        return <ScreenOne data={formData} onChange={handleChange} />;
      case 2:
        return <ScreenTwo data={formData} onChange={handleChange} />;
      case 3:
        return <ScreenThree data={formData} onChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <MainContainer scrollable={false}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
        <Ionicons
          name={currentStep === 1 ? 'close' : 'arrow-back'}
          size={24}
          color={mode === 'dark' ? '#FFF' : '#101828'}
          onPress={handleBack}
        />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Host matchContents>
            <SwiftText modifiers={[font({ size: 18, weight: 'semibold' })]}>Create Restaurant</SwiftText>
          </Host>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <ProgressBar current={currentStep} total={totalSteps} />
        <View
          style={{
            height: 4,
            backgroundColor: '#E5E7EB',
            borderRadius: 2,
            marginTop: 6,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: '100%',
              width: `${(currentStep / totalSteps) * 100}%`,
              backgroundColor: '#155DFC',
              borderRadius: 2,
            }}
          />
        </View>
      </View>

      <Host style={{ flex: 1 }}>
        <Form>
          {renderScreen()}

          {/* Navigation Buttons */}
          <Section>
            {currentStep > 1 && (
              <Button
                label="Back"
                modifiers={[buttonStyle('bordered'), controlSize('large')]}
                onPress={handleBack}
              />
            )}
            <Button
              label={
                isPending
                  ? 'Creating...'
                  : currentStep === totalSteps
                    ? 'Create Restaurant'
                    : 'Next'
              }
              modifiers={[
                buttonStyle('borderedProminent'),
                controlSize('large'),
                tint('#155DFC'),
              ]}
              onPress={handleNext}
            />
          </Section>
        </Form>
      </Host>
    </MainContainer>
  );
}
