import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { SonnyPickerProps } from '@/interfaces/components/ui';

const SonnyPicker: React.FC<SonnyPickerProps> = ({
    label,
    placeholder,
    value,
    onValueChange,
    items,
    error,
    disabled = false,
    style,
    containerStyle,
    labelStyle,
    errorStyle,
    itemStyle,
    selectedItemStyle,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const getContainerStyle = (): ViewStyle => {
        return {
            marginBottom: 16,
            ...style,
        };
    };

    const getLabelStyle = (): TextStyle => {
        return {
            fontSize: 16,
            fontWeight: '600',
            color: Colors.black,
            marginBottom: 8,
            ...labelStyle,
        };
    };

    const getPickerContainerStyle = (): ViewStyle => {
        return {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.white,
            borderRadius: 8,
            borderWidth: error ? 1 : 0,
            borderColor: error ? Colors.red : 'transparent',
            shadowColor: Colors.black,
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
            ...containerStyle,
        };
    };

    const getPickerStyle = (): ViewStyle => {
        return {
            flex: 1,
            paddingVertical: 12,
            paddingHorizontal: 16,
            minHeight: 48,
            justifyContent: 'center',
        };
    };

    const getPickerTextStyle = (): TextStyle => {
        return {
            fontSize: 16,
            color: value ? Colors.black : Colors.grey,
            ...(disabled && { color: Colors.grey }),
        };
    };

    const getErrorStyle = (): TextStyle => {
        return {
            fontSize: 14,
            color: Colors.red,
            marginTop: 4,
            ...errorStyle,
        };
    };

    const getItemStyle = (): ViewStyle => {
        return {
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: Colors.lightGrey,
            ...itemStyle,
        };
    };

    const getSelectedItemStyle = (): ViewStyle => {
        return {
            backgroundColor: Colors.lightGrey,
            ...selectedItemStyle,
        };
    };

    const getItemTextStyle = (): TextStyle => {
        return {
            fontSize: 16,
            color: Colors.black,
        };
    };

    const handleItemSelect = (item: string) => {
        onValueChange(item);
        setIsVisible(false);
    };

    const renderItem = ({ item }: { item: string }) => (
        <TouchableOpacity
            style={[
                getItemStyle(),
                value === item && getSelectedItemStyle(),
            ]}
            onPress={() => handleItemSelect(item)}
            activeOpacity={0.7}
        >
            <Text style={getItemTextStyle()}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={getContainerStyle()}>
            <Text style={getLabelStyle()}>{label}</Text>
            <TouchableOpacity
                style={getPickerContainerStyle()}
                onPress={() => !disabled && setIsVisible(true)}
                disabled={disabled}
                activeOpacity={0.7}
            >
                <View style={getPickerStyle()}>
                    <Text style={getPickerTextStyle()}>
                        {value || placeholder}
                    </Text>
                </View>
                <View style={{ padding: 12 }}>
                    <Ionicons
                        name="chevron-down"
                        size={20}
                        color={Colors.grey}
                    />
                </View>
            </TouchableOpacity>
            {error && <Text style={getErrorStyle()}>{error}</Text>}

            <Modal
                visible={isVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setIsVisible(false)}
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        justifyContent: 'center',
                        padding: 20,
                    }}
                    activeOpacity={1}
                    onPress={() => setIsVisible(false)}
                >
                    <View
                        style={{
                            backgroundColor: Colors.white,
                            borderRadius: 12,
                            maxHeight: 300,
                            shadowColor: Colors.black,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                    >
                        <FlatList
                            data={items}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => `${item}-${index}`}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default SonnyPicker;
