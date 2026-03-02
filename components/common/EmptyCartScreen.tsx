import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyCartScreenProps {
  message?: string;
}

const EmptyCartScreen: React.FC<EmptyCartScreenProps> = ({
  message = 'Your cart is empty',
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="cart-outline" size={80} color="#D1D5DB" />
      <Text style={styles.title}>{message}</Text>
      <Text style={styles.subtitle}>
        Browse products and add items to your cart
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#101828',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default EmptyCartScreen;
