import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { fonts } from '@/constants/fonts';
import { FontSizes } from '@/constants/typography';

interface CustomTextProps extends TextProps {
  variant?: 'body' | 'title' | 'subtitle' | 'caption';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

const variantFontSize = {
  body: FontSizes.body,
  title: FontSizes.title,
  subtitle: FontSizes.subtitle,
  caption: FontSizes.caption,
} as const;

const weightFontFamily = {
  regular: fonts.regular,
  medium: fonts.medium,
  semiBold: fonts.semibold,
  bold: fonts.bold,
} as const;

export const Text: React.FC<CustomTextProps> = ({
  style,
  variant = 'body',
  weight = 'regular',
  children,
  ...props
}) => {
  const { colors } = useTheme();
  const textColor = (style ? (StyleSheet.flatten(style) as { color?: string })?.color : undefined) ?? colors.black;
  return (
    <RNText
      style={[
        styles.base,
        {
          fontSize: variantFontSize[variant],
          fontFamily: weightFontFamily[weight],
          color: textColor,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: fonts.regular,
  },
}); 