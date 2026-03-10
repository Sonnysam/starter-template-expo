import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/contexts/ThemeContext';
import { FontSizes } from '@/constants/typography';
import type { DocPickerProps } from '@/interfaces/components/ui';

const DocCard: React.FC<{
  label: string;
  onPress: () => void;
  hasFile: boolean;
  formats: string;
  colors: { success: string; grey: string; white: string; lightGrey: string; black: string };
  cardStyle?: object;
  cardLabelStyle?: object;
  cardHintStyle?: object;
}> = ({ label, onPress, hasFile, formats, colors, cardStyle, cardLabelStyle, cardHintStyle }) => (
  <TouchableOpacity
    style={[
      {
        flex: 1,
        marginHorizontal: 4,
        backgroundColor: colors.white,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.lightGrey,
        borderStyle: 'dashed',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 120,
      },
      cardStyle,
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Ionicons
      name={hasFile ? 'checkmark-circle' : 'cloud-upload'}
      size={32}
      color={hasFile ? colors.success : colors.grey}
    />
    <Text
      weight="semiBold"
      style={[{ fontSize: FontSizes.md, color: colors.black, marginTop: 8 }, cardLabelStyle]}
    >
      {label}
    </Text>
    <Text style={[{ fontSize: FontSizes.caption, color: colors.grey, marginTop: 4 }, cardHintStyle]}>
      {formats}
    </Text>
  </TouchableOpacity>
);

const DocPicker: React.FC<DocPickerProps> = ({
  title,
  frontLabel,
  backLabel,
  onFrontPress,
  onBackPress,
  frontFile,
  backFile,
  supportedFormats = 'JPG, PNG, PDF',
  singleMode = false,
  style,
  titleStyle,
  rowStyle,
  cardStyle,
  cardLabelStyle,
  cardHintStyle,
}) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, style]}>
      <Text variant="subtitle" weight="bold" style={[styles.title, titleStyle]}>
        {title}
      </Text>
      {singleMode ? (
        <DocCard
          label={frontLabel}
          onPress={onFrontPress}
          hasFile={!!frontFile}
          formats={supportedFormats}
          colors={colors}
          cardStyle={cardStyle}
          cardLabelStyle={cardLabelStyle}
          cardHintStyle={cardHintStyle}
        />
      ) : (
        <View style={[styles.row, rowStyle]}>
          <DocCard
            label={frontLabel}
            onPress={onFrontPress}
            hasFile={!!frontFile}
            formats={supportedFormats}
            colors={colors}
            cardStyle={cardStyle}
            cardLabelStyle={cardLabelStyle}
            cardHintStyle={cardHintStyle}
          />
          <DocCard
            label={backLabel ?? 'Back'}
            onPress={onBackPress ?? (() => {})}
            hasFile={!!backFile}
            formats={supportedFormats}
            colors={colors}
            cardStyle={cardStyle}
            cardLabelStyle={cardLabelStyle}
            cardHintStyle={cardHintStyle}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  title: { marginBottom: 16 },
  row: { flexDirection: 'row' },
});

export default DocPicker;
