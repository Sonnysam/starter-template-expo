import React, { useState } from 'react';
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
  Image,
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
import MainContainer from '@/components/common/MainContainer';
import { useTheme } from '@/constants/themeContext';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    setLoading(true);
    try {
      const { forgotPassword } = await import('@/services/authServices');
      await forgotPassword(email.trim());
      Alert.alert(
        'Email Sent',
        'If an account exists with that email, a password reset link has been sent.',
        [{ text: 'OK', onPress: () => router.replace('/(auth)/login' as never) }],
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to send reset email. Try again.';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContainer scrollable={false}>
      {/* Header */}
      <View style={{ paddingTop: 8 }}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={theme.textColor}
          onPress={() => router.back()}
        />
      </View>

      <View style={{ alignItems: 'center', paddingVertical: 32 }}>
        <Ionicons name="lock-open-outline" size={48} color="#155DFC" />
        <Host matchContents>
          <VStack spacing={8}>
            <Text modifiers={[font({ size: 24, weight: 'bold' })]}>Forgot Password?</Text>
            <Text modifiers={[foregroundStyle('gray'), font({ size: 14 })]}>
              No worries! Enter your email and we'll send you a reset link.
            </Text>
          </VStack>
        </Host>
      </View>

      {/* SwiftUI Form */}
      <Host style={{ flex: 0 }}>
        <Form>
          <Section title="Email Address">
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

      {/* Submit button */}
      <View style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
        <Host matchContents>
          <VStack spacing={16}>
            <Button
              label={loading ? 'Sending...' : 'Send Reset Link'}
              modifiers={[
                buttonStyle('borderedProminent'),
                controlSize('large'),
                tint('#155DFC'),
              ]}
              onPress={handleSubmit}
            />
            <Button
              label="Back to Sign In"
              systemImage="arrow.left"
              modifiers={[buttonStyle('plain'), foregroundStyle('blue')]}
              onPress={() => router.push('/(auth)/login' as never)}
            />
          </VStack>
        </Host>
      </View>
    </MainContainer>
  );
}
