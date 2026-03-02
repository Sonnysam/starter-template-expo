import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '@/constants/themeContext';

const Index = () => {
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/(protected)/(tabs)/home');
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.backgroundColor,
      }}
    >
      <ActivityIndicator size="large" color="#155DFC" />
    </View>
  );
};

export default Index;