import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signUp" options={{ headerShown: false }} />
      <Stack.Screen
        name="forgotPassword"
        options={{ headerShown: true, title: 'Forgot Password' }}
      />
    </Stack>
  );
}
