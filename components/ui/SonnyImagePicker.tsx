import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/contexts/ThemeContext';
import { FontSizes } from '@/constants/typography';
import { SonnyImagePickerProps } from '@/interfaces/components/ui';

const SonnyImagePicker: React.FC<SonnyImagePickerProps> = ({
  imageUri,
  onPick,
  onError,
  label,
  placeholder = 'Pick an image',
  pickerOptions,
  style,
  labelStyle,
  buttonStyle,
  buttonTextStyle,
  imageStyle,
}) => {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { marginBottom: 16 },
        label: { fontSize: FontSizes.body, color: colors.black, marginBottom: 8 },
        button: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: 16,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.lightGrey,
          borderStyle: 'dashed',
        },
        buttonText: { fontSize: FontSizes.body, color: colors.grey },
        imageWrap: { width: 120, height: 120, borderRadius: 8, overflow: 'hidden' },
        image: { width: '100%', height: '100%' },
      }),
    [colors]
  );

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      const msg = 'Permission to access media library is required.';
      onError?.(msg);
      Alert.alert('Permission required', msg);
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
      ...pickerOptions,
    });
    if (!result.canceled) {
      onPick(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text weight="semiBold" style={[styles.label, labelStyle]}>{label}</Text>}
      {imageUri ? (
        <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.imageWrap}>
          <Image source={{ uri: imageUri }} style={[styles.image, imageStyle]} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={pickImage} activeOpacity={0.8}>
          <Ionicons name="image-outline" size={24} color={colors.grey} />
          <Text style={[styles.buttonText, buttonTextStyle]}>{placeholder}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SonnyImagePicker;
