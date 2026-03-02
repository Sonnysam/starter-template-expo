import React, { useState, useRef } from 'react';
import { View, Alert } from 'react-native';
import {
  Host,
  Form,
  Section,
  TextField,
  Button,
  Text,
  VStack,
  HStack,
  Spacer,
} from '@expo/ui/swift-ui';
import {
  buttonStyle,
  controlSize,
  tint,
  font,
  foregroundStyle,
} from '@expo/ui/swift-ui/modifiers';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import InputField from '@/components/ui/InputField';
import useAuth from '@/hooks/useAuth';
import MainContainer from '@/components/common/MainContainer';
import { useTheme } from '@/constants/themeContext';

export default function LoginScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { mutate: loginUser, isPending } = useAuth.useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    loginUser(
      { email, password },
      {
        onSuccess: () => {
          router.replace('/(protected)/(tabs)/home');
        },
        onError: (error: Error) => {
          Alert.alert('Login Failed', error.message || 'Please try again');
        },
      },
    );
  };

  return (
    <MainContainer>
      {/* Header */}
      <View style={{ paddingTop: 8 }}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={theme.textColor}
          onPress={() => router.back()}
        />
      </View>

      <View style={{ paddingVertical: 24 }}>
        <Host matchContents>
          <VStack spacing={6}>
            <Text modifiers={[font({ size: 28, weight: 'bold' })]}>Welcome Back</Text>
            <Text modifiers={[foregroundStyle('gray'), font({ size: 15 })]}>
              Sign in to continue shopping
            </Text>
          </VStack>
        </Host>
      </View>

      {/* Form — SwiftUI TextField for email, RN InputField for password (secure) */}
      <Host style={{ flex: 1 }}>
        <Form>
          <Section title="Account">
            <TextField
              placeholder="Enter your email"
              defaultValue={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autocorrection={false}
            />
          </Section>
        </Form>
      </Host>

      {/* Password field — RN InputField (no SwiftUI SecureField available) */}
      <View style={{ paddingHorizontal: 0, marginTop: -8 }}>
        <InputField
          label="Password"
          placeholder="Enter your password"
          icon="lock-closed-outline"
          value={password}
          onChangeText={setPassword}
          isPassword
        />
      </View>

      {/* Options Row */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 8 }}>
        <Host matchContents>
          <Button
            label="Forgot Password?"
            modifiers={[buttonStyle('plain'), foregroundStyle('blue'), font({ size: 14 })]}
            onPress={() => router.push('/(auth)/forgotPassword' as never)}
          />
        </Host>
      </View>

      {/* Sign In Button */}
      <View style={{ paddingVertical: 12 }}>
        <Host matchContents>
          <Button
            label={isPending ? 'Signing in...' : 'Sign In'}
            modifiers={[
              buttonStyle('borderedProminent'),
              controlSize('large'),
              tint('#155DFC'),
            ]}
            onPress={handleLogin}
          />
        </Host>
      </View>

      {/* Sign Up Link */}
      <View style={{ alignItems: 'center', paddingTop: 12 }}>
        <Host matchContents>
          <HStack spacing={4}>
            <Text modifiers={[foregroundStyle('gray')]}>Don't have an account?</Text>
            <Button
              label="Sign Up"
              modifiers={[buttonStyle('plain'), foregroundStyle('blue')]}
              onPress={() => router.push('/(auth)/signUp' as never)}
            />
          </HStack>
        </Host>
      </View>
    </MainContainer>
  );
}
