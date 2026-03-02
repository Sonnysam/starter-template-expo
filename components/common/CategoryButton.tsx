import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/constants/themeContext';

interface CategoryButtonProps {
  category: {
    id: number;
    emoji: string;
    label: string;
    isActive?: boolean;
  };
  isActive: boolean;
  onPress: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  isActive,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isActive
          ? styles.activeButton
          : [styles.inactiveButton, { backgroundColor: theme.backgroundColor }],
      ]}
      onPress={onPress}
    >
      <Text style={styles.emoji}>{category.emoji}</Text>
      <Text
        style={[
          styles.label,
          isActive ? styles.activeLabel : { color: theme.textColor },
        ]}
      >
        {category.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 8,
    gap: 6,
  },
  activeButton: {
    backgroundColor: '#155DFC',
  },
  inactiveButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emoji: {
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeLabel: {
    color: '#FFFFFF',
  },
});

export default CategoryButton;
