import React from 'react';
import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/constants/themeContext';

interface ThemedViewProps extends ViewProps {
  safe?: boolean;
}

const ThemedView: React.FC<ThemedViewProps> = ({
  safe = false,
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const Container = safe ? SafeAreaView : View;

  return (
    <Container
      style={[{ backgroundColor: theme.backgroundColor }, style]}
      {...props}
    >
      {children}
    </Container>
  );
};

export default ThemedView;
