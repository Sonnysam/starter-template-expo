import React, { useState, useMemo } from 'react';
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
  type PathValue,
  type RegisterOptions,
} from 'react-hook-form';
import {
  StyleSheet,
  TextInput,
  type TextInputProps,
  View,
  type ViewStyle,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/contexts/ThemeContext';
import { FontSizes } from '@/constants/typography';
import { SpacingValues } from '@/constants/spacing';
import type { InputProps } from '@/interfaces/components/ui';

function getErrorMessage(err?: FieldError | string) {
  if (!err) return undefined;
  return typeof err === 'string' ? err : err.message;
}

export const Input = React.forwardRef<TextInput, InputProps>(function Input(
  {
    label,
    error,
    control,
    name,
    rules,
    leftIcon,
    rightIcon,
    showAtSign = false,
    showValidationIcon = false,
    showPasswordToggle = false,
    containerStyle,
    style,
    secureTextEntry,
    ...textInputProps
  },
  ref
) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { colors } = useTheme();
  const isPasswordInput = secureTextEntry ?? false;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { marginBottom: SpacingValues.md, width: '100%' },
        label: { fontSize: FontSizes.body, color: colors.black, marginBottom: SpacingValues.sm, fontWeight: '600' },
        inputWrap: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.white,
          borderRadius: SpacingValues.sm,
          borderWidth: 1,
          minHeight: 48,
        },
        input: {
          flex: 1,
          paddingVertical: SpacingValues.md,
          paddingHorizontal: SpacingValues.md,
          fontSize: FontSizes.body,
          color: colors.black,
        },
        inputWithLeftIcon: { marginLeft: 0, paddingLeft: SpacingValues.xs },
        inputWithRightIcon: { marginRight: SpacingValues.sm },
        iconWrap: {
          paddingLeft: SpacingValues.sm,
          paddingRight: 0,
          paddingVertical: SpacingValues.md,
          justifyContent: 'center',
          alignItems: 'center',
        },
        error: { color: colors.red, marginTop: SpacingValues.xs, fontSize: FontSizes.caption },
      }),
    [colors]
  );

  function renderInput({
    value = (textInputProps as { value?: string }).value ?? '',
    onChange,
    onBlur,
    fieldError,
  }: {
    value?: string;
    onChange?: (text: string) => void;
    onBlur?: () => void;
    fieldError?: FieldError;
  }) {
    const currentError = fieldError ?? error;
    const msg = getErrorMessage(currentError);
    const err = !!currentError;
    const showSuccessIcon =
      showValidationIcon && !err && (typeof value === 'string' ? value.length > 0 : !!value);

    const borderColor = err ? colors.red : isFocused ? colors.primary : colors.lightGrey;

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text weight="semiBold" style={styles.label}>{label}</Text>}
        <View style={[styles.inputWrap, { borderColor }]}>
          {(showAtSign || leftIcon) && (
            <View style={styles.iconWrap}>
              {showAtSign ? (
                <Ionicons name="at" size={20} color={colors.grey} />
              ) : (
                leftIcon
              )}
            </View>
          )}
          <TextInput
            ref={ref}
            {...textInputProps}
            value={value}
            onChangeText={onChange}
            onBlur={() => {
              setIsFocused(false);
              onBlur?.();
            }}
            onFocus={(e) => {
              setIsFocused(true);
              textInputProps.onFocus?.(e);
            }}
            placeholderTextColor={colors.grey}
            secureTextEntry={isPasswordInput && !isPasswordVisible}
            editable={textInputProps.editable !== false}
            style={[
              styles.input,
              (leftIcon || showAtSign) ? styles.inputWithLeftIcon : undefined,
              rightIcon || isPasswordInput || showValidationIcon ? styles.inputWithRightIcon : undefined,
              style,
            ]}
          />
          {isPasswordInput ? (
            <Pressable onPress={() => setIsPasswordVisible((v) => !v)} style={styles.iconWrap}>
              <Ionicons
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={20}
                color={colors.grey}
              />
            </Pressable>
          ) : showValidationIcon && (err || showSuccessIcon) ? (
            <View style={styles.iconWrap}>
              <Ionicons
                name={err ? 'close-circle' : 'checkmark-circle'}
                size={20}
                color={err ? colors.red : colors.primary}
              />
            </View>
          ) : (
            rightIcon && <View style={styles.iconWrap}>{rightIcon}</View>
          )}
        </View>
        {msg && <Text variant="caption" style={styles.error}>{msg}</Text>}
      </View>
    );
  }

  if (control && name) {
    return (
      <Controller
        control={control as Control<FieldValues>}
        name={name as Path<FieldValues>}
        rules={rules as RegisterOptions<FieldValues, Path<FieldValues>>}
        render={({ field: { onChange, onBlur, value }, fieldState }) =>
          renderInput({
            value: value as string,
            onChange: (t: string) => onChange(t as PathValue<FieldValues, Path<FieldValues>>),
            onBlur,
            fieldError: fieldState.error,
          })
        }
      />
    );
  }

  return renderInput({});
});

Input.displayName = 'Input';
