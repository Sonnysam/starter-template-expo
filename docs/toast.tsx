import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/common/Text';
import { useSonnyToast, showSonnyToast } from '@/components/shared/SonnyToast';
import { Colors } from '@/constants/colors';
import SonnyButton from '@/components/ui/SonnyButton';

export default function ToastExamples() {
    const { showToast, ToastComponent } = useSonnyToast();

    return (
        <View style={styles.container}>
            <Text variant="title" weight="bold" style={styles.title}>
                SonnyToast Usage
            </Text>

            <View style={styles.buttonContainer}>
                <SonnyButton
                    title="Success Toast"
                    onPress={() => showToast('Registration completed successfully', {
                        type: 'success',
                        title: 'Registration Successful',
                        showIcon: true
                    })}
                    variant="basic"
                    style={styles.button}
                />

                <SonnyButton
                    title="Info Toast"
                    onPress={() => showToast('Your verification code is 3468', {
                        type: 'info',
                        title: 'VERIFICATION CODE',
                        showIcon: false
                    })}
                    variant="outline"
                    style={styles.button}
                />

                <SonnyButton
                    title="Error Toast"
                    onPress={() => showToast('Login failed. Please check your credentials.', {
                        type: 'error',
                        title: 'Login Error',
                        showIcon: true
                    })}
                    variant="basic"
                    style={{ ...styles.button, backgroundColor: Colors.red }}
                />

                <SonnyButton
                    title="Simple Toast"
                    onPress={() => showToast('Simple message without title or icon')}
                    variant="outline"
                    style={styles.button}
                />

                <SonnyButton
                    title="Global Toast"
                    onPress={() => showSonnyToast('This is a global toast message', {
                        type: 'warning',
                        title: 'Global Toast',
                        showIcon: true
                    })}
                    variant="custom"
                    style={styles.button}
                />
            </View>

            <View style={styles.codeSection}>
                <Text variant="title" weight="bold" style={styles.codeTitle}>
                    Setup:
                </Text>

                <View style={styles.codeBlock}>
                    <Text variant="caption" weight="regular" style={styles.codeText}>
                        {`// 1. Wrap your app with SonnyToastProvider (in _layout.tsx)
import { SonnyToastProvider } from '@/components/shared/SonnyToast';

export default function Layout() {
  return (
    <SonnyToastProvider>
      <Stack>
        {/* Your screens */}
      </Stack>
    </SonnyToastProvider>
  );
}`}
                    </Text>
                </View>

                <Text variant="title" weight="bold" style={styles.codeTitle}>
                    Usage:
                </Text>

                <View style={styles.codeBlock}>
                    <Text variant="caption" weight="regular" style={styles.codeText}>
                        {`// Hook usage
const { showToast, ToastComponent } = useSonnyToast();

// Basic usage
showToast('Message');

// With options
showToast('Message', {
  type: 'success', // 'success' | 'error' | 'warning' | 'info'
  title: 'Title',
  showIcon: true
});

// Global usage (requires SonnyToastProvider)
showSonnyToast('Message', { type: 'error' });`}
                    </Text>
                </View>
            </View>

            <ToastComponent />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.white,
    },
    title: {
        fontSize: 24,
        color: Colors.black,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        gap: 12,
        marginBottom: 30,
    },
    button: {
        marginBottom: 8,
    },
    codeSection: {
        marginBottom: 20,
    },
    codeTitle: {
        fontSize: 18,
        color: Colors.black,
        marginBottom: 12,
    },
    codeBlock: {
        backgroundColor: Colors.lightGrey,
        padding: 16,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
    },
    codeText: {
        fontFamily: 'monospace',
        fontSize: 12,
        color: Colors.black,
        lineHeight: 16,
    },
});
