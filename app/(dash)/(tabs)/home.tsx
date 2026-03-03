import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import MainContainer from '@/components/common/MainContainer';
import { Text } from '@/components/common/Text';
import SonnyButton from '@/components/ui/SonnyButton';
import SonnyInput from '@/components/ui/SonnyInput';
import SonnyPicker from '@/components/ui/SonnyPicker';
import SonnyAuthSteps from '@/components/ui/SonnyAuthSteps';

export default function Home() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');

  return (
    <MainContainer>
      <Text variant="title" weight="bold" style={styles.header}>
        Edit app/(dash)/(tabs)/home.tsx to get started
      </Text>
      <SonnyAuthSteps currentStep={2} totalSteps={4} label="Progress" />
      <SonnyInput label="Name" placeholder="Enter name" value={name} onChangeText={setName} />
      <SonnyPicker
        label="Country"
        placeholder="Select"
        value={country}
        onValueChange={setCountry}
        items={['Ghana', 'Nigeria', 'Kenya', 'Togo', 'Benin']}
      />
      <SonnyButton title="Open bottom sheet" onPress={() => router.push('/(dash)/sheet')} />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: 24, textAlign: 'center' },
});
