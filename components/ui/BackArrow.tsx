import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import type { BackArrowProps } from '@/interfaces/components/ui';

export function BackArrow({ onPress, size = 40, style }: BackArrowProps) {
  const { colors } = useTheme();
  const iconSize = Math.round(size * 0.5);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.lightGrey,
        },
        pressed && styles.pressed,
        style,
      ]}
    >
      <Ionicons name="arrow-back" size={iconSize} color={colors.black} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
