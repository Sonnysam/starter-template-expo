import React from 'react';
import { View, Pressable, Image as RNImage } from 'react-native';
import {
  Host,
  Form,
  Section,
  Button,
  Toggle,
  Text,
  HStack,
  VStack,
  Spacer,
} from '@expo/ui/swift-ui';
import {
  buttonStyle,
  foregroundStyle,
  font,
  tint,
  controlSize,
} from '@expo/ui/swift-ui/modifiers';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import useAuthStore from '@/store/auth';
import MainContainer from '@/components/common/MainContainer';
import { useTheme } from '@/constants/themeContext';
import * as Haptics from 'expo-haptics';
import { useAuthGate } from '@/hooks/useAuthGate';
import AuthPromptModal from '@/components/common/AuthPromptModal';

// --- Main Screen ---

const ProfileScreen = () => {
  const { theme, mode, toggleTheme, isUsingSystemTheme, resetToSystemTheme } =
    useTheme();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { requireAuth, showAuthPrompt, authAction, dismissAuthPrompt } =
    useAuthGate();

  const getThemeSwitchValue = () => mode === 'dark';

  const handleThemeSwitch = (value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (isUsingSystemTheme) {
      toggleTheme();
    } else {
      if ((mode === 'dark' && !value) || (mode === 'light' && value)) {
        toggleTheme();
      }
    }
  };

  return (
    <>
      <MainContainer edges={['top', 'left', 'right']}>
        {/* Profile Header — kept as RN for avatar/image */}
        {isAuthenticated && user ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
              paddingHorizontal: 4,
            }}
          >
            {user.avatar && !['👤', ''].includes(user.avatar) ? (
              <RNImage
                source={{ uri: user.avatar }}
                style={{ width: 72, height: 72, borderRadius: 36 }}
              />
            ) : (
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  backgroundColor: '#E5E7EB',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Host matchContents>
                  <Text modifiers={[font({ size: 26, weight: 'bold' })]}>
                    {user.name
                      ? user.name
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2)
                      : 'G'}
                  </Text>
                </Host>
              </View>
            )}
            <View style={{ marginLeft: 14, flex: 1 }}>
              <Host matchContents>
                <VStack>
                  <Text modifiers={[font({ size: 20, weight: 'bold' })]}>{user.name || 'User'}</Text>
                  <Text modifiers={[foregroundStyle('gray'), font({ size: 14 })]}>{user.email || ''}</Text>
                </VStack>
              </Host>
            </View>
            <Pressable
              onPress={() => router.push('/(protected)/(stack)/settings')}
            >
              <Ionicons name="create-outline" size={18} color="#155dfc" />
            </Pressable>
          </View>
        ) : (
          <View style={{ alignItems: 'center', paddingVertical: 24 }}>
            <Ionicons name="person-circle-outline" size={72} color="#D1D5DB" />
            <Host matchContents>
              <VStack spacing={6}>
                <Text modifiers={[font({ size: 20, weight: 'semibold' })]}>Guest User</Text>
                <Text modifiers={[foregroundStyle('gray'), font({ size: 14 })]}>
                  Sign in to access all features
                </Text>
              </VStack>
            </Host>
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
              <Host matchContents>
                <HStack spacing={12}>
                  <Button
                    label="Sign In"
                    modifiers={[buttonStyle('borderedProminent'), controlSize('large'), tint('#155DFC')]}
                    onPress={() => router.push('/(auth)/login')}
                  />
                  <Button
                    label="Create Account"
                    modifiers={[buttonStyle('bordered'), controlSize('large')]}
                    onPress={() => router.push('/(auth)/signUp')}
                  />
                </HStack>
              </Host>
            </View>
          </View>
        )}

        {/* SwiftUI Form sections */}
        <Host style={{ flex: 1 }}>
          <Form>
            {/* Entrepreneur Section */}
            <Section title="Become an Entrepreneur">
              <Button
                label="Post a Product"
                systemImage="bag.badge.plus"
                modifiers={[buttonStyle('plain'), foregroundStyle('blue')]}
                onPress={() => {
                  if (!requireAuth('sell')) return;
                  router.push('/(protected)/(stack)/createProduct');
                }}
              />
              <HStack>
                <Button
                  label="Create a Store"
                  systemImage="storefront"
                  modifiers={[buttonStyle('plain'), foregroundStyle('purple')]}
                  onPress={() => {
                    if (!requireAuth('store')) return;
                    router.push('/(protected)/(stack)/createStore');
                  }}
                />
                <Spacer />
                <Text modifiers={[foregroundStyle('gray'), font({ size: 12 })]}>GHS 25/sem</Text>
              </HStack>
              <HStack>
                <Button
                  label="Create a Restaurant"
                  systemImage="fork.knife"
                  modifiers={[buttonStyle('plain'), foregroundStyle('orange')]}
                  onPress={() => {
                    if (!requireAuth('restaurant')) return;
                    router.push('/(protected)/(stack)/createResturant');
                  }}
                />
                <Spacer />
                <Text modifiers={[foregroundStyle('gray'), font({ size: 12 })]}>GHS 30/sem</Text>
              </HStack>
            </Section>

            {/* My Activity */}
            <Section title="My Activity">
              <Button
                label="My Orders"
                systemImage="bag"
                modifiers={[buttonStyle('plain'), foregroundStyle('blue')]}
                onPress={() => {
                  if (!requireAuth('order')) return;
                }}
              />
              <Button
                label="My Listings"
                systemImage="tray.full"
                modifiers={[buttonStyle('plain'), foregroundStyle('green')]}
                onPress={() => {
                  if (!requireAuth('sell')) return;
                }}
              />
              <Button
                label="Browse Stores"
                systemImage="storefront"
                modifiers={[buttonStyle('plain'), foregroundStyle('purple')]}
                onPress={() => {}}
              />
            </Section>

            {/* Settings */}
            <Section title="Settings">
              <Button
                label="Payment Methods"
                systemImage="creditcard"
                modifiers={[buttonStyle('plain'), foregroundStyle('orange')]}
                onPress={() => {}}
              />
              <Button
                label="Notifications"
                systemImage="bell"
                modifiers={[buttonStyle('plain'), foregroundStyle('blue')]}
                onPress={() => {}}
              />
              <Toggle
                label="Dark Mode"
                isOn={getThemeSwitchValue()}
                onIsOnChange={handleThemeSwitch}
              />
              {!isUsingSystemTheme && (
                <Button
                  label="Use System Theme"
                  systemImage="iphone"
                  modifiers={[buttonStyle('plain'), foregroundStyle('gray')]}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    resetToSystemTheme();
                  }}
                />
              )}
              <Button
                label="Settings"
                systemImage="gear"
                modifiers={[buttonStyle('plain'), foregroundStyle('gray')]}
                onPress={() => router.push('/(protected)/(stack)/settings')}
              />
            </Section>

            {/* Support */}
            <Section title="Support">
              <Button
                label="Help Center"
                systemImage="questionmark.circle"
                modifiers={[buttonStyle('plain'), foregroundStyle('blue')]}
                onPress={() => {}}
              />
              <Button
                label="Privacy & Safety"
                systemImage="shield"
                modifiers={[buttonStyle('plain'), foregroundStyle('green')]}
                onPress={() => {}}
              />
            </Section>

            {/* Logout */}
            {isAuthenticated && (
              <Section>
                <Button
                  label="Log Out"
                  systemImage="rectangle.portrait.and.arrow.right"
                  role="destructive"
                  onPress={logout}
                />
              </Section>
            )}
          </Form>
        </Host>

        <View style={{ alignItems: 'center', paddingBottom: 16 }}>
          <Host matchContents>
            <Text modifiers={[foregroundStyle('gray'), font({ size: 12 })]}>VarsityMart v1.0.0</Text>
          </Host>
        </View>
      </MainContainer>

      <AuthPromptModal
        visible={showAuthPrompt}
        onDismiss={dismissAuthPrompt}
        action={authAction}
      />
    </>
  );
};

export default ProfileScreen;
