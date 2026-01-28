import { Tabs } from 'expo-router';
import { TABS } from '@/constants/tabs';
import { Platform } from 'react-native';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

// Safely import iOS-only components
let NativeTabs: any, Icon: any, Label: any;
if (Platform.OS === 'ios') {
    const NativeTabsModule = require('expo-router/unstable-native-tabs');
    NativeTabs = NativeTabsModule.NativeTabs;
    Icon = NativeTabsModule.Icon;
    Label = NativeTabsModule.Label;
}

export default function TabLayout() {
    // if (Platform.OS === 'ios' && NativeTabs) {
    //     return (
    //         <NativeTabs>
    //             {TABS.map((tab) => (
    //                 <NativeTabs.Trigger key={tab.name} name={tab.name}>
    //                     <Icon sf={tab.icon.sf} drawable={tab.icon.drawable} />
    //                     <Label>{tab.label}</Label>
    //                 </NativeTabs.Trigger>
    //             ))}
    //         </NativeTabs>
    //     );
    // }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.grey,
                tabBarStyle: {
                    backgroundColor: Colors.white,
                    borderTopWidth: 1,
                    borderTopColor: Colors.lightGrey,
                    height: 60,
                    paddingBottom: 10,
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
