import React from 'react';
import { Text as RNText, TextProps, StyleSheet, TextStyle } from 'react-native';
import { fonts } from '@/constants/fonts';

interface CustomTextProps extends TextProps {
    variant?: 'body' | 'title' | 'subtitle' | 'caption';
    weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

export const Text: React.FC<CustomTextProps> = ({
    style,
    variant = 'body',
    weight = 'regular',
    children,
    ...props
}) => {
    const getFontFamily = (weight: string) => {
        switch (weight) {
            case 'medium':
                return fonts.medium;
            case 'semiBold':
            case 'bold':
                return fonts.medium;
            case 'regular':
            default:
                return fonts.regular;
        }
    };

    return (
        <RNText

            style={[
                styles.base,
                {
                    fontSize: styles[variant].fontSize,
                    fontFamily: getFontFamily(weight),
                },
                style,
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
};

const styles = StyleSheet.create({
    base: {
        fontFamily: fonts.regular,
    },
    body: {
        fontSize: fonts.sizes.md,
    },
    title: {
        fontSize: fonts.sizes.xl,
    },
    subtitle: {
        fontSize: fonts.sizes.lg,
    },
    caption: {
        fontSize: fonts.sizes.sm,
    }
}); 