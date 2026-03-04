import { Colors } from '@/constants/colors';

export const ShadowPresets = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  lg: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

export const shadows = {
  none: ShadowPresets.none,
  sm: ShadowPresets.sm,
  md: ShadowPresets.md,
  lg: ShadowPresets.lg,
  presets: ShadowPresets,
  style: (preset: keyof typeof ShadowPresets = 'md') => ShadowPresets[preset],
};
