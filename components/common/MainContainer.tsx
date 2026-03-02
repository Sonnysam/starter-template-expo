import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MainContainerProps } from "@/interfaces/constants/maincontainer-props";
import { useTheme } from '@/constants/themeContext';

const MainContainer: React.FC<MainContainerProps> = ({
    children,
    style,
    contentContainerStyle,
    scrollable = true,
    edges,
}) => {
    const { theme, mode } = useTheme();

    const renderSafeChildren = (children: ReactNode) => {
        if (typeof children === 'string') {
            return <Text>{children}</Text>;
        }
        return children;
    };

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.backgroundColor }, style]}
            edges={edges}
        >
            <StatusBar style={mode === 'dark' ? 'light' : 'dark'} translucent />
            {scrollable ? (
                <ScrollView
                    contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {renderSafeChildren(children)}
                </ScrollView>
            ) : (
                <View style={[styles.flexContent, contentContainerStyle]}>
                    {renderSafeChildren(children)}
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: Platform.OS === 'ios' ? 0 : 10,
    },
    scrollContent: {
        flexGrow: 1,
        paddingVertical: Platform.OS === 'ios' ? 0 : 20,
        paddingBottom: 50,
    },
    flexContent: {
        flex: 1,
    },
});

export default MainContainer;
