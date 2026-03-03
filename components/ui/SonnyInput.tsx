import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/common/Text';
import { Colors } from '@/constants/colors';
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

  return (
    <View style={[styles.container, style]}>
      {label && <Text weight="semiBold" style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={[styles.inputWrap, error && styles.inputWrapError, inputWrapStyle]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.grey}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          editable={!disabled}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          style={[styles.input, disabled && styles.inputDisabled, inputStyle]}
        />
        {showPasswordToggle && (
          <TouchableOpacity onPress={() => setIsPasswordVisible((v) => !v)} style={styles.toggle}>
            <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color={Colors.grey} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text variant="caption" style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: FontSizes.body, color: Colors.black, marginBottom: 8 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
  inputWrapError: { borderColor: Colors.red },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: FontSizes.body,
    color: Colors.black,
    minHeight: 48,
  },
  inputDisabled: { color: Colors.grey },
  toggle: { padding: 12 },
  error: { color: Colors.red, marginTop: 4 },
});

export default SonnyInput;
