import { Props } from '../types/contants/colors';

export const lightTheme = {
  // Backgrounds
  background: "#F3F4F6",
  card: "#FFFFFF",
  card_bg: "#F8F9FA",

  // Text
  primaryText: "#111827",
  subtext: "#6B7280",
  mutedText: "#9CA3AF",
  buttonText: "#FFFFFF",
  inputText: "#1F2937",

  // Interactive
  button: "#4A90E2",
  hover: "#4A43D4",
  tabIconActive: "#4A90E2",
  tabIconInactive: "#9CA3AF",

  // Borders & dividers
  borderColor: "#E0E2E6",

  // Shadows (soft, natural)
  shadowColor: "#111827",
  shadowOpacity: 0.06,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,

  // UI components
  progressFilled: "#10B981",
  progressTrack: "#E5E7EB",
  searchfield: "#F0F3F6",
  inputBg: "#FFFFFF",
  cardHover: "#F5F7FA",

  // Aliases (used by screens)
  backgroundColor: "#F3F4F6",
  textColor: "#111827",
  buttonColor: "#155DFC",
  inactivetabColor: "#9CA3AF",
};

export const darkTheme = {
  // Backgrounds (Core)
  background: "#121928",
  card: "#1A2332",
  card_bg: "#E8F0FF",

  // Text
  primaryText: "#F1F5F9",
  subtext: "#94A3B8",
  buttonText: "#FFFFFF",
  inputText: "#000000",
  shadowColor: "#000000",
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,

  // Interactive Elements
  button: "#155DFC",
  hover: "#4A43D4",
  tabIconActive: "#4A90E2",
  tabIconInactive: "#94A3B8",

  // UI Components
  borderColor: "#2D3748",
  progressFilled: "#10B981",
  progressTrack: "#283141",
  searchfield: "#1A2332",
  inputBg: "#1F2938",
  cardHover: "#222B3C",
  mutedText: "#64748B",

  // Aliases (used by screens)
  backgroundColor: "#121928",
  textColor: "#F1F5F9",
  buttonColor: "#155DFC",
  inactivetabColor: "#94A3B8",
};

// Shared colors that work with both backgrounds
// @/constants/colors.ts
export const sharedColors = {
  // Primary colors
  primaryBlue: "#3B82F6", // Blue for calls
  primaryGreen: "#10B981", // Green for messages/success
  primaryRed: "#EF4444", // Red for delete/error
  white: "#ffffff",
  black: "#000000",
  // Status colors
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  // Additional colors for field icons
  pink: "#EC4899",
  purple: "#8B5CF6",
  indigo: "#6366F1",
  cyan: "#06B6D4",

  // Neutral colors
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",
} as const;
// Theme type for TypeScript (optional)
export type Theme = typeof lightTheme | typeof darkTheme;

export const ThemeColors: Record<string, typeof lightTheme> = {
  light: lightTheme,
  dark: darkTheme,
};
