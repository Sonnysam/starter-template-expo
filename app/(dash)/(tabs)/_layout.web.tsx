import { Tabs } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { TABS } from '@/constants/tabs';
import { Ionicons } from '@expo/vector-icons';

const TAB_ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: 'home-sharp',
  settings: 'settings-sharp',
  profile: 'person-sharp',
};

function getTabIcon(name: string): keyof typeof Ionicons.glyphMap {
  return TAB_ICON_MAP[name] ?? 'help-circle-sharp';
}

export default function WebTabLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.lightGrey,
        },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.label,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={getTabIcon(tab.name)} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
