import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface SocialButtonProps {
  title: string;
  icon?: ImageSourcePropType;
  onPress: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {icon && <Image source={icon} style={styles.icon} />}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DC',
    backgroundColor: '#FFFFFF',
    gap: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#101828',
  },
});

export default SocialButton;
