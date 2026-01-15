import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { TABS } from '@/constants/tabs';

export default function TabLayout() {
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
