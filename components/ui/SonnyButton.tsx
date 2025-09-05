import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { SonnyButtonProps } from '@/interfaces/components/ui';

const SonnyButton: React.FC<SonnyButtonProps> = ({
    title,
    onPress,
    variant = 'basic',
    disabled = false,
    loading = false,
    style,
    textStyle,
    iconName,
    iconPosition = 'right',
}) => {
    const getButtonStyle = (): ViewStyle => {
        const baseStyle: ViewStyle = {
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingVertical: 12,
            paddingHorizontal: 24,
            width: '100%',
        };

        const variantStyles: Record<string, ViewStyle> = {
            basic: {
                backgroundColor: Colors.primary,
            },
            outline: {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: Colors.primary,
            },
            custom: {
                backgroundColor: 'transparent',
            },
        };

        const disabledStyle: ViewStyle = disabled
            ? { opacity: 0.6 }
            : {};

        return {
            ...baseStyle,
            ...variantStyles[variant],
            ...disabledStyle,
            ...style,
        };
    };

    const getTextStyle = (): TextStyle => {
        const baseTextStyle: TextStyle = {
            fontWeight: '600',
            fontSize: 16,
        };

        const variantTextStyles: Record<string, TextStyle> = {
            basic: { color: Colors.white },
            outline: { color: Colors.primary },
            custom: { color: Colors.black },
        };

        return {
            ...baseTextStyle,
            ...variantTextStyles[variant],
            ...textStyle,
        };
    };

    const finalTextStyle = getTextStyle();

    return (
        <TouchableOpacity
            style={getButtonStyle()}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={finalTextStyle.color || Colors.black} />
            ) : (
                <>
                    {iconName && iconPosition === 'left' && (
                        <Ionicons
                            name={iconName}
                            size={20}
                            color={finalTextStyle.color || Colors.black}
                            style={{ marginRight: 8 }}
                        />
                    )}
                    <Text style={finalTextStyle}>{title}</Text>
                    {iconName && iconPosition === 'right' && (
                        <Ionicons
                            name={iconName}
                            size={20}
                            color={finalTextStyle.color || Colors.black}
                            style={{ marginLeft: 8 }}
                        />
                    )}
                </>
            )}
        </TouchableOpacity>
    );
};

export default SonnyButton;
