import React, { useRef, useEffect } from 'react';
import { View, TextInput, Text, ViewStyle, TextStyle, TouchableOpacity, Keyboard } from 'react-native';
import { Colors } from '@/constants/colors';
import { SonnyOtpInputProps } from '@/interfaces/components/ui';

const SonnyOtpInput: React.FC<SonnyOtpInputProps> = ({
    length = 6,
    value,
    onChangeText,
    style,
    inputStyle,
    textStyle,
    error,
    errorStyle,
}) => {
    const inputRefs = useRef<TextInput[]>([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, length);
    }, [length]);

    const handleTextChange = (text: string, index: number) => {
        const newValue = value.split('');
        newValue[index] = text;
        const updatedValue = newValue.join('').slice(0, length);
        onChangeText(updatedValue);

        if (text && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (key: string, index: number) => {
        if (key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const getContainerStyle = (): ViewStyle => {
        return {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
            gap: 12,
            ...style,
        };
    };

    const getInputContainerStyle = (): ViewStyle => {
        return {
            width: 50,
            height: 60,
            backgroundColor: Colors.grey + '20',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: error ? Colors.red : Colors.grey + '40',
            ...inputStyle,
        };
    };

    const getInputTextStyle = (): TextStyle => {
        return {
            width: '100%',
            height: '100%',
            fontSize: 28,
            fontWeight: '800',
            color: Colors.primary,
            textAlign: 'center',
            textAlignVertical: 'center',
            ...textStyle,
        };
    };


    const getErrorStyle = (): TextStyle => {
        return {
            fontSize: 12,
            color: Colors.red,
            textAlign: 'center',
            marginTop: 8,
            ...errorStyle,
        };
    };

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => Keyboard.dismiss()}
        >
            <View style={getContainerStyle()}>
                {Array.from({ length }, (_, index) => (
                    <View key={index} style={getInputContainerStyle()}>
                        <TextInput
                            ref={(ref) => {
                                if (ref) inputRefs.current[index] = ref;
                            }}
                            style={getInputTextStyle()}
                            value={value[index] || ''}
                            onChangeText={(text) => handleTextChange(text, index)}
                            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            selectTextOnFocus
                            textContentType="oneTimeCode"
                            autoComplete="sms-otp"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            caretHidden={false}
                        />
                    </View>
                ))}
            </View>
            {error && <Text style={getErrorStyle()}>{error}</Text>}
        </TouchableOpacity>
    );
};

export default SonnyOtpInput;
