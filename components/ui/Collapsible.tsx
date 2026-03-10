import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/contexts/ThemeContext';
import { SpacingValues } from '@/constants/spacing';
import type { CollapsibleProps } from '@/interfaces/components/ui';

export function Collapsible({ children, title }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useTheme();

  return (
    <View>
      <Pressable
        style={({ pressed }) => [styles.heading, pressed && styles.pressed]}
        onPress={() => setIsOpen((v) => !v)}
      >
        <View
          style={[
            styles.chevron,
            {
              backgroundColor: colors.lightGrey,
            },
          ]}
        >
          <Ionicons
            name="chevron-forward"
            size={14}
            color={colors.black}
            style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
          />
        </View>
        <Text variant="caption" weight="medium">
          {title}
        </Text>
      </Pressable>
      {isOpen && (
        <Animated.View entering={FadeIn.duration(200)}>
          <View
            style={[
              styles.content,
              {
                backgroundColor: colors.lightGrey,
              },
            ]}
          >
            {children}
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingValues.sm,
  },
  pressed: {
    opacity: 0.7,
  },
  chevron: {
    width: SpacingValues.lg,
    height: SpacingValues.lg,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: SpacingValues.md,
    marginLeft: SpacingValues.lg,
    padding: SpacingValues.lg,
    borderRadius: SpacingValues.md,
  },
});
