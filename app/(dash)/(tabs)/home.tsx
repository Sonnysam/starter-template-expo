import React, { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { router } from 'expo-router';
import MainContainer from '@/components/common/MainContainer';
import { Text } from '@/components/common/Text';
import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import Picker from '@/components/ui/Picker';
import Steps from '@/components/ui/Steps';
import { useTheme } from '@/contexts/ThemeContext';

export default function Home() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const { colors, mode, resolved, setMode } = useTheme();
  const isDark = resolved === 'dark';

  return (
    <MainContainer>
      <View style={styles.themeRow}>
        <Text variant="body" weight="medium">
          Theme: {resolved === 'dark' ? 'Dark' : 'Light'}
        </Text>
        <Switch
          value={isDark}
          onValueChange={(v) => setMode(v ? 'dark' : 'light')}
          trackColor={{ false: colors.lightGrey, true: colors.primary }}
          thumbColor={colors.white}
        />
      </View>
      <Text variant="title" weight="bold" style={styles.header}>
        Edit app/(dash)/(tabs)/home.tsx to get started
      </Text>
      <Steps currentStep={2} totalSteps={4} label="Progress" />
      <TextField label="Name" placeholder="Enter name" value={name} onChangeText={setName} />
      <Picker
        label="Country"
        placeholder="Select"
        value={country}
        onValueChange={setCountry}
        items={['Ghana', 'Nigeria', 'Kenya', 'Togo', 'Benin']}
      />
      <Button title="Open bottom sheet" onPress={() => router.push('/(dash)/sheet')} />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  header: { marginBottom: 24, textAlign: 'center' },
});
