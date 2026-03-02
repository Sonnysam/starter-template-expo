// src/theme/themeContext.tsx

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { createMMKV } from 'react-native-mmkv';
import { darkTheme, lightTheme } from './colors';


export type ThemeMode = 'light' | 'dark';
export type ThemeType = typeof lightTheme;

interface ThemeContextType {
  theme: ThemeType;
  mode: ThemeMode;
  toggleTheme: () => void;
  isUsingSystemTheme: boolean;
  resetToSystemTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const storage = createMMKV();

// Pre-calculate themes to avoid runtime calculations
const THEMES = {
  light: lightTheme,
  dark: darkTheme,
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  
  // Initialize state directly with stored values to avoid double rendering
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = storage.getString('theme') as ThemeMode | null;
    return saved === 'light' || saved === 'dark' ? saved : (systemColorScheme || 'dark');
  });
  
  const [isUsingSystemTheme, setIsUsingSystemTheme] = useState<boolean>(() => {
    const saved = storage.getString('theme') as ThemeMode | null;
    return !(saved === 'light' || saved === 'dark');
  });

  const [currentSystemTheme, setCurrentSystemTheme] = useState<ThemeMode>(systemColorScheme || 'dark');


  // Single useEffect for all initialization
  useEffect(() => {
    // Set up system theme listener immediately
    const handleAppearanceChange = (preferences: { colorScheme: 'light' | 'dark' | null }) => {
      const newSystemTheme = preferences.colorScheme || 'dark';
      setCurrentSystemTheme(newSystemTheme);
      
      if (isUsingSystemTheme) {
        setMode(newSystemTheme);
      }
    };

    const initialSystemTheme = Appearance.getColorScheme();
    setCurrentSystemTheme(initialSystemTheme || 'dark');

    const subscription = Appearance.addChangeListener(handleAppearanceChange as any);
    
    return () => subscription.remove();
  }, [isUsingSystemTheme]);

  // Optimized toggle function - no unnecessary state updates
  const toggleTheme = React.useCallback(() => {
    const next: ThemeMode = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    setIsUsingSystemTheme(false);
    storage.set('theme', next);
  }, [mode]); // Only depend on mode

  // Optimized reset function
  const resetToSystemTheme = React.useCallback(() => {
    setMode(currentSystemTheme);
    setIsUsingSystemTheme(true);
    storage.remove('theme');
  }, [currentSystemTheme]); // Only depend on currentSystemTheme

  // Direct theme access - no useMemo needed since we're using pre-calculated objects
  const theme = THEMES[mode];

  // Optimized value memoization
  const value = React.useMemo(() => ({ 
    theme, 
    mode, 
    toggleTheme,
    isUsingSystemTheme,
    resetToSystemTheme 
  }), [theme, mode, toggleTheme, isUsingSystemTheme, resetToSystemTheme]);

  return (
    <ThemeContext.Provider value={value as any}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};