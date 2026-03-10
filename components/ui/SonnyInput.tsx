import React, { useState, useMemo } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/contexts/ThemeContext';
import { FontSizes } from '@/constants/typography';
import { SonnyInputProps } from '@/interfaces/components/ui';

const SonnyInput: React.FC<SonnyInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  showPasswordToggle = false,
  error,
  disabled = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
  labelStyle,
  inputWrapStyle,
  inputStyle,
  errorStyle,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { marginBottom: 16 },
        label: { fontSize: FontSizes.body, color: colors.black, marginBottom: 8 },
        inputWrap: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.white,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.lightGrey,
        },
        inputWrapError: { borderColor: colors.red },
        input: {
          flex: 1,
          paddingVertical: 12,
          paddingHorizontal: 16,
          fontSize: FontSizes.body,
          color: colors.black,
          minHeight: 48,
        },
        inputDisabled: { color: colors.grey },
        toggle: { padding: 12 },
        error: { color: colors.red, marginTop: 4 },
      }),
    [colors]
  );

  return (
    <View style={[styles.container, style]}>
      {label && <Text weight="semiBold" style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={[styles.inputWrap, error && styles.inputWrapError, inputWrapStyle]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.grey}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          editable={!disabled}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          style={[styles.input, disabled && styles.inputDisabled, inputStyle]}
        />
        {showPasswordToggle && (
          <TouchableOpacity onPress={() => setIsPasswordVisible((v) => !v)} style={styles.toggle}>
            <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color={colors.grey} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text variant="caption" style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
};

export default SonnyInput;
