import { BaseUnit } from '@/constants/universal';

export const SpacingValues = {
  none: 0,
  xs: BaseUnit * 1,
  sm: BaseUnit * 2,
  md: BaseUnit * 3,
  lg: BaseUnit * 4,
  xl: BaseUnit * 5,
  '2xl': BaseUnit * 6,
  '3xl': BaseUnit * 8,
  '4xl': BaseUnit * 10,
  '5xl': BaseUnit * 12,
  '6xl': BaseUnit * 16,
} as const;

export const spacing = {
  none: SpacingValues.none,
  xs: SpacingValues.xs,
  sm: SpacingValues.sm,
  md: SpacingValues.md,
  lg: SpacingValues.lg,
  xl: SpacingValues.xl,
  '2xl': SpacingValues['2xl'],
  '3xl': SpacingValues['3xl'],
  '4xl': SpacingValues['4xl'],
  '5xl': SpacingValues['5xl'],
  '6xl': SpacingValues['6xl'],
  values: SpacingValues,
  gap: (size: keyof typeof SpacingValues = 'md') => ({ gap: SpacingValues[size] }),
  padding: (size: keyof typeof SpacingValues = 'md') => ({ padding: SpacingValues[size] }),
};
