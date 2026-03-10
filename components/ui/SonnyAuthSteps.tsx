import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/contexts/ThemeContext';
import { FontSizes } from '@/constants/typography';
import { SonnyAuthStepsProps } from '@/interfaces/components/ui';

const CIRCLE_SIZE = 24;

const SonnyAuthSteps: React.FC<SonnyAuthStepsProps> = ({
  currentStep,
  totalSteps,
  label,
  style,
  labelStyle,
  stepsStyle,
  stepStyle,
  activeStepStyle,
  inactiveStepStyle,
}) => {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { marginBottom: 24 },
        label: { marginBottom: 16 },
        row: { flexDirection: 'row', alignItems: 'center' },
        circle: {
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
          borderRadius: CIRCLE_SIZE / 2,
          alignItems: 'center',
          justifyContent: 'center',
        },
        circleActive: { backgroundColor: colors.primary },
        circleInactive: { backgroundColor: colors.lightGrey },
        circleText: { fontSize: FontSizes.sm, fontWeight: '600' },
        circleTextActive: { color: colors.white },
        circleTextInactive: { color: colors.grey },
        connector: { flex: 1, height: 2, marginHorizontal: 4, borderRadius: 1 },
        connectorComplete: { backgroundColor: colors.primary },
        connectorIncomplete: { backgroundColor: colors.lightGrey },
      }),
    [colors]
  );

  return (
  <View style={[styles.container, style]}>
    {label && <Text variant="subtitle" weight="bold" style={[styles.label, labelStyle]}>{label}</Text>}
    <View style={[styles.row, stepsStyle]}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum <= currentStep;
        const isLast = i === totalSteps - 1;
        const connectorComplete = stepNum < currentStep;
        return (
          <React.Fragment key={i}>
            <View
              style={[
                styles.circle,
                isCompleted ? (activeStepStyle ?? styles.circleActive) : (inactiveStepStyle ?? styles.circleInactive),
                stepStyle,
              ]}
            >
              <Text
                style={[
                  styles.circleText,
                  isCompleted ? styles.circleTextActive : styles.circleTextInactive,
                ]}
              >
                {stepNum}
              </Text>
            </View>
            {!isLast && (
              <View
                style={[
                  styles.connector,
                  connectorComplete ? styles.connectorComplete : styles.connectorIncomplete,
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  </View>
  );
};

export default SonnyAuthSteps;
