import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/themeContext';
import GlassCard from '@/components/common/GlassCard';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue?: string;
  placeholder?: string;
  onSelect: (option: DropdownOption) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  placeholder = 'Select an option',
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.trigger,
          { borderColor: '#D1D5DC', backgroundColor: theme.backgroundColor },
        ]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text
          style={[
            styles.triggerText,
            { color: selectedOption ? theme.textColor : '#9CA3AF' },
          ]}
        >
          {selectedOption?.label || placeholder}
        </Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={theme.textColor}
        />
      </TouchableOpacity>

      {isOpen && (
        <GlassCard
          style={[
            styles.dropdown,
            { borderColor: '#D1D5DC' },
          ]}
          fallbackStyle={{ backgroundColor: theme.backgroundColor }}
        >
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  item.value === selectedValue && styles.selectedOption,
                ]}
                onPress={() => {
                  onSelect(item);
                  setIsOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: theme.textColor },
                    item.value === selectedValue && styles.selectedOptionText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
            nestedScrollEnabled
            style={styles.list}
          />
        </GlassCard>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
  trigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  triggerText: {
    fontSize: 14,
    flex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 4,
    maxHeight: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  list: {
    maxHeight: 200,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedOption: {
    backgroundColor: 'rgba(21, 93, 252, 0.08)',
  },
  optionText: {
    fontSize: 14,
  },
  selectedOptionText: {
    color: '#155DFC',
    fontWeight: '600',
  },
});

export default Dropdown;
