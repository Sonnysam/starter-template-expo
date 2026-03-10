import React, { createContext, useContext, useState, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { light, dark } from '@/constants/colors';
import type { ColorPalette } from '@/types/contants/colors';

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  colors: ColorPalette;
  mode: ThemeMode;
  resolved: 'light' | 'dark';
  setMode: (m: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');

  const value = useMemo(() => {
    const resolved: 'light' | 'dark' = mode === 'system' ? (systemScheme ?? 'light') : mode;
    const colors = resolved === 'dark' ? dark : light;
    return { colors, mode, resolved, setMode };
  }, [mode, systemScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
