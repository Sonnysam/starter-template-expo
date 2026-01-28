import { Tabs } from 'expo-router';
import { TABS } from '@/constants/tabs';
import { Platform } from 'react-native';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

// Safely import iOS-only components
let NativeTabs: any, Icon: any, Label: any;
if (Platform.OS === 'ios') {
    try {
        const NativeTabsModule = require('expo-router/unstable-native-tabs');
        NativeTabs = NativeTabsModule.NativeTabs;
        Icon = NativeTabsModule.Icon;
        Label = NativeTabsModule.Label;
    } catch (e) {
        // Fallback for missing native module
    }
}

export default function TabLayout() {
    // Premium iOS Experience (if NativeTabs is available)
    if (Platform.OS === 'ios' && NativeTabs) {
        return (
            <NativeTabs>
                {TABS.map((tab) => (
                    <NativeTabs.Trigger key={tab.name} name={tab.name}>
                        <Icon sf={tab.icon.sf} drawable={tab.icon.drawable} />
                        <Label>{tab.label}</Label>
                    </NativeTabs.Trigger>
                ))}
            </NativeTabs>
        );
    }

    // Standard Android / Stable iOS Fallback
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.grey,
                tabBarHideOnKeyboard: true, // Recommended by doc for Android
                tabBarStyle: {
                    backgroundColor: Colors.white,
                    borderTopWidth: 1,
                    borderTopColor: Colors.lightGrey,
                    height: Platform.OS === 'android' ? 70 : 60,
                    paddingBottom: Platform.OS === 'android' ? 12 : 10,
                }
            }}
        >
            {TABS.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        title: tab.label,
                        tabBarIcon: ({ color, size }) => {
                            let iconName: keyof typeof Ionicons.glyphMap;

                            switch (tab.name) {
                                case 'home':
                                    iconName = 'home-sharp';
                                    break;
                                case 'settings':
                                    iconName = 'settings-sharp';
                                    break;
                                case 'profile':
                                    iconName = 'person-sharp';
                                    break;
                                default:
                                    iconName = 'help-circle-sharp';
                            }

                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                    }}
                />
            ))}
        </Tabs>
    );
}
