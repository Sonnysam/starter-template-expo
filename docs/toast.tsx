import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/common/Text';
import { useToast } from '@/components/shared/Toast';
import Button from '@/components/ui/Button';

export default function ToastExamples() {
  const { showToast, ToastComponent } = useToast();

  return (
    <View className="p-4 gap-4">
      <Text variant="title" weight="bold">
        Toast
      </Text>
      <Button
        title="Success"
        onPress={() => showToast('Done!', { type: 'success', title: 'Done', showIcon: true })}
      />
      <Button
        title="Error"
        onPress={() => showToast('Failed', { type: 'error', title: 'Error', showIcon: true })}
      />
      <ToastComponent />
    </View>
  );
}
