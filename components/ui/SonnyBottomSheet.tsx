import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/contexts/ThemeContext';

interface SonnyBottomSheetProps {
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

const SonnyBottomSheet: React.FC<SonnyBottomSheetProps> = ({ title, children, style }) => {
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

export default SonnyBottomSheet;
