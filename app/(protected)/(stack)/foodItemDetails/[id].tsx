import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import {
  Host,
  Form,
  Section,
  Button,
  Toggle,
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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MainContainer from '@/components/common/MainContainer';
import { useTheme } from '@/constants/themeContext';
import { foodItemData } from '@/constants/tempData/foodItemData';

export default function FoodItemDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { mode } = useTheme();

  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<number>>(new Set());
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  const item = foodItemData;

  const toggleAddOn = (index: number) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const addOnsTotal = Array.from(selectedAddOns).reduce(
    (sum, i) => sum + (item.addOns[i]?.price ?? 0),
    0,
  );
  const sizeExtra = item.sizes[selectedSize]?.extraPrice ?? 0;
  const totalPrice = (item.basePrice + sizeExtra + addOnsTotal) * quantity;

  return (
    <MainContainer scrollable={false}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
        <Ionicons
          name="arrow-back"
          size={22}
          color={mode === 'dark' ? '#FFF' : '#101828'}
          onPress={() => router.back()}
        />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Host matchContents>
            <SwiftText modifiers={[font({ size: 18, weight: 'semibold' })]}>Food Details</SwiftText>
          </Host>
        </View>
        <View style={{ width: 22 }} />
      </View>

      <Host style={{ flex: 1 }}>
        <Form>
          {/* Image placeholder */}
          <Section>
            <VStack>
              <SwiftImage
                systemName="fork.knife.circle"
                modifiers={[foregroundStyle('#D1D5DB'), font({ size: 64 })]}
              />
            </VStack>
          </Section>

          {/* Food Info */}
          <Section>
            <SwiftText modifiers={[font({ size: 22, weight: 'bold' })]}>
              {item.name}
            </SwiftText>
            <HStack>
              <SwiftImage systemName="star.fill" modifiers={[foregroundStyle('#F59E0B'), font({ size: 14 })]} />
              <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 14 })]}>
                {item.rating} ({item.reviewCount} reviews)
              </SwiftText>
              <SwiftImage systemName="clock" modifiers={[foregroundStyle('gray'), font({ size: 14 })]} />
              <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 14 })]}>
                {item.prepTime}
              </SwiftText>
            </HStack>
            <SwiftText modifiers={[foregroundStyle('gray')]}>
              {item.description}
            </SwiftText>
            <SwiftText modifiers={[font({ size: 20, weight: 'bold' }), foregroundStyle('#155DFC')]}>
              GHC {item.basePrice.toFixed(2)}
            </SwiftText>
          </Section>

          {/* Size Selector */}
          <Section title="Choose Size">
            {item.sizes.map((size, i) => (
              <Button
                key={i}
                modifiers={[
                  buttonStyle('plain'),
                  foregroundStyle(selectedSize === i ? '#155DFC' : 'gray'),
                ]}
                onPress={() => setSelectedSize(i)}
              >
                <HStack>
                  <SwiftImage
                    systemName={selectedSize === i ? 'checkmark.circle.fill' : 'circle'}
                  />
                  <SwiftText>{size.label}</SwiftText>
                  <Spacer />
                  <SwiftText>+GHC {size.extraPrice.toFixed(2)}</SwiftText>
                </HStack>
              </Button>
            ))}
          </Section>

          {/* Add-ons */}
          <Section title="Add-ons">
            {item.addOns.map((addon, i) => (
              <Button
                key={i}
                modifiers={[
                  buttonStyle('plain'),
                  foregroundStyle(selectedAddOns.has(i) ? '#155DFC' : 'gray'),
                ]}
                onPress={() => toggleAddOn(i)}
              >
                <HStack>
                  <SwiftImage
                    systemName={selectedAddOns.has(i) ? 'checkmark.square.fill' : 'square'}
                  />
                  <SwiftText>{addon.name}</SwiftText>
                  <Spacer />
                  <SwiftText>+GHC {addon.price.toFixed(2)}</SwiftText>
                </HStack>
              </Button>
            ))}
          </Section>

          {/* Special Instructions */}
          <Section title="Special Instructions">
            <View>
              <TextInput
                style={{
                  minHeight: 60,
                  fontSize: 15,
                  color: mode === 'dark' ? '#FFF' : '#101828',
                  textAlignVertical: 'top',
                }}
                placeholder="e.g. No onions, extra spicy..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
                value={specialInstructions}
                onChangeText={setSpecialInstructions}
              />
            </View>
          </Section>

          {/* Quantity */}
          <Section title="Quantity">
            <HStack>
              <Button
                label="-"
                modifiers={[buttonStyle('bordered'), controlSize('regular')]}
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
              />
              <SwiftText modifiers={[font({ size: 18, weight: 'semibold' })]}>{quantity}</SwiftText>
              <Button
                label="+"
                modifiers={[buttonStyle('borderedProminent'), controlSize('regular'), tint('#155DFC')]}
                onPress={() => setQuantity((q) => q + 1)}
              />
            </HStack>
          </Section>

          {/* Cart Footer */}
          <Section>
            <HStack>
              <VStack>
                <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 13 })]}>Total</SwiftText>
                <SwiftText modifiers={[font({ size: 22, weight: 'bold' }), foregroundStyle('#155DFC')]}>
                  GHC {totalPrice.toFixed(2)}
                </SwiftText>
              </VStack>
              <Spacer />
              <Button
                modifiers={[
                  buttonStyle('borderedProminent'),
                  controlSize('large'),
                  tint('#155DFC'),
                ]}
                onPress={() => router.back()}
              >
                <HStack>
                  <SwiftImage systemName="cart.badge.plus" />
                  <SwiftText>Add to Cart</SwiftText>
                </HStack>
              </Button>
            </HStack>
          </Section>
        </Form>
      </Host>
    </MainContainer>
  );
}
