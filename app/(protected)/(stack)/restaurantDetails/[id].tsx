import React, { useState } from 'react';
import {
  View,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';
import {
  Host,
  Text as SwiftText,
  HStack,
  VStack,
  Spacer,
  Image as SwiftImage,
} from '@expo/ui/swift-ui';
import {
  font,
  foregroundStyle,
} from '@expo/ui/swift-ui/modifiers';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MainContainer from '@/components/common/MainContainer';
import GlassCard from '@/components/common/GlassCard';
import { useTheme } from '@/constants/themeContext';
import { restaurantData } from '@/constants/tempData/restaurantData';

/* ---- Sub-components ---- */

function RestaurantInfo({
  restaurant,
}: {
  restaurant: typeof restaurantData.restaurant;
}) {
  return (
    <View style={{ paddingVertical: 12 }}>
      {/* Image placeholder */}
      <GlassCard
        style={{
          height: 160,
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
        fallbackStyle={{ backgroundColor: '#F3F4F6' }}
      >
        <Ionicons name="restaurant-outline" size={48} color="#D1D5DB" />
      </GlassCard>

      <View style={{ paddingVertical: 12 }}>
        <Host matchContents>
          <VStack>
            <SwiftText modifiers={[font({ size: 22, weight: 'bold' })]}>
              {restaurant.name}
            </SwiftText>
            <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 14 })]}>
              {restaurant.cuisine}
            </SwiftText>
            <HStack>
              <HStack>
                <SwiftImage systemName="star.fill" modifiers={[foregroundStyle('#F59E0B'), font({ size: 13 })]} />
                <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 13 })]}>
                  {restaurant.rating} ({restaurant.reviewCount})
                </SwiftText>
              </HStack>
              <HStack>
                <SwiftImage systemName="clock" modifiers={[foregroundStyle('gray'), font({ size: 13 })]} />
                <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 13 })]}>
                  {restaurant.deliveryTime}
                </SwiftText>
              </HStack>
              <HStack>
                <SwiftImage systemName="bicycle" modifiers={[foregroundStyle('gray'), font({ size: 13 })]} />
                <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 13 })]}>
                  {restaurant.deliveryFee === 0
                    ? 'Free Delivery'
                    : `GHC ${restaurant.deliveryFee.toFixed(2)}`}
                </SwiftText>
              </HStack>
            </HStack>
            {restaurant.description && (
              <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 14 })]}>
                {restaurant.description}
              </SwiftText>
            )}
          </VStack>
        </Host>
      </View>
    </View>
  );
}

function MenuCategories({
  categories,
  selected,
  onSelect,
}: {
  categories: string[];
  selected: number;
  onSelect: (i: number) => void;
}) {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingVertical: 8 }}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <Pressable
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            backgroundColor: selected === index ? '#155DFC' : '#F3F4F6',
          }}
          onPress={() => onSelect(index)}
        >
          <Host matchContents>
            <SwiftText
              modifiers={[
                font({ size: 14, weight: 'medium' }),
                foregroundStyle(selected === index ? 'white' : 'gray'),
              ]}
            >
              {item}
            </SwiftText>
          </Host>
        </Pressable>
      )}
    />
  );
}

function MenuItem({
  item,
  onPress,
}: {
  item: (typeof restaurantData.menuItems)[0];
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
    >
      <GlassCard
        style={{
          flexDirection: 'row',
          paddingVertical: 12,
          paddingHorizontal: 8,
          borderRadius: 12,
          marginBottom: 4,
          overflow: 'hidden',
        }}
        fallbackStyle={{ backgroundColor: '#FFF' }}
      >
      <View style={{ flex: 1, paddingRight: 12 }}>
        <Host matchContents>
          <VStack>
            <SwiftText modifiers={[font({ size: 16, weight: 'medium' })]}>{item.name}</SwiftText>
            <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 13 })]} numberOfLines={2}>
              {item.description}
            </SwiftText>
            <HStack>
              <SwiftText modifiers={[font({ size: 15, weight: 'semibold' }), foregroundStyle('#155DFC')]}>
                GHC {item.price.toFixed(2)}
              </SwiftText>
              {item.popular && (
                <HStack>
                  <SwiftImage systemName="flame.fill" modifiers={[foregroundStyle('#EF4444'), font({ size: 12 })]} />
                  <SwiftText modifiers={[foregroundStyle('#EF4444'), font({ size: 12, weight: 'medium' })]}>
                    Popular
                  </SwiftText>
                </HStack>
              )}
            </HStack>
          </VStack>
        </Host>
      </View>
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 8,
          backgroundColor: '#F3F4F6',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Ionicons name="fast-food-outline" size={24} color="#D1D5DB" />
      </View>
      </GlassCard>
    </Pressable>
  );
}

/* ---- Main Screen ---- */

export default function RestaurantDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { mode } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const { restaurant, categories, menuItems } = restaurantData;

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 0 || item.category === categories[selectedCategory];
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderHeader = () => (
    <View>
      <RestaurantInfo restaurant={restaurant} />

      {/* Search */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: mode === 'dark' ? '#1C1C1E' : '#F3F4F6',
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 8,
          gap: 8,
          marginBottom: 8,
        }}
      >
        <Ionicons name="search-outline" size={18} color="#9CA3AF" />
        <TextInput
          style={{ flex: 1, fontSize: 15, color: mode === 'dark' ? '#FFF' : '#101828' }}
          placeholder="Search menu..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <MenuCategories
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <View style={{ paddingVertical: 8 }}>
        <Host matchContents>
          <SwiftText modifiers={[font({ size: 16, weight: 'semibold' })]}>
            {categories[selectedCategory] ?? 'All'} ({filteredItems.length})
          </SwiftText>
        </Host>
      </View>
    </View>
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
        <Host matchContents>
          <SwiftText modifiers={[font({ size: 18, weight: 'semibold' })]}>Restaurant</SwiftText>
        </Host>
        <Ionicons name="heart-outline" size={22} color={mode === 'dark' ? '#FFF' : '#101828'} />
      </View>

      <FlatList
        data={filteredItems}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MenuItem
            item={item}
            onPress={() =>
              router.push({
                pathname: '/(dash)/foodItemDetails' as never,
                params: { id: item.id },
              })
            }
          />
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingTop: 40 }}>
            <Host matchContents>
              <VStack>
                <SwiftImage systemName="fork.knife" modifiers={[foregroundStyle('#D1D5DB'), font({ size: 48 })]} />
                <SwiftText modifiers={[foregroundStyle('gray')]}>No menu items found</SwiftText>
              </VStack>
            </Host>
          </View>
        }
      />
    </MainContainer>
  );
}
