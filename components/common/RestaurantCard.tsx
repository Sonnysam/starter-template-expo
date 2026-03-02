import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import GlassCard from '@/components/common/GlassCard';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount?: number;
  deliveryTime: string;
  fee: string;
  image: string;
  isOpen: boolean;
  tags?: string[];
  isNightShop?: boolean;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  isFeatured?: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  isFeatured = false,
}) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push('/restaurantDetails' as never)}
    >
      <GlassCard
        style={[
          styles.card,
          isFeatured && styles.featuredCard,
          !isFeatured && styles.listingCard,
        ]}
        fallbackStyle={{ backgroundColor: '#FFFFFF' }}
      >
      <View style={!isFeatured && styles.listImageContainer}>
        <Image
          source={{ uri: restaurant.image }}
          style={isFeatured ? styles.featuredImage : styles.listImage}
        />

        {restaurant.isOpen && isFeatured && (
          <View style={styles.statusBadgeContainer}>
            <View style={[styles.badge, styles.openBadge]}>
              <Text style={styles.badgeText}>Open</Text>
            </View>
            {restaurant.isNightShop && (
              <View style={styles.nightBadge}>
                <Text style={styles.badgeText}>🌙 Night</Text>
              </View>
            )}
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {restaurant.name}
        </Text>
        <Text style={styles.cuisine} numberOfLines={1}>
          {restaurant.cuisine}
        </Text>
        <View style={styles.metaRow}>
          <Ionicons name="star" size={14} color="#F59E0B" />
          <Text style={styles.rating}>{restaurant.rating}</Text>
          {restaurant.reviewCount && (
            <Text style={styles.reviewCount}>({restaurant.reviewCount})</Text>
          )}
          <Text style={styles.dot}>·</Text>
          <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
        </View>
        <Text style={styles.fee}>{restaurant.fee}</Text>

        {restaurant.tags && restaurant.tags.length > 0 && (
          <View style={styles.tagsRow}>
            {restaurant.tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      </GlassCard>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  featuredCard: {
    width: 280,
    marginRight: 12,
  },
  listingCard: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  listImageContainer: {
    width: 96,
    height: 96,
  },
  featuredImage: {
    width: '100%',
    height: 180,
  },
  listImage: {
    width: 96,
    height: 96,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  statusBadgeContainer: {
    position: 'absolute',
    width: '90%',
    top: 12,
    left: 12,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: 'center',
  },
  openBadge: {
    backgroundColor: 'rgba(0, 201, 80, 1)',
  },
  nightBadge: {
    backgroundColor: 'rgba(152, 16, 250, 1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  infoContainer: {
    padding: 12,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#101828',
  },
  cuisine: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: '#101828',
  },
  reviewCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  dot: {
    color: '#6B7280',
    marginHorizontal: 2,
  },
  deliveryTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  fee: {
    fontSize: 12,
    color: '#F54900',
    marginTop: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    gap: 4,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    color: '#4B5563',
  },
});

export default RestaurantCard;
