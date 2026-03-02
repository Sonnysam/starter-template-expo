import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@/constants/themeContext';

interface ThemedTextProps extends TextProps {
  title?: boolean;
}

const ThemedText: React.FC<ThemedTextProps> = ({
  title = false,
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <RNText
      style={[
        { color: theme.textColor },
        title && styles.title,
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
  },
});

export default ThemedText;
