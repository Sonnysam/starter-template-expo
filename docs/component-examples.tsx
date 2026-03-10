import React, { useState } from 'react';
import MainContainer from '@/components/common/MainContainer';
import { View } from 'react-native';
import { Text } from '@/components/common/Text';
import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import Picker from '@/components/ui/Picker';
import OtpInput from '@/components/ui/OtpInput';

export default function ComponentExamples() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [otp, setOtp] = useState('');

  return (
    <MainContainer>
      <Text variant="title" weight="bold" style={{ marginBottom: 16 }}>
        Components
      </Text>

      <TextField label="Name" placeholder="Enter name" value={name} onChangeText={setName} />
      <Picker
        label="Country"
        placeholder="Select"
        value={country}
        onValueChange={setCountry}
        items={['Ghana', 'Nigeria', 'Kenya']}
      />
      <OtpInput length={6} value={otp} onChangeText={setOtp} />

      <View style={{ marginTop: 16, gap: 8 }}>
        <Button title="Primary" onPress={() => {}} />
        <Button title="Outline" onPress={() => {}} variant="outline" />
      </View>
    </MainContainer>
  );
}
