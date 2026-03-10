import React, { useRef, useCallback, useMemo } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { FontSizes } from '@/constants/typography';
import { Text } from '@/components/common/Text';
import type { OtpInputProps } from '@/interfaces/components/ui';

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value,
  onChangeText,
  error,
  circular = false,
  style,
  inputStyle,
  errorStyle,
}) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const size = circular ? 48 : 50;
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 20 },
        box: {
          backgroundColor: colors.grey + '20',
          borderWidth: 1,
          borderColor: colors.grey + '40',
          alignItems: 'center',
          justifyContent: 'center',
        },
        boxError: { borderColor: colors.red },
        input: {
          width: '100%',
          height: '100%',
          fontSize: FontSizes['3xl'],
          fontWeight: '800',
          color: colors.primary,
          textAlign: 'center',
        },
        error: { color: colors.red, textAlign: 'center', marginTop: 8 },
      }),
    [colors]
  );

  const handleChange = useCallback(
    (text: string, index: number) => {
      const next = [...value.split('')];
      next[index] = text;
      onChangeText(next.join('').slice(0, length));
      if (text && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [value, length, onChangeText]
  );

  const handleKeyPress = useCallback(
    (key: string, index: number) => {
      if (key === 'Backspace' && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [value]
  );

  const boxStyle = [
    styles.box,
    { width: size, height: size },
    circular ? { borderRadius: size / 2 } : { borderRadius: 8 },
    error && styles.boxError,
    inputStyle,
  ];

  return (
    <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
      <View style={[styles.container, style]}>
        {Array.from({ length }, (_, i) => (
          <View key={i} style={boxStyle}>
            <TextInput
              ref={(r) => { inputRefs.current[i] = r; }}
              style={styles.input}
              value={value[i] ?? ''}
              onChangeText={(t) => handleChange(t, i)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
              textContentType="oneTimeCode"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
        ))}
      </View>
      {error && <Text variant="caption" style={[styles.error, errorStyle]}>{error}</Text>}
    </TouchableOpacity>
  );
};

export default OtpInput;
