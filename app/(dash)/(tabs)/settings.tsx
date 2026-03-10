import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import MainContainer from '@/components/common/MainContainer';
import { Text } from '@/components/common/Text';
import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import Picker from '@/components/ui/Picker';
import OtpInput from '@/components/ui/OtpInput';
import { useTheme } from '@/contexts/ThemeContext';
import { SpacingValues } from '@/constants/spacing';

export default function Settings() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [otp, setOtp] = useState('');
  const { colors } = useTheme();

  return (
    <MainContainer contentContainerStyle={styles.container}>
      <Text variant="title" weight="bold" style={[styles.title, { color: colors.black }]}>
        Components
      </Text>
      <Text variant="caption" weight="regular" style={[styles.subtitle, { color: colors.grey }]}>
        Example usage of UI components. See docs/README.md for more.
      </Text>

      <TextField
        label="Name"
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />
      <Picker
        label="Country"
        placeholder="Select"
        value={country}
        onValueChange={setCountry}
        items={['Ghana', 'Nigeria', 'Kenya', 'Togo', 'Benin']}
      />
      <OtpInput length={4} value={otp} onChangeText={setOtp} />

      <View style={styles.buttonRow}>
        <Button title="Primary" onPress={() => {}} />
        <Button title="Outline" onPress={() => {}} variant="outline" />
      </View>

      <Button
        title="Open bottom sheet"
        onPress={() => router.push('/(dash)/sheet')}
        variant="outline"
        style={styles.cta}
      />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SpacingValues.xl,
    paddingTop: SpacingValues.lg,
    paddingBottom: SpacingValues['4xl'],
  },
  title: {
    marginBottom: SpacingValues.xs,
  },
  subtitle: {
    marginBottom: SpacingValues.xl,
    lineHeight: 18,
  },
  buttonRow: {
    marginTop: SpacingValues.lg,
    gap: SpacingValues.sm,
  },
  cta: {
    marginTop: SpacingValues.xl,
  },
});
