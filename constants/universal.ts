export const BaseUnit = 4;

export const UniversalScale = {
  '0': 0,
  '1': BaseUnit * 1,
  '2': BaseUnit * 2,
  '3': BaseUnit * 3,
  '4': BaseUnit * 4,
  '5': BaseUnit * 5,
  '6': BaseUnit * 6,
  '8': BaseUnit * 8,
  '10': BaseUnit * 10,
  '12': BaseUnit * 12,
  '16': BaseUnit * 16,
  '20': BaseUnit * 20,
  '24': BaseUnit * 24,
  '32': BaseUnit * 32,
  '40': BaseUnit * 40,
  '48': BaseUnit * 48,
  '64': BaseUnit * 64,
} as const;

export const universal = {
  baseUnit: BaseUnit,
  scale: UniversalScale,
  multiply: (factor: number) => BaseUnit * factor,
};
