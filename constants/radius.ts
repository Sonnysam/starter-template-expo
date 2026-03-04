import { BaseUnit } from '@/constants/universal';

export const RadiusValues = {
  none: 0,
  sm: BaseUnit * 1,
  md: BaseUnit * 2,
  lg: BaseUnit * 3,
  xl: BaseUnit * 4,
  '2xl': BaseUnit * 5,
  full: 9999,
} as const;

export const radius = {
  none: RadiusValues.none,
  sm: RadiusValues.sm,
  md: RadiusValues.md,
  lg: RadiusValues.lg,
  xl: RadiusValues.xl,
  '2xl': RadiusValues['2xl'],
  full: RadiusValues.full,
  values: RadiusValues,
  style: (size: keyof typeof RadiusValues = 'md') => ({ borderRadius: RadiusValues[size] }),
};
