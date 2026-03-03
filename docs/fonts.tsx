import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/common/Text';

export default function FontExamples() {
  return (
    <View className="p-4 gap-4">
      <Text variant="body" weight="regular">
        Body text
      </Text>
      <Text variant="title" weight="bold">
        Title
      </Text>
      <Text variant="caption" weight="regular">
        Caption
      </Text>
    </View>
  );
}
