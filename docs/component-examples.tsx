import React, { useState } from 'react';
import MainContainer from '@/components/common/MainContainer';
import { View } from 'react-native';
import { Text } from '@/components/common/Text';
import SonnyButton from '@/components/ui/SonnyButton';
import SonnyInput from '@/components/ui/SonnyInput';
import SonnyPicker from '@/components/ui/SonnyPicker';
import SonnyOtpInput from '@/components/ui/SonnyOtpInput';

export default function ComponentExamples() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [otp, setOtp] = useState('');

  return (
    <MainContainer>
      <Text variant="title" weight="bold" style={{ marginBottom: 16 }}>
        Components
      </Text>

      <SonnyInput label="Name" placeholder="Enter name" value={name} onChangeText={setName} />
      <SonnyPicker
        label="Country"
        placeholder="Select"
        value={country}
        onValueChange={setCountry}
        items={['Ghana', 'Nigeria', 'Kenya']}
      />
      <SonnyOtpInput length={6} value={otp} onChangeText={setOtp} />

      <View style={{ marginTop: 16, gap: 8 }}>
        <SonnyButton title="Primary" onPress={() => {}} />
        <SonnyButton title="Outline" onPress={() => {}} variant="outline" />
      </View>
    </MainContainer>
  );
}
