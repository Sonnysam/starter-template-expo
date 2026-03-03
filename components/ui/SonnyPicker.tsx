import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/common/Text';
import { Colors } from '@/constants/colors';
import { FontSizes } from '@/constants/typography';
import { SonnyPickerProps } from '@/interfaces/components/ui';

const SonnyPicker: React.FC<SonnyPickerProps> = ({
  label,
  placeholder = 'Select',
  value,
  onValueChange,
  items,
  error,
  disabled = false,
  style,
  labelStyle,
  pickerWrapStyle,
  pickerTextStyle,
  errorStyle,
  overlayStyle,
  sheetStyle,
  itemStyle,
  itemTextStyle,
  selectedItemStyle,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (item: string) => {
    onValueChange(item);
    setIsVisible(false);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text weight="semiBold" style={[styles.label, labelStyle]}>{label}</Text>}
      <TouchableOpacity
        style={[styles.pickerWrap, error && styles.pickerWrapError, pickerWrapStyle]}
        onPress={() => !disabled && setIsVisible(true)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.pickerText,
            !value && styles.placeholder,
            disabled && styles.disabled,
            pickerTextStyle,
          ]}
        >
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color={Colors.grey} style={styles.chevron} />
      </TouchableOpacity>
      {error && <Text variant="caption" style={[styles.error, errorStyle]}>{error}</Text>}

      <Modal visible={isVisible} transparent animationType="fade" onRequestClose={() => setIsVisible(false)}>
        <TouchableOpacity
          style={[styles.overlay, overlayStyle]}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={[styles.sheet, sheetStyle]}>
            <FlatList
              data={items}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.item, value === item && (selectedItemStyle ?? styles.itemSelected), itemStyle]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.itemText, itemTextStyle]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: FontSizes.body, color: Colors.black, marginBottom: 8 },
  pickerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
  },
  pickerWrapError: { borderColor: Colors.red },
  pickerText: { flex: 1, paddingVertical: 12, paddingHorizontal: 16, fontSize: FontSizes.body, color: Colors.black },
  placeholder: { color: Colors.grey },
  disabled: { color: Colors.grey },
  chevron: { padding: 12 },
  error: { color: Colors.red, marginTop: 4 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  sheet: { backgroundColor: Colors.white, borderRadius: 12, maxHeight: 300 },
  item: { paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: Colors.lightGrey },
  itemSelected: { backgroundColor: Colors.lightGrey },
  itemText: { fontSize: FontSizes.body, color: Colors.black },
});

export default SonnyPicker;
