import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** The visual style of the glass effect. Default: 'regular' */
  glassEffectStyle?: 'clear' | 'regular' | 'none';
  /** Tint overlay color */
  tintColor?: string;
  /** Color scheme for the glass. Default: 'auto' */
  colorScheme?: 'auto' | 'light' | 'dark';
  /** Fallback style applied only when glass is unavailable */
  fallbackStyle?: StyleProp<ViewStyle>;
}

/**
 * A card component backed by iOS 26+ liquid glass effect.
 * Falls back to a regular View with the provided styles on older platforms.
 *
 * When glass IS available the solid backgroundColor is stripped automatically
 * so the translucency can show through.
 */
export default function GlassCard({
  children,
  style,
  glassEffectStyle = 'regular',
  tintColor,
  colorScheme = 'auto',
  fallbackStyle,
}: GlassCardProps) {
  if (isGlassEffectAPIAvailable()) {
    return (
      <GlassView
        style={style}
        glassEffectStyle={glassEffectStyle}
        tintColor={tintColor}
        colorScheme={colorScheme}
      >
        {children}
      </GlassView>
    );
  }

  return <View style={[style, fallbackStyle]}>{children}</View>;
}
