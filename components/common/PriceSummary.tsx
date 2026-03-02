import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GlassCard from '@/components/common/GlassCard';

interface PriceSummaryProps {
  subtotal: number;
  deliveryFee: number;
  platformFeePercentage: number;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({
  subtotal,
  deliveryFee,
  platformFeePercentage,
}) => {
  const platformFee = (subtotal * platformFeePercentage) / 100;
  const total = subtotal + deliveryFee + platformFee;

  return (
    <GlassCard style={styles.container} fallbackStyle={{ backgroundColor: '#FFFFFF' }}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>GHC {subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Delivery Fee</Text>
        <Text style={styles.value}>
          {deliveryFee === 0 ? 'Free' : `GHC ${deliveryFee.toFixed(2)}`}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Platform Fee ({platformFeePercentage}%)</Text>
        <Text style={styles.value}>GHC {platformFee.toFixed(2)}</Text>
      </View>
      <View style={[styles.row, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>GHC {total.toFixed(2)}</Text>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#101828',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#101828',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#155DFC',
  },
});

export default PriceSummary;
