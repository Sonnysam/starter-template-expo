import { FontSizes, FontWeights } from '@/constants/typography';

/** Poppins font families loaded from assets/fonts/ */
export const Fonts = {
  regular: 'Poppins',
  medium: 'Poppins-Medium',
  semibold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
} as const;

export const fonts = {
  primary: Fonts.regular,
  regular: Fonts.regular,
  medium: Fonts.medium,
  semibold: Fonts.semibold,
  bold: Fonts.bold,
  weights: FontWeights,
  sizes: FontSizes,
  style: (size = FontSizes.body, weight: keyof typeof FontWeights = 'regular') => {
    const family =
      weight === 'bold'
        ? Fonts.bold
        : weight === 'semibold'
          ? Fonts.semibold
          : weight === 'medium'
            ? Fonts.medium
            : Fonts.regular;
    return { fontFamily: family, fontSize: size };
  },
};
