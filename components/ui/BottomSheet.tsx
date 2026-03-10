import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/contexts/ThemeContext';
import type { BottomSheetProps } from '@/interfaces/components/ui';

const BottomSheet: React.FC<BottomSheetProps> = ({ title, children, style }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.white }, style]}>
      {title && <Text variant="title" weight="bold" style={[styles.title, { color: colors.black }]}>{title}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { marginBottom: 16 },
});

export default BottomSheet;
