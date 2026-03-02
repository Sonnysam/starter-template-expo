import { Tabs } from 'expo-router';
import { TABS } from '@/constants/tabs';
import { Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/constants/themeContext';

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

const TAB_ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: 'home-sharp',
  food: 'restaurant-sharp',
  cart: 'cart-sharp',
  messages: 'chatbubble-sharp',
  profile: 'person-sharp',
};

export default function TabLayout() {
  const { theme, mode } = useTheme();

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

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.tabIconActive,
        tabBarInactiveTintColor: theme.tabIconInactive,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
          height: Platform.OS === 'android' ? 70 : 85,
          paddingBottom: Platform.OS === 'android' ? 12 : 28,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint={mode === 'dark' ? 'dark' : 'light'}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.label,
            tabBarIcon: ({ color, size }) => {
              const iconName = TAB_ICON_MAP[tab.name] || 'help-circle-sharp';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          }}
        />
      ))}
    </Tabs>
  );
}
