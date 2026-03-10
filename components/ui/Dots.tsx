import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import type { DotsProps } from '@/interfaces/components/ui';

const DOT_SIZE = 8;
const ACTIVE_WIDTH = 20;

export function Dots({ stepCount, currentStep, style }: DotsProps) {
  const { colors } = useTheme();
  const activeColor = colors.primary;
  const inactiveColor = colors.lightGrey;

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: stepCount }).map((_, index) => {
        const isActive = index === currentStep;

        return (
          <View
            key={index}
            style={[
              styles.step,
              isActive
                ? {
                    width: ACTIVE_WIDTH,
                    height: DOT_SIZE,
                    borderRadius: DOT_SIZE / 2,
                    backgroundColor: activeColor,
                  }
                : {
                    width: DOT_SIZE,
                    height: DOT_SIZE,
                    borderRadius: DOT_SIZE / 2,
                    backgroundColor: inactiveColor,
                  },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  step: {},
});
