import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import {
  Host,
  Button,
  Text as SwiftText,
  HStack,
  VStack,
  Spacer,
  Image as SwiftImage,
} from '@expo/ui/swift-ui';
import {
  buttonStyle,
  font,
  foregroundStyle,
  lineLimit,
} from '@expo/ui/swift-ui/modifiers';
import { homeStyles as styles } from '@/styles/tabs/home';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import Header from '@/components/common/Header';
import CategoryButton from '@/components/common/CategoryButton';
import MainContainer from '@/components/common/MainContainer';
import GlassCard from '@/components/common/GlassCard';
import { useTheme } from '@/constants/themeContext';
import { PRODUCTS, CATEGORIES } from '@/constants/tempData/homeData';
import api from '@/config/api';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || '';
const DEFAULT_IMAGE = 'https://dummyimage.com/208x220/000/fff.png';

const normalizeImageUrl = (url: string | undefined): string => {
  if (!url || typeof url !== 'string') return DEFAULT_IMAGE;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('file:'))
    return url;
  const cleanBase = String(API_BASE_URL || '').replace(/\/$/, '');
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  if (!cleanBase) return DEFAULT_IMAGE;
  return `${cleanBase}${cleanPath}`;
};

interface ApiProduct {
  id?: string;
  name?: string;
  price?: number;
  images?: string[];
  image?: string;
  category?: string;
  createdAt?: string;
  [key: string]: unknown;
}

const mapApiProductToCard = (product: ApiProduct) => ({
  image: normalizeImageUrl(product?.images?.[0] || product?.image),
  title: product?.name || 'Unknown',
  price: `GHC ${product?.price ?? 0}`,
  rating: '4.5',
});

const mapApiProductToRecentListing = (product: ApiProduct) => ({
  image: normalizeImageUrl(product?.images?.[0] || product?.image),
  title: product?.name || 'Unknown',
  price: `GHC ${product?.price ?? 0}`,
});

// Service Card — SwiftUI based
const ServiceCard = ({
  title,
  subtitle,
  systemImage,
}: {
  title: string;
  subtitle: string;
  systemImage: string;
}) => (
  <GlassCard
    style={styles.serviceCard}
    fallbackStyle={{ backgroundColor: '#fff' }}
  >
    <Host matchContents>
      <HStack spacing={10}>
        <SwiftImage systemName={systemImage} />
        <VStack>
          <SwiftText modifiers={[font({ size: 14, weight: 'semibold' })]}>{title}</SwiftText>
          <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 12 })]}>{subtitle}</SwiftText>
        </VStack>
      </HStack>
    </Host>
  </GlassCard>
);

// Product Card — hybrid (expo-image + SwiftUI text)
const ProductCard = ({
  item,
  onPress,
}: {
  item: { image: string; title: string; price: string; rating?: string; badge?: string };
  onPress: () => void;
}) => (
  <Pressable onPress={onPress}>
    <GlassCard
      style={styles.productCard}
      fallbackStyle={{ backgroundColor: '#fff' }}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} contentFit="cover" />
      {item.badge && (
        <View style={styles.productBadge}>
          <Host matchContents>
            <SwiftText modifiers={[font({ size: 10, weight: 'bold' }), foregroundStyle('white')]}>
              {item.badge}
            </SwiftText>
          </Host>
        </View>
      )}
      <View style={styles.productInfo}>
        <Host matchContents>
          <VStack spacing={2}>
            <SwiftText modifiers={[font({ size: 13, weight: 'medium' }), lineLimit(1)]}>
              {item.title}
            </SwiftText>
            <SwiftText modifiers={[font({ size: 14, weight: 'bold' }), foregroundStyle('blue')]}>
              {item.price}
            </SwiftText>
          </VStack>
        </Host>
        {item.rating && (
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color="#F59E0B" />
            <Host matchContents>
              <SwiftText modifiers={[font({ size: 11 }), foregroundStyle('gray')]}>
                {item.rating}
              </SwiftText>
            </Host>
          </View>
        )}
      </View>
    </GlassCard>
  </Pressable>
);

export default function HomePage() {
  const { theme } = useTheme();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [apiProducts, setApiProducts] = useState<ApiProduct[]>([]);

  const productCards = useMemo(
    () => (apiProducts.length > 0 ? apiProducts.map(mapApiProductToCard) : PRODUCTS),
    [apiProducts],
  );

  const recentListings = useMemo(
    () =>
      [...apiProducts]
        .sort((a, b) => {
          const aTime = new Date(a?.createdAt || 0).getTime();
          const bTime = new Date(b?.createdAt || 0).getTime();
          return bTime - aTime;
        })
        .map(mapApiProductToRecentListing),
    [apiProducts],
  );

  useFocusEffect(
    useCallback(() => {
      const fetchProducts = async () => {
        try {
          const response = await api.get('/products/');
          const products = Array.isArray(response)
            ? response
            : ((response as Record<string, unknown>)?.results as ApiProduct[]) || [];
          setApiProducts(products);
        } catch {
          // Fall back to local product data
        }
      };
      fetchProducts();
    }, []),
  );

  // Right header icons
  const RightIcons = (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <Host matchContents>
        <HStack spacing={12}>
          <Button
            label="Search"
            systemImage="magnifyingglass"
            modifiers={[buttonStyle('plain')]}
            onPress={() => {}}
          />
          <Button
            label="Notifications"
            systemImage="bell"
            modifiers={[buttonStyle('plain')]}
            onPress={() => {}}
          />
        </HStack>
      </Host>
    </View>
  );

  return (
    <MainContainer scrollable={false} edges={['top', 'left', 'right']} style={{ paddingHorizontal: 0 }}>
      <Header title="Varsity Mart" rightIcons={RightIcons} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Service Cards */}
        <View style={styles.servicesContainer}>
          <ServiceCard title="Order Food" subtitle="From restaurants" systemImage="fork.knife" />
          <ServiceCard title="Night Shop" subtitle="Late night delivery" systemImage="moon" />
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isActive={activeCategory.id === category.id}
                onPress={() => setActiveCategory(category)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <View style={styles.sectionHeader}>
          <Host matchContents>
            <SwiftText modifiers={[font({ size: 18, weight: 'bold' })]}>Featured Products</SwiftText>
          </Host>
          <Host matchContents>
            <Button
              label="See All"
              modifiers={[buttonStyle('plain'), foregroundStyle('blue'), font({ size: 14 })]}
              onPress={() => {}}
            />
          </Host>
        </View>

        <View style={styles.productsGrid}>
          {productCards.map((item, index) => (
            <ProductCard
              key={index}
              item={item}
              onPress={() => router.push('/products' as never)}
            />
          ))}
        </View>

        {/* Recent Listings */}
        {recentListings.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Host matchContents>
                <SwiftText modifiers={[font({ size: 18, weight: 'bold' })]}>
                  Recent Listings
                </SwiftText>
              </Host>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recentListings.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => router.push('/products' as never)}
                >
                  <GlassCard
                    style={styles.recentCard}
                    fallbackStyle={{ backgroundColor: '#fff' }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={styles.recentImage}
                      contentFit="cover"
                    />
                    <Host matchContents>
                      <VStack spacing={2}>
                        <SwiftText modifiers={[font({ size: 13, weight: 'medium' }), lineLimit(1)]}>
                          {item.title}
                        </SwiftText>
                        <SwiftText modifiers={[font({ size: 13, weight: 'bold' }), foregroundStyle('blue')]}>
                          {item.price}
                        </SwiftText>
                      </VStack>
                    </Host>
                  </GlassCard>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </MainContainer>
  );
}