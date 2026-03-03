import { Tabs } from 'expo-router';
import { Colors } from '@/constants/colors';
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
