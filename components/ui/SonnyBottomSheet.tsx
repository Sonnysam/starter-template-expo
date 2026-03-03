import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '@/components/common/Text';
import { FontSizes } from '@/constants/typography';
import { Colors } from '@/constants/colors';

interface SonnyBottomSheetProps {
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

const SonnyBottomSheet: React.FC<SonnyBottomSheetProps> = ({ title, children, style }) => (
  <View style={[styles.container, style]}>
    {title && <Text variant="title" weight="bold" style={styles.title}>{title}</Text>}
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.white,
  },
  title: {
    marginBottom: 16,
    color: Colors.black,
  },
});

export default SonnyBottomSheet;
