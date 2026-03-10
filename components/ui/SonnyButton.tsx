import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/contexts/ThemeContext';
import { FontSizes } from '@/constants/typography';
import { SonnyButtonProps } from '@/interfaces/components/ui';

const SonnyButton: React.FC<SonnyButtonProps> = ({
  title,
  onPress,
  variant = 'basic',
  disabled = false,
  loading = false,
  style,
  textStyle,
  iconName,
  iconPosition = 'right',
}) => {
  const { colors } = useTheme();
  const variantDefaults: Record<string, { bg: string; border?: string; textColor: string }> = {
    basic: { bg: colors.primary, textColor: colors.white },
    outline: { bg: 'transparent', border: colors.primary, textColor: colors.primary },
    custom: { bg: 'transparent', textColor: colors.black },
  };
  const v = variantDefaults[variant];
  const btnStyle = [
    styles.base,
    { backgroundColor: v.bg },
    v.border && { borderWidth: 1, borderColor: v.border },
    disabled && styles.disabled,
    style,
  ];

  return (
    <TouchableOpacity
      style={btnStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={textStyle?.color ?? v.textColor} />
      ) : (
        <>
          {iconName && iconPosition === 'left' && (
            <Ionicons name={iconName} size={20} color={textStyle?.color ?? v.textColor} style={styles.iconLeft} />
          )}
          <Text weight="semiBold" style={[styles.text, { color: v.textColor }, textStyle]}>{title}</Text>
          {iconName && iconPosition === 'right' && (
            <Ionicons name={iconName} size={20} color={textStyle?.color ?? v.textColor} style={styles.iconRight} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
  },
  disabled: { opacity: 0.6 },
  text: { fontSize: FontSizes.body },
  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
});

export default SonnyButton;
