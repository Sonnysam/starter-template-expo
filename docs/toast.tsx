import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/common/Text';
import { useSonnyToast } from '@/components/shared/SonnyToast';
import SonnyButton from '@/components/ui/SonnyButton';

export default function ToastExamples() {
  const { showToast, ToastComponent } = useSonnyToast();

  return (
    <View className="p-4 gap-4">
      <Text variant="title" weight="bold">
        Toast
      </Text>
      <SonnyButton
        title="Success"
        onPress={() => showToast('Done!', { type: 'success', title: 'Done', showIcon: true })}
      />
      <SonnyButton
        title="Error"
        onPress={() => showToast('Failed', { type: 'error', title: 'Error', showIcon: true })}
      />
      <ToastComponent />
    </View>
  );
}
