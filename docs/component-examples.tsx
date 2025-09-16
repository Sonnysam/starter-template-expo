import React, { useState, useEffect } from 'react';
import MainContainer from "@/components/common/MainContainer";
import { View } from "react-native";
import SonnyPicker from '@/components/ui/SonnyPicker';
import { Text } from '@/components/common/Text';
import SonnyInput from '@/components/ui/SonnyInput';
import SonnyAuthSteps from '@/components/ui/SonnyAuthSteps';
import SonnyButton from '@/components/ui/SonnyButton';
import SonnyDocPicker from '@/components/ui/SonnyDocPicker';
import SonnyOtpInput from '@/components/ui/SonnyOtpInput';
import { useSonnyToast, showSonnyToast } from '@/components/shared/SonnyToast';

export default function Home() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileMoneyProvider, setMobileMoneyProvider] = useState('');
    const [frontFile, setFrontFile] = useState<string | null>(null);
    const [backFile, setBackFile] = useState<string | null>(null);
    const [insuranceFile, setInsuranceFile] = useState<string | null>(null);
    const [otpValue, setOtpValue] = useState('');
    const { showToast, ToastComponent } = useSonnyToast();

    const mobileMoneyProviders = [
        'MTN Mobile Money',
        'Vodafone Cash',
        'AirtelTigo Money',
        'Orange Money'
    ];

    const handleFrontUpload = () => {
        console.log('Front upload pressed');
        setFrontFile('front-document.jpg');
    };

    const handleBackUpload = () => {
        console.log('Back upload pressed');
        setBackFile('back-document.jpg');
    };

    const handleInsuranceUpload = () => {
        console.log('Insurance upload pressed');
        setInsuranceFile('insurance-document.pdf');
    };

    const handleOtpComplete = () => {
        if (otpValue.length === 6) {
            showToast('OTP verification successful!', {
                type: 'success',
                title: 'Verification Complete',
                showIcon: true
            });
        }
    };

    const showSuccessToast = () => {
        showToast('Registration completed successfully!', {
            type: 'success',
            title: 'Success',
            showIcon: true
        });
    };

    const showErrorToast = () => {
        showSonnyToast('Something went wrong. Please try again.', {
            type: 'error',
            title: 'Error',
            showIcon: true
        });
    };

    useEffect(() => {
        if (otpValue.length === 6) {
            handleOtpComplete();
        }
    }, [otpValue]);

    return (
        <MainContainer>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
                Component Example
            </Text>

            <SonnyAuthSteps
                currentStep={4}
                totalSteps={4}
                label="Personal Information"
            />

            <SonnyInput
                label="First Name"
                placeholder="Enter first name"
                value={firstName}
                onChangeText={setFirstName}
            />

            <SonnyInput
                label="Email Address"
                placeholder="Enter email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <SonnyInput
                label="Password"
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                showPasswordToggle
            />

            <SonnyPicker
                label="Mobile Money"
                placeholder="Select mobile money provider"
                value={mobileMoneyProvider}
                onValueChange={setMobileMoneyProvider}
                items={mobileMoneyProviders}
            />

            <SonnyDocPicker
                title="Upload Drivers License"
                frontLabel="Upload Card Front"
                backLabel="Upload Card Back"
                onFrontPress={handleFrontUpload}
                onBackPress={handleBackUpload}
                frontFile={frontFile}
                backFile={backFile}
                supportedFormats="JPG, PNG, PDF"
            />

            <SonnyDocPicker
                title="Upload Insurance Copy"
                frontLabel="Upload Insurance"
                onFrontPress={handleInsuranceUpload}
                frontFile={insuranceFile}
                singleMode={true}
                supportedFormats="PDF, JPG, PNG"
            />

            <SonnyOtpInput
                length={6}
                value={otpValue}
                onChangeText={setOtpValue}
                error={otpValue.length > 0 && otpValue.length < 6 ? 'Please enter complete OTP' : ''}
            />

            <View style={{ marginTop: 20, gap: 12 }}>
                <SonnyButton
                    title="Continue"
                    onPress={() => console.log('Continue pressed')}
                />

                <SonnyButton
                    title="Cancel"
                    onPress={() => console.log('Cancel pressed')}
                    variant="outline"
                />

                <SonnyButton
                    title="Save & Continue"
                    onPress={() => console.log('Save pressed')}
                    iconName="save"
                    iconPosition="left"
                />

                <SonnyButton
                    title="Loading..."
                    onPress={() => { }}
                    loading={true}
                />

                <SonnyButton
                    title="Show Success Toast (Hook)"
                    onPress={showSuccessToast}
                    variant="basic"
                />

                <SonnyButton
                    title="Show Error Toast (Global)"
                    onPress={showErrorToast}
                    variant="outline"
                />

                <SonnyButton
                    title="Verify OTP"
                    onPress={handleOtpComplete}
                    variant="custom"
                />
            </View>

            <ToastComponent />
        </MainContainer>
    );
}
