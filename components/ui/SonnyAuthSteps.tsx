import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '@/constants/colors';
import { SonnyAuthStepsProps } from '@/interfaces/components/ui';

const SonnyAuthSteps: React.FC<SonnyAuthStepsProps> = ({
    currentStep,
    totalSteps,
    label,
    style,
    labelStyle,
    stepStyle,
    activeStepStyle,
    inactiveStepStyle,
}) => {
    const getContainerStyle = (): ViewStyle => {
        return {
            marginBottom: 24,
            ...style,
        };
    };

    const getLabelStyle = (): TextStyle => {
        return {
            fontSize: 18,
            fontWeight: '700',
            color: Colors.black,
            marginBottom: 16,
            ...labelStyle,
        };
    };

    const getStepsContainerStyle = (): ViewStyle => {
        return {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        };
    };

    const getStepStyle = (stepIndex: number): ViewStyle => {
        const isActive = stepIndex <= currentStep;
        const isCurrent = stepIndex === currentStep;

        const baseStepStyle: ViewStyle = {
            height: 8,
            borderRadius: 4,
            flex: 1,
            marginHorizontal: 2,
        };

        const activeStyle: ViewStyle = {
            backgroundColor: Colors.primary,
        };

        const inactiveStyle: ViewStyle = {
            backgroundColor: Colors.lightGrey,
        };

        return {
            ...baseStepStyle,
            ...(isActive ? activeStyle : inactiveStyle),
            ...(isActive ? activeStepStyle : inactiveStepStyle),
            ...(isCurrent ? stepStyle : {}),
        };
    };

    return (
        <View style={getContainerStyle()}>
            <Text style={getLabelStyle()}>{label}</Text>
            <View style={getStepsContainerStyle()}>
                {Array.from({ length: totalSteps }, (_, index) => (
                    <View key={index} style={getStepStyle(index + 1)} />
                ))}
            </View>
        </View>
    );
};

export default SonnyAuthSteps;
