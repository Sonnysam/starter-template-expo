import React, { useState } from 'react';
import MainContainer from "@/components/common/MainContainer";
import { View } from "react-native";
import SonnyPicker from '@/components/ui/SonnyPicker';
import { Text } from '@/components/common/Text';
import SonnyInput from '@/components/ui/SonnyInput';
import SonnyAuthSteps from '@/components/ui/SonnyAuthSteps';
import SonnyButton from '@/components/ui/SonnyButton';
import SonnyDocPicker from '@/components/ui/SonnyDocPicker';

export default function Home() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileMoneyProvider, setMobileMoneyProvider] = useState('');
    const [frontFile, setFrontFile] = useState<string | null>(null);
    const [backFile, setBackFile] = useState<string | null>(null);
    const [insuranceFile, setInsuranceFile] = useState<string | null>(null);

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
            </View>
        </MainContainer>
    );
}
