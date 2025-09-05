import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { SonnyDocPickerProps } from '@/interfaces/components/ui';

const SonnyDocPicker: React.FC<SonnyDocPickerProps> = ({
    title,
    frontLabel,
    backLabel,
    onFrontPress,
    onBackPress,
    frontFile,
    backFile,
    supportedFormats = 'MP4, WEBM, MOV ETC',
    singleMode = false,
    style,
    titleStyle,
    cardStyle,
    labelStyle,
    hintStyle,
    iconStyle,
}) => {
    const getContainerStyle = (): ViewStyle => {
        return {
            marginBottom: 24,
            ...style,
        };
    };

    const getTitleStyle = (): TextStyle => {
        return {
            fontSize: 18,
            fontWeight: '700',
            color: Colors.black,
            marginBottom: 16,
            ...titleStyle,
        };
    };

    const getCardsContainerStyle = (): ViewStyle => {
        return {
            flexDirection: 'row',
            justifyContent: 'space-between',
            // gap: 8,
        };
    };

    const getCardStyle = (): ViewStyle => {
        return {
            flex: singleMode ? 1 : 1,
            backgroundColor: Colors.white,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: Colors.lightGrey,
            borderStyle: 'dashed',
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 120,
            marginHorizontal: 4,
            ...cardStyle,
        };
    };

    const getLabelStyle = (): TextStyle => {
        return {
            fontSize: 14,
            fontWeight: '600',
            color: Colors.black,
            marginTop: 8,
            textAlign: 'center',
            ...labelStyle,
        };
    };

    const getHintStyle = (): TextStyle => {
        return {
            fontSize: 12,
            color: Colors.grey,
            marginTop: 4,
            textAlign: 'center',
            ...hintStyle,
        };
    };

    const getIconStyle = (): ViewStyle => {
        return {
            marginBottom: 8,
            ...iconStyle,
        };
    };

    const renderCard = (
        label: string,
        onPress: () => void,
        hasFile: boolean
    ) => (
        <TouchableOpacity
            style={getCardStyle()}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={getIconStyle()}>
                <Ionicons
                    name={hasFile ? 'checkmark-circle' : 'cloud-upload'}
                    size={32}
                    color={hasFile ? Colors.success : Colors.grey}
                />
            </View>
            <Text style={getLabelStyle()}>{label}</Text>
            <Text style={getHintStyle()}>{supportedFormats}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={getContainerStyle()}>
            <Text style={getTitleStyle()}>{title}</Text>
            {singleMode ? (
                renderCard(frontLabel, onFrontPress, !!frontFile)
            ) : (
                <View style={getCardsContainerStyle()}>
                    {renderCard(frontLabel, onFrontPress, !!frontFile)}
                    {renderCard(backLabel || '', onBackPress || (() => { }), !!backFile)}
                </View>
            )}
        </View>
    );
};

export default SonnyDocPicker;
