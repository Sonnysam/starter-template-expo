import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import {
  Host,
  Form,
  Section,
  Toggle,
  Button,
  Text,
  HStack,
  VStack,
  Image,
} from '@expo/ui/swift-ui';
import {
  buttonStyle,
  foregroundStyle,
  tint,
  font,
} from '@expo/ui/swift-ui/modifiers';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MainContainer from '@/components/common/MainContainer';
import { useTheme } from '@/constants/themeContext';
import useAuthStore from '@/store/auth';

export default function SettingsScreen() {
  const router = useRouter();
  const { mode } = useTheme();
  const logout = useAuthStore((s) => s.logout);

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(mode === 'dark');
  const [locationServices, setLocationServices] = useState(true);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/');
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: implement account deletion API call
          },
        },
      ],
    );
  };

  return (
    <MainContainer scrollable={false}>
      {/* RN header for back nav */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={mode === 'dark' ? '#FFF' : '#101828'}
          onPress={() => router.back()}
        />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Host matchContents>
            <Text modifiers={[font({ size: 18, weight: 'semibold' })]}>Settings</Text>
          </Host>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* SwiftUI Form */}
      <Host style={{ flex: 1 }}>
        <Form>
          {/* Privacy & Security */}
          <Section title="Privacy & Security">
            <Button
              label="Change Password"
              systemImage="lock"
              modifiers={[buttonStyle('plain'), foregroundStyle('indigo')]}
              onPress={() => {}}
            />
            <Button
              label="Two-Factor Authentication"
              systemImage="shield.checkered"
              modifiers={[buttonStyle('plain'), foregroundStyle('green')]}
              onPress={() => {}}
            />
            <Toggle
              label="Location Services"
              isOn={locationServices}
              onIsOnChange={setLocationServices}
            />
          </Section>

          {/* Preferences */}
          <Section title="Preferences">
            <Toggle
              label="Push Notifications"
              isOn={notifications}
              onIsOnChange={setNotifications}
            />
            <Toggle
              label="Dark Mode"
              isOn={darkMode}
              onIsOnChange={setDarkMode}
            />
            <Button
              label="Language"
              systemImage="globe"
              modifiers={[buttonStyle('plain')]}
              onPress={() => {}}
            />
          </Section>

          {/* About & Support */}
          <Section title="About & Support">
            <Button
              label="Help Center"
              systemImage="questionmark.circle"
              modifiers={[buttonStyle('plain'), foregroundStyle('purple')]}
              onPress={() => {}}
            />
            <Button
              label="Terms of Service"
              systemImage="doc.text"
              modifiers={[buttonStyle('plain'), foregroundStyle('cyan')]}
              onPress={() => {}}
            />
            <Button
              label="Privacy Policy"
              systemImage="shield"
              modifiers={[buttonStyle('plain'), foregroundStyle('green')]}
              onPress={() => {}}
            />
            <HStack>
              <Image systemName="info.circle" />
              <Text>App Version</Text>
              <Text modifiers={[foregroundStyle('gray')]}>1.0.0</Text>
            </HStack>
          </Section>

          {/* Account */}
          <Section title="Account">
            <Button
              label="Log Out"
              systemImage="rectangle.portrait.and.arrow.right"
              modifiers={[buttonStyle('plain'), foregroundStyle('orange')]}
              onPress={handleLogout}
            />
            <Button
              label="Delete Account"
              systemImage="trash"
              role="destructive"
              onPress={handleDeleteAccount}
            />
          </Section>
        </Form>
      </Host>
    </MainContainer>
  );
}
