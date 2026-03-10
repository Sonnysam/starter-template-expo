import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { router } from 'expo-router';
import MainContainer from '@/components/common/MainContainer';
import { Text } from '@/components/common/Text';
import { Collapsible } from '@/components/ui/Collapsible';
import { Link } from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeContext';
import { SpacingValues } from '@/constants/spacing';
import { FontSizes } from '@/constants/typography';

export default function Home() {
  const { colors, resolved, setMode } = useTheme();
  const isDark = resolved === 'dark';

  return (
    <MainContainer contentContainerStyle={styles.container}>
      <View style={[styles.hero, { backgroundColor: colors.primary + '12', borderColor: colors.primary + '24' }]}>
        <Text variant="title" weight="bold" style={[styles.heroTitle, { color: colors.primary, fontSize: FontSizes['4xl'] }]}>
          Starter
        </Text>
        <Text variant="body" weight="medium" style={[styles.heroSubtitle, { color: colors.grey }]}>
          Expo template with UI components, Agent Skills, design system, and a structured codebase.
        </Text>
        <View style={[styles.themePill, { backgroundColor: colors.white }]}>
          <Text variant="caption" weight="medium" style={{ color: colors.grey }}>
            {resolved === 'dark' ? 'Dark' : 'Light'}
          </Text>
          <Switch
            value={isDark}
            onValueChange={(v) => setMode(v ? 'dark' : 'light')}
            trackColor={{ false: colors.lightGrey, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>
      </View>

      <View style={styles.sections}>
        <Collapsible title="Getting started">
          <Text variant="caption" style={[styles.collapseText, { color: colors.grey }]}>
            Edit <Text weight="semiBold" style={[styles.emphasis, { color: colors.black }]}>home.tsx</Text>. Run{' '}
            <Text weight="semiBold" style={[styles.emphasis, { color: colors.primary }]}>npx expo start</Text>.
          </Text>
        </Collapsible>

        <Collapsible title="Navigation">
          <Text variant="caption" style={[styles.collapseText, { color: colors.grey }]}>
            Expo Router, native tabs, form sheet in <Text weight="semiBold" style={[styles.emphasis, { color: colors.primary }]}>sheet.tsx</Text>.
          </Text>
        </Collapsible>

        <Collapsible title="Design system">
          <Text variant="caption" style={[styles.collapseText, { color: colors.grey }]}>
            Typography, Poppins, Button, TextField, Picker, OtpInput, ImagePicker, DocPicker, Steps, BottomSheet, Toast.
          </Text>
        </Collapsible>

        <Collapsible title="Stack">
          <Text variant="caption" style={[styles.collapseText, { color: colors.grey }]}>
            TypeScript, Zustand, Zod, NativeWind, Agent Skills, Firebase & Supabase ready.
          </Text>
        </Collapsible>

        <Collapsible title="Docs">
          <Text variant="caption" style={[styles.collapseText, { color: colors.grey }]}>
            <Text weight="semiBold" style={[styles.emphasis, { color: colors.black }]}>docs/README.md</Text> — snippets. <Text weight="semiBold" style={[styles.emphasis, { color: colors.black }]}>docs/component-examples.tsx</Text> — demos.
          </Text>
        </Collapsible>
      </View>

   

      <Link href="https://github.com/sonnysam" style={{ marginTop: SpacingValues.xl }}>
        <Text variant="caption" weight="medium" style={[styles.footer, { color: colors.grey }]}>
          Built with ❤️ by <Text weight="semiBold" style={[styles.emphasis, { color: colors.primary }]}>Samuel Agbenyo</Text>
        </Text>
      </Link>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SpacingValues.xl,
    paddingTop: SpacingValues.lg,
    paddingBottom: SpacingValues['4xl'],
  },
  hero: {
    padding: SpacingValues['2xl'],
    borderRadius: 20,
    marginBottom: SpacingValues.xl,
    borderWidth: 1,
  },
  heroTitle: {
    marginBottom: SpacingValues.xs,
  },
  heroSubtitle: {
    lineHeight: 22,
    marginBottom: SpacingValues.lg,
  },
  themePill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SpacingValues.lg,
    paddingVertical: SpacingValues.sm,
    borderRadius: 12,
  },
  sections: {
    gap: SpacingValues.md,
  },
  collapseText: {
    lineHeight: 20,
  },
  emphasis: {
    fontSize: FontSizes.caption,
  },
  cta: {
    marginTop: SpacingValues.xl,
  },
  footer: {
    marginTop: SpacingValues['3xl'],
    textAlign: 'center',
  },
});
