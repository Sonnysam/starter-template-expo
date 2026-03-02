import React from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/ui/InputField';
import Dropdown from '@/components/common/Dropdown';
import useAuth from '@/hooks/useAuth';
import signUpSchema, { type SignUpFormData } from './signUpSchema';
import MainContainer from '@/components/common/MainContainer';
import { useTheme } from '@/constants/themeContext';

const universities = [
  {
    label: 'Kwame Nkrumah University of Science and Technology (KNUST)',
    value: 'knust',
  },
  { label: 'University of Ghana (UG)', value: 'ug' },
  { label: 'University of Cape Coast (UCC)', value: 'ucc' },
];

const campuses: Record<string, { label: string; value: string }[]> = {
  knust: [
    { label: 'Main Campus', value: 'main' },
    { label: 'Obuasi Campus', value: 'obuasi' },
  ],
  ug: [
    { label: 'Legon Campus', value: 'legon' },
    { label: 'City Campus', value: 'city' },
  ],
  ucc: [
    { label: 'Main Campus', value: 'main' },
    { label: 'College of Distance Education', value: 'cde' },
  ],
};

export default function SignUpScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { mutate: registerUser, isPending } = useAuth.useRegister();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      university: '',
      campus: '',
      password: '',
      confirmPassword: '',
    },
  });

  const selectedUniversity = watch('university');

  const onSubmit = (data: SignUpFormData) => {
    registerUser(
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        university: data.university,
        campus: data.campus,
        password: data.password,
      },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Account created! Please verify your email.', [
            { text: 'OK', onPress: () => router.replace('/(auth)/login' as never) },
          ]);
        },
        onError: (error: Error) => {
          Alert.alert('Registration Failed', error.message || 'Please try again');
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

      <View style={{ paddingVertical: 20 }}>
        <Host matchContents>
          <VStack spacing={6}>
            <Text modifiers={[font({ size: 28, weight: 'bold' })]}>Create Account</Text>
            <Text modifiers={[foregroundStyle('gray'), font({ size: 15 })]}>
              Join VarsityMart and start shopping
            </Text>
          </VStack>
        </Host>
      </View>

      {/* SwiftUI Form for text fields */}
      <Host style={{ flex: 1 }}>
        <Form>
          <Section title="Personal Info">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange } }) => (
                <TextField
                  placeholder="Full Name"
                  onChangeText={onChange}
                  autocorrection={false}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange } }) => (
                <TextField
                  placeholder="Email"
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autocorrection={false}
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange } }) => (
                <TextField
                  placeholder="Phone Number"
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                />
              )}
            />
          </Section>

          <Section title="University">
            <Controller
              control={control}
              name="university"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Dropdown
                    options={universities}
                    selectedValue={value}
                    placeholder="Select your university"
                    onSelect={(option: { value: string }) => onChange(option.value)}
                  />
                </View>
              )}
            />
            {selectedUniversity && campuses[selectedUniversity] && (
              <Controller
                control={control}
                name="campus"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <Dropdown
                      options={campuses[selectedUniversity]}
                      selectedValue={value}
                      placeholder="Select your campus"
                      onSelect={(option: { value: string }) => onChange(option.value)}
                    />
                  </View>
                )}
              />
            )}
          </Section>
        </Form>
      </Host>

      {/* Password fields — RN InputField (secure text not in SwiftUI @expo/ui) */}
      <View style={{ marginTop: 8, gap: 8 }}>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Password"
              placeholder="Create a password"
              icon="lock-closed-outline"
              value={value}
              onChangeText={onChange}
              isPassword
              error={errors.password?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Confirm Password"
              placeholder="Confirm your password"
              icon="lock-closed-outline"
              value={value}
              onChangeText={onChange}
              isPassword
              error={errors.confirmPassword?.message}
            />
          )}
        />
      </View>

      {/* Submit button */}
      <View style={{ paddingVertical: 16 }}>
        <Host matchContents>
          <Button
            label={isPending ? 'Creating Account...' : 'Create Account'}
            modifiers={[
              buttonStyle('borderedProminent'),
              controlSize('large'),
              tint('#155DFC'),
            ]}
            onPress={handleSubmit(onSubmit)}
          />
        </Host>
      </View>

      {/* Sign In link */}
      <View style={{ alignItems: 'center', paddingBottom: 30 }}>
        <Host matchContents>
          <HStack spacing={4}>
            <Text modifiers={[foregroundStyle('gray')]}>Already have an account?</Text>
            <Button
              label="Sign In"
              modifiers={[buttonStyle('plain'), foregroundStyle('blue')]}
              onPress={() => router.push('/(auth)/login' as never)}
            />
          </HStack>
        </Host>
      </View>
    </MainContainer>
  );
}
