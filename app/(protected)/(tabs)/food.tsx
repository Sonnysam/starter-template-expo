import React, { useState, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { Host, Text as SwiftText } from '@expo/ui/swift-ui';
import { font } from '@expo/ui/swift-ui/modifiers';
import { foodStyles as styles } from '@/styles/tabs/food';
import MainContainer from '@/components/common/MainContainer';
import { useTheme } from '@/constants/themeContext';
import Header from '@/components/common/Header';
import CategoryButton from '@/components/common/CategoryButton';
import RestaurantCard from '@/components/common/RestaurantCard';
import {
  CATEGORIES,
  FEATURED_RESTAURANTS,
  ALL_RESTAURANTS,
} from '@/constants/tempData/foodData';

export default function FoodPage() {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  const filteredRestaurants = useMemo(() => {
    if (activeCategory.label === 'All') return ALL_RESTAURANTS;
    return ALL_RESTAURANTS.filter((r) => r.category === activeCategory.label);
  }, [activeCategory]);

  return (
    <MainContainer scrollable={false} edges={['top', 'left', 'right']} style={{ paddingHorizontal: 0 }}>
      <Header title="Food" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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

        {/* Featured Restaurants */}
        <View style={styles.sectionHeader}>
          <Host matchContents>
            <SwiftText modifiers={[font({ size: 18, weight: 'bold' })]}>
              Featured Restaurants
            </SwiftText>
          </Host>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
        >
          {FEATURED_RESTAURANTS.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              isFeatured
            />
          ))}
        </ScrollView>

        {/* All Restaurants */}
        <View style={styles.sectionHeader}>
          <Host matchContents>
            <SwiftText modifiers={[font({ size: 18, weight: 'bold' })]}>
              All Restaurants
            </SwiftText>
          </Host>
        </View>
        <View style={styles.restaurantList}>
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </MainContainer>
  );
}
