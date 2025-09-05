import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { SonnyInputProps } from '@/interfaces/components/ui';

const SonnyInput: React.FC<SonnyInputProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    showPasswordToggle = false,
    error,
    disabled = false,
    multiline = false,
    numberOfLines = 1,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
    style,
    inputStyle,
    labelStyle,
    errorStyle,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const getContainerStyle = (): ViewStyle => {
        return {
            marginBottom: 16,
            ...style,
        };
    };

    const getLabelStyle = (): TextStyle => {
        return {
            fontSize: 16,
            fontWeight: '600',
            color: Colors.black,
            marginBottom: 8,
            ...labelStyle,
        };
    };

    const getInputContainerStyle = (): ViewStyle => {
        return {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.white,
            borderRadius: 8,
            borderWidth: error ? 1 : 0,
            borderColor: error ? Colors.red : 'transparent',
            shadowColor: Colors.black,
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
        };
    };

    const getInputStyle = (): TextStyle => {
        return {
            flex: 1,
            paddingVertical: 12,
            paddingHorizontal: 16,
            fontSize: 16,
            color: Colors.black,
            minHeight: multiline ? 80 : 48,
            textAlignVertical: multiline ? 'top' : 'center',
            ...(disabled && { color: Colors.grey }),
            ...inputStyle,
        };
    };

    const getErrorStyle = (): TextStyle => {
        return {
            fontSize: 14,
            color: Colors.red,
            marginTop: 4,
            ...errorStyle,
        };
    };

    return (
        <View style={getContainerStyle()}>
            <Text style={getLabelStyle()}>{label}</Text>
            <View style={getInputContainerStyle()}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.grey}
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    editable={!disabled}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    style={getInputStyle()}
                />
                {showPasswordToggle && (
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={{ padding: 12 }}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={isPasswordVisible ? 'eye-off' : 'eye'}
                            size={20}
                            color={Colors.grey}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={getErrorStyle()}>{error}</Text>}
        </View>
    );
};

export default SonnyInput;
