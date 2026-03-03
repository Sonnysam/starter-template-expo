import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/common/Text';
import { Colors } from '@/constants/colors';
import { FontSizes } from '@/constants/typography';
import { SonnyDocPickerProps } from '@/interfaces/components/ui';

const DocCard: React.FC<{
  label: string;
  onPress: () => void;
  hasFile: boolean;
  formats: string;
  cardStyle?: object;
  cardLabelStyle?: object;
  cardHintStyle?: object;
}> = ({ label, onPress, hasFile, formats, cardStyle, cardLabelStyle, cardHintStyle }) => (
  <TouchableOpacity style={[styles.card, cardStyle]} onPress={onPress} activeOpacity={0.7}>
    <Ionicons
      name={hasFile ? 'checkmark-circle' : 'cloud-upload'}
      size={32}
      color={hasFile ? Colors.success : Colors.grey}
    />
    <Text weight="semiBold" style={[styles.cardLabel, cardLabelStyle]}>{label}</Text>
    <Text style={[styles.cardHint, cardHintStyle]}>{formats}</Text>
  </TouchableOpacity>
);

const SonnyDocPicker: React.FC<SonnyDocPickerProps> = ({
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
}) => (
  <View style={[styles.container, style]}>
    <Text variant="subtitle" weight="bold" style={[styles.title, titleStyle]}>{title}</Text>
    {singleMode ? (
      <DocCard
        label={frontLabel}
        onPress={onFrontPress}
        hasFile={!!frontFile}
        formats={supportedFormats}
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
          cardStyle={cardStyle}
          cardLabelStyle={cardLabelStyle}
          cardHintStyle={cardHintStyle}
        />
        <DocCard
          label={backLabel ?? 'Back'}
          onPress={onBackPress ?? (() => {})}
          hasFile={!!backFile}
          formats={supportedFormats}
          cardStyle={cardStyle}
          cardLabelStyle={cardLabelStyle}
          cardHintStyle={cardHintStyle}
        />
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  title: { marginBottom: 16 },
  row: { flexDirection: 'row' },
  card: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  cardLabel: { fontSize: FontSizes.md, color: Colors.black, marginTop: 8 },
  cardHint: { fontSize: FontSizes.caption, color: Colors.grey, marginTop: 4 },
});

export default SonnyDocPicker;
