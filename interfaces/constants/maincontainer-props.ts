import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface MainContainerProps {
  children: ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}
