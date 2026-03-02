import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Host,
  Form,
  Section,
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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MainContainer from '@/components/common/MainContainer';
import { useTheme } from '@/constants/themeContext';

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { mode } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);

  const product = {
    id: id ?? '1',
    name: 'Wireless Bluetooth Earbuds',
    description:
      'High-quality wireless earbuds with noise cancellation. Perfect for campus life — great for lectures, study sessions, and commuting. Long battery life and comfortable fit.',
    price: 120.0,
    originalPrice: 150.0,
    images: [],
    rating: 4.5,
    reviewCount: 28,
    seller: {
      name: 'Tech Hub Store',
      avatar: null,
      university: 'KNUST',
      rating: 4.8,
      totalSales: 156,
      verified: true,
    },
    condition: 'New',
    category: 'Electronics',
    deliveryOptions: ['Campus Delivery', 'Meetup'],
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  return (
    <MainContainer scrollable={false}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
        <Ionicons
          name="arrow-back"
          size={22}
          color={mode === 'dark' ? '#FFF' : '#101828'}
          onPress={() => router.back()}
        />
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Ionicons name="share-outline" size={22} color={mode === 'dark' ? '#FFF' : '#101828'} />
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={22}
            color={isFavorite ? '#EF4444' : mode === 'dark' ? '#FFF' : '#101828'}
            onPress={() => setIsFavorite(!isFavorite)}
          />
        </View>
      </View>

      <Host style={{ flex: 1 }}>
        <Form>
          {/* Image Placeholder */}
          <Section>
            <VStack>
              <SwiftImage
                systemName="photo"
                modifiers={[foregroundStyle('#D1D5DB'), font({ size: 64 })]}
              />
              <SwiftText modifiers={[foregroundStyle('gray')]}>Product Image</SwiftText>
              {discount > 0 && (
                <SwiftText modifiers={[foregroundStyle('#EF4444'), font({ weight: 'bold' })]}>
                  -{discount}%
                </SwiftText>
              )}
            </VStack>
          </Section>

          {/* Product Info */}
          <Section>
            <HStack>
              <SwiftText modifiers={[foregroundStyle('#155DFC'), font({ size: 12, weight: 'medium' })]}>
                {product.category}
              </SwiftText>
              <SwiftText modifiers={[foregroundStyle('#155DFC'), font({ size: 12, weight: 'medium' })]}>
                {product.condition}
              </SwiftText>
            </HStack>
            <SwiftText modifiers={[font({ size: 20, weight: 'bold' })]}>
              {product.name}
            </SwiftText>
            <HStack>
              <SwiftText modifiers={[font({ size: 22, weight: 'bold' }), foregroundStyle('#155DFC')]}>
                GHC {product.price.toFixed(2)}
              </SwiftText>
              {product.originalPrice > product.price && (
                <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 16 })]}>
                  GHC {product.originalPrice.toFixed(2)}
                </SwiftText>
              )}
            </HStack>
            <HStack>
              <SwiftImage systemName="star.fill" modifiers={[foregroundStyle('#F59E0B'), font({ size: 14 })]} />
              <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 14 })]}>
                {product.rating} ({product.reviewCount} reviews)
              </SwiftText>
            </HStack>
          </Section>

          {/* Description */}
          <Section title="Description">
            <SwiftText modifiers={[foregroundStyle('gray')]}>
              {product.description}
            </SwiftText>
          </Section>

          {/* Delivery Options */}
          <Section title="Delivery Options">
            {product.deliveryOptions.map((opt) => (
              <HStack key={opt}>
                <SwiftImage
                  systemName={opt.includes('Campus') ? 'bicycle' : 'mappin.and.ellipse'}
                  modifiers={[foregroundStyle('#155DFC')]}
                />
                <SwiftText>{opt}</SwiftText>
              </HStack>
            ))}
          </Section>

          {/* Seller */}
          <Section title="Seller">
            <HStack>
              <SwiftImage systemName="person.circle.fill" modifiers={[font({ size: 36 }), foregroundStyle('#D1D5DB')]} />
              <VStack>
                <HStack>
                  <SwiftText modifiers={[font({ weight: 'semibold' })]}>{product.seller.name}</SwiftText>
                  {product.seller.verified && (
                    <SwiftImage systemName="checkmark.seal.fill" modifiers={[foregroundStyle('#155DFC'), font({ size: 14 })]} />
                  )}
                </HStack>
                <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 13 })]}>
                  {product.seller.university} • {product.seller.totalSales} sales
                </SwiftText>
                <HStack>
                  <SwiftImage systemName="star.fill" modifiers={[foregroundStyle('#F59E0B'), font({ size: 12 })]} />
                  <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 13 })]}>{product.seller.rating}</SwiftText>
                </HStack>
              </VStack>
              <Spacer />
              <Button
                label="Visit"
                modifiers={[buttonStyle('bordered'), foregroundStyle('#155DFC')]}
                onPress={() => {}}
              />
            </HStack>
          </Section>

          {/* Buyer Protection */}
          <Section title="VarsityMart Buyer Protection">
            {[
              'Money-back guarantee if item not received',
              'Full refund if item is not as described',
              'Secure payment processing',
            ].map((item) => (
              <HStack key={item}>
                <SwiftImage systemName="checkmark.circle.fill" modifiers={[foregroundStyle('#10B981')]} />
                <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 13 })]}>{item}</SwiftText>
              </HStack>
            ))}
          </Section>

          {/* Actions */}
          <Section>
            <HStack>
              <Button
                modifiers={[buttonStyle('bordered'), foregroundStyle('#155DFC')]}
                onPress={() => {}}
              >
                <HStack>
                  <SwiftImage systemName="bubble.left" />
                  <SwiftText>Chat</SwiftText>
                </HStack>
              </Button>
              <Button
                modifiers={[buttonStyle('bordered'), foregroundStyle('#155DFC')]}
                onPress={() => {}}
              >
                <HStack>
                  <SwiftImage systemName="cart.badge.plus" />
                  <SwiftText>Add to Cart</SwiftText>
                </HStack>
              </Button>
            </HStack>
            <Button
              label="Buy Now"
              modifiers={[
                buttonStyle('borderedProminent'),
                controlSize('large'),
                tint('#155DFC'),
              ]}
              onPress={() => router.push('/(dash)/checkout' as never)}
            />
          </Section>
        </Form>
      </Host>
    </MainContainer>
  );
}
