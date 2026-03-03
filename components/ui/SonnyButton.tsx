import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/common/Text';
import { Colors } from '@/constants/colors';
import { FontSizes } from '@/constants/typography';
import { SonnyButtonProps } from '@/interfaces/components/ui';

const variantDefaults: Record<string, { bg: string; border?: string; textColor: string }> = {
  basic: { bg: Colors.primary, textColor: Colors.white },
  outline: { bg: 'transparent', border: Colors.primary, textColor: Colors.primary },
  custom: { bg: 'transparent', textColor: Colors.black },
};

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
  const { textColor } = variantDefaults[variant];
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
        <ActivityIndicator color={textStyle?.color ?? textColor} />
      ) : (
        <>
          {iconName && iconPosition === 'left' && (
            <Ionicons name={iconName} size={20} color={textStyle?.color ?? textColor} style={styles.iconLeft} />
          )}
          <Text weight="semiBold" style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
          {iconName && iconPosition === 'right' && (
            <Ionicons name={iconName} size={20} color={textStyle?.color ?? textColor} style={styles.iconRight} />
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
