/* eslint-disable react-hooks/exhaustive-deps */
import { Animated, StyleSheet, View } from 'react-native'
import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import { Text } from '../common/Text';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { SonnyToastProps, SonnyToastRef } from '@/interfaces/components/toast';

let globalToastRef: SonnyToastRef | null = null;

const SonnyToast = forwardRef<SonnyToastRef, SonnyToastProps>((props, ref) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateAnim = useRef(new Animated.Value(-100)).current;
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [currentMessage, setCurrentMessage] = useState(props.message);
    const [isVisible, setIsVisible] = useState(props.visible);
    const [toastConfig, setToastConfig] = useState({
        type: props.type || 'info',
        title: props.title,
        description: props.description,
        showIcon: props.showIcon !== false,
    });

    const show = (message: string, options?: { type?: 'success' | 'info' | 'error' | 'warning'; title?: string; description?: string; showIcon?: boolean }) => {
        setCurrentMessage(message);
        if (options) {
            setToastConfig({
                type: options.type || 'info',
                title: options.title,
                description: options.description,
                showIcon: options.showIcon !== false,
            });
        }
        setIsVisible(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        timeoutRef.current = setTimeout(() => {
            hide();
        }, 2000);
    };

    const hide = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateAnim, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsVisible(false);
            if (props.onHide) {
                props.onHide();
            }
        });
    };

    useImperativeHandle(ref, () => ({
        show,
    }));

    useEffect(() => {
        if (props.visible && !isVisible) {
            show(props.message);
        }
    }, [props.visible, props.message]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    if (!isVisible) return null;

    const getIconName = () => {
        switch (toastConfig.type) {
            case 'success':
                return 'checkmark';
            case 'error':
                return 'close';
            case 'warning':
                return 'warning';
            case 'info':
            default:
                return 'information';
        }
    };

    const getIconColor = () => {
        switch (toastConfig.type) {
            case 'success':
                return Colors.success;
            case 'error':
                return Colors.red;
            case 'warning':
                return Colors.orange;
            case 'info':
            default:
                return Colors.primary;
        }
    };

    const getBackgroundColor = () => {
        switch (toastConfig.type) {
            case 'success':
                return Colors.success + '20';
            case 'error':
                return Colors.red + '20';
            case 'warning':
                return Colors.orange + '20';
            case 'info':
            default:
                return Colors.primary + '20';
        }
    };

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: translateAnim }],
                }
            ]}
        >
            {toastConfig.showIcon && (
                <View style={[styles.iconContainer, { backgroundColor: getBackgroundColor() }]}>
                    <Ionicons name={getIconName()} size={20} color={getIconColor()} />
                </View>
            )}
            <View style={styles.textContainer}>
                {toastConfig.title && (
                    <Text variant="body" weight="bold" style={[styles.title, { color: getIconColor() }]}>
                        {toastConfig.title}
                    </Text>
                )}
                <Text variant="caption" weight="regular" style={styles.description}>
                    {currentMessage}
                </Text>
            </View>
        </Animated.View>
    );
});

SonnyToast.displayName = 'SonnyToast';

export const useSonnyToast = () => {
    const toastRef = useRef<SonnyToastRef>(null);

    const showToast = (message: string, options?: { type?: 'success' | 'info' | 'error' | 'warning'; title?: string; description?: string; showIcon?: boolean }) => {
        if (toastRef.current) {
            toastRef.current.show(message, options);
        }
    };

    const ToastComponent = () => (
        <SonnyToast
            ref={toastRef}
            message=""
            visible={false}
        />
    );

    return { showToast, ToastComponent };
};

export const showSonnyToast = (message: string, options?: { type?: 'success' | 'info' | 'error' | 'warning'; title?: string; description?: string; showIcon?: boolean }) => {
    if (globalToastRef) {
        globalToastRef.show(message, options);
    }
};

export const SonnyToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const toastRef = useRef<SonnyToastRef>(null);
    const [toastData, setToastData] = useState({ message: '', visible: false });

    useEffect(() => {
        globalToastRef = {
            show: (message: string, options?: { type?: 'success' | 'info' | 'error' | 'warning'; title?: string; description?: string; showIcon?: boolean }) => {
                setToastData({ message, visible: true });
                if (toastRef.current) {
                    toastRef.current.show(message, options);
                }
            }
        };

        return () => {
            globalToastRef = null;
        };
    }, []);

    return (
        <>
            {children}
            <SonnyToast
                ref={toastRef}
                message={toastData.message}
                visible={toastData.visible}
                onHide={() => setToastData(prev => ({ ...prev, visible: false }))}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 9999,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.success + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        color: Colors.success,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        color: Colors.grey,
        fontSize: 12,
        lineHeight: 16,
    },
});

export default SonnyToast;
export { SonnyToastProps, SonnyToastRef };