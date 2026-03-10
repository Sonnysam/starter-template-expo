import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, type FieldError } from 'react-hook-form';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/contexts/ThemeContext';
import { SpacingValues } from '@/constants/spacing';
import { FontSizes } from '@/constants/typography';
import type { OtpInputProps } from '@/interfaces/components/ui';

function getErrorMessage(err?: FieldError | string) {
  if (!err) return undefined;
  return typeof err === 'string' ? err : err.message;
}

export default function OtpInput({
  length = 6,
  value: valueProp,
  onChangeText,
  error,
  control,
  name,
  rules,
  autoFocus = true,
  circular = false,
  style,
  boxStyle,
  errorStyle,
}: OtpInputProps) {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const { colors } = useTheme();
  const size = 48;

  const defaultBorderColor = colors.lightGrey;
  const errorBorderColor = colors.red;
  const focusBorderColor = colors.primary;

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [autoFocus]);

  const handleChange = useCallback(
    (
      text: string,
      index: number,
      currentValue: string,
      onChange?: (t: string) => void
    ) => {
      if (text.length > 1) {
        const pasted = text.replace(/\D/g, '').slice(0, length);
        const next = pasted.split('');
        const arr = [...currentValue.split('')];
        next.forEach((char, i) => {
          arr[Math.min(index + i, length - 1)] = char;
        });
        const result = arr.join('').slice(0, length);
        onChange?.(result);
        onChangeText?.(result);
        const nextIndex = Math.min(index + pasted.length, length - 1);
        inputRefs.current[nextIndex]?.focus();
        return;
      }

      const next = [...currentValue.split('')];
      next[index] = text;
      const result = next.join('').slice(0, length);
      onChange?.(result);
      onChangeText?.(result);
      if (text && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [length, onChangeText]
  );

  const handleKeyPress = useCallback(
    (
      key: string,
      index: number,
      currentValue: string,
      onChange?: (t: string) => void
    ) => {
      if (key === 'Backspace' && !currentValue[index] && index > 0) {
        const next = [...currentValue.split('')];
        next[index - 1] = '';
        const result = next.join('').slice(0, length);
        onChange?.(result);
        onChangeText?.(result);
        inputRefs.current[index - 1]?.focus();
      }
    },
    [length, onChangeText]
  );

  const renderBoxes = (
    value: string,
    onChange?: (t: string) => void,
    fieldError?: FieldError
  ) => {
    const displayError = fieldError ?? error;
    const hasError = !!displayError;
    const borderRadius = circular ? size / 2 : 12;

    return (
      <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
        <View style={[styles.container, style]}>
          {Array.from({ length }, (_, i) => {
            const digit = value[i] ?? '';
            const isFocused = focusedIndex === i;
            const boxBorderColor = hasError
              ? errorBorderColor
              : isFocused
                ? focusBorderColor
                : defaultBorderColor;
            return (
              <View
                key={i}
                style={[
                  styles.box,
                  {
                    width: size,
                    height: size,
                    borderRadius,
                    borderColor: boxBorderColor,
                  },
                  boxStyle,
                ]}
              >
                <TextInput
                  ref={(r) => {
                    inputRefs.current[i] = r;
                  }}
                  style={[styles.input, { color: colors.black }]}
                  value={digit}
                  onChangeText={(t) => handleChange(t, i, value, onChange)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, i, value, onChange)
                  }
                  onFocus={() => setFocusedIndex(i)}
                  onBlur={() => setFocusedIndex(null)}
                  keyboardType="numeric"
                  maxLength={length}
                  selectTextOnFocus
                  textContentType="oneTimeCode"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
            );
          })}
        </View>
        {displayError && (
          <Text
            variant="caption"
            style={[styles.error, { color: colors.red }, errorStyle]}
          >
            {getErrorMessage(displayError)}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value }, fieldState }) =>
          renderBoxes(value ?? '', (t) => onChange(t), fieldState.error)
        }
      />
    );
  }

  return renderBoxes(valueProp ?? '', onChangeText);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SpacingValues.sm,
    marginBottom: SpacingValues.md,
  },
  box: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: '100%',
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    textAlign: 'center',
  },
  error: {
    textAlign: 'center',
    marginTop: SpacingValues.sm,
  },
});
