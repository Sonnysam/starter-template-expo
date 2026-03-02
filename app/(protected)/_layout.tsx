import { Stack } from 'expo-router';
import { useTheme } from '@/constants/themeContext';

export default function StackLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: theme.backgroundColor },
        headerTintColor: theme.textColor,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(stack)/settings" options={{ headerShown: false }} />
      <Stack.Screen name="(stack)/checkout" options={{ headerShown: false }} />
      <Stack.Screen name="(stack)/products/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="(stack)/foodItemDetails/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="(stack)/restaurantDetails/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="(stack)/orderConfirmed" options={{ headerShown: false }} />
      <Stack.Screen name="(stack)/trackOrder" options={{ headerShown: false }} />
      <Stack.Screen name="(stack)/chat/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="(stack)/createStore" options={{ headerShown: false }} />
      <Stack.Screen name="(stack)/createResturant" options={{ headerShown: false }} />
      <Stack.Screen name="(stack)/createProduct" options={{ headerShown: false }} />
    </Stack>
  );
}
