import { Platform, ScrollView, StyleSheet, Text } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/contexts/ThemeContext";
import { MainContainerProps } from "@/interfaces/constants/maincontainer-props";

const MainContainer: React.FC<MainContainerProps> = ({
    children,
    style,
    contentContainerStyle
}) => {
    const { colors } = useTheme();
    const renderSafeChildren = (children: ReactNode) => {
        if (typeof children === 'string') {
            console.warn('MainContainer: String passed as child. Wrapping in Text component.');
            return <Text>{children}</Text>;
        }
        return children;
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.white }, style]}>
            <ScrollView
                contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {renderSafeChildren(children)}
            </ScrollView>
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
});

export default MainContainer;
