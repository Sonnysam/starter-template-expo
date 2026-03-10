import type { ColorPalette } from '@/types/contants/colors';

/** Light palette — edit to customize */
export const light: ColorPalette = {
  primary: '#5547BA',
  black: '#121212',
  grey: '#999999',
  lightGrey: '#F6F6F6',
  gray: '#3D3D3D',
  secondary: '#3E3E3E',
  white: '#ffffff',
  red: '#F83B47',
  orange: '#FF7824',
  success: '#34C759',
};

/** Dark palette — edit to customize */
export const dark: ColorPalette = {
  primary: '#7B6ED9',
  black: '#F5F5F5',
  grey: '#9E9E9E',
  lightGrey: '#2D2D2D',
  gray: '#BDBDBD',
  secondary: '#B0B0B0',
  white: '#121212',
  red: '#FF6B6B',
  orange: '#FFB74D',
  success: '#4ADE80',
};

/** Default export for non-themed usage (e.g. static styles). Prefer useTheme().colors in components. */
export const Colors = light;
