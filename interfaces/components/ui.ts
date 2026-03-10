import type { ReactNode } from 'react';
import type { Control, FieldError, RegisterOptions } from 'react-hook-form';
import type { TextInputProps } from 'react-native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ImagePickerOptions } from 'expo-image-picker';

export interface BackArrowProps {
  onPress?: () => void;
  size?: number;
  style?: ViewStyle;
}

export interface CollapsibleProps {
  title: string;
  children: ReactNode;
}

export interface DotsProps {
  stepCount: number;
  currentStep: number;
  style?: ViewStyle;
}

export interface InputProps extends TextInputProps {
  label?: string;
  error?: FieldError | string;
  control?: Control<any>;
  name?: string;
  rules?: RegisterOptions<any, any>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showAtSign?: boolean;
  showValidationIcon?: boolean;
  showPasswordToggle?: boolean;
  containerStyle?: ViewStyle;
}

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'basic' | 'outline' | 'custom';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
}

export interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  error?: string;
  disabled?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: ViewStyle;
  labelStyle?: TextStyle;
  inputWrapStyle?: ViewStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
}

export interface BottomSheetProps {
  title?: string;
  children: ReactNode;
  style?: ViewStyle;
}

export interface StepsProps {
  currentStep: number;
  totalSteps: number;
  label?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  stepsStyle?: ViewStyle;
  stepStyle?: ViewStyle;
  activeStepStyle?: ViewStyle;
  inactiveStepStyle?: ViewStyle;
}

export interface DocPickerProps {
  title: string;
  frontLabel: string;
  backLabel?: string;
  onFrontPress: () => void;
  onBackPress?: () => void;
  frontFile?: string | null;
  backFile?: string | null;
  supportedFormats?: string;
  singleMode?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  rowStyle?: ViewStyle;
  cardStyle?: ViewStyle;
  cardLabelStyle?: TextStyle;
  cardHintStyle?: TextStyle;
}

export interface PickerProps {
  label?: string;
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  items: string[];
  error?: string;
  disabled?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  pickerWrapStyle?: ViewStyle;
  pickerTextStyle?: TextStyle;
  errorStyle?: TextStyle;
  overlayStyle?: ViewStyle;
  sheetStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  itemTextStyle?: TextStyle;
  selectedItemStyle?: ViewStyle;
}

export interface OtpInputProps {
  length?: number;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  circular?: boolean;
  style?: ViewStyle;
  inputStyle?: ViewStyle;
  errorStyle?: TextStyle;
}

export interface ImagePickerProps {
  imageUri?: string | null;
  onPick: (uri: string) => void;
  onError?: (error: string) => void;
  label?: string;
  placeholder?: string;
  pickerOptions?: Partial<ImagePickerOptions>;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  imageStyle?: ImageStyle;
}
