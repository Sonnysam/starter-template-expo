import { ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface SendvaButtonProps {
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

export interface SendvaInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

export interface SendaAuthStepsProps {
  currentStep: number;
  totalSteps: number;
  label?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  stepStyle?: ViewStyle;
  activeStepStyle?: ViewStyle;
  inactiveStepStyle?: ViewStyle;
}

export interface SendaDocPickerProps {
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
  cardStyle?: ViewStyle;
  labelStyle?: TextStyle;
  hintStyle?: TextStyle;
  iconStyle?: ViewStyle;
}

export interface SendvaPickerProps {
  label: string;
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  items: string[];
  error?: string;
  disabled?: boolean;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  itemStyle?: ViewStyle;
  selectedItemStyle?: ViewStyle;
}
