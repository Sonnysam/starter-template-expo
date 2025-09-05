import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/common/Text';
import { fonts } from '@/constants/fonts';
import { Colors } from '@/constants/colors';

export default function FontExamples() {
    return (
        <View className="p-4">
            {/* Example 1: Custom Text Component with Tailwind */}
            <Text variant="body" weight="regular" className="text-center text-primary mb-4">
                Custom Text Component with Tailwind styling
            </Text>

            {/* Example 2: Native Styling */}
            <Text style={styles.nativeStyle}>
                Native styled text using StyleSheet
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    nativeStyle: {
        fontSize: fonts.sizes.lg,
        fontFamily: fonts.medium,
        color: Colors.primary,
        textAlign: 'center',
        marginTop: 8,
    },
});
