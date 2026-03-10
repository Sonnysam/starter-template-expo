import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import BottomSheet from '@/components/ui/BottomSheet';
import Button from '@/components/ui/Button';
import { Text } from '@/components/common/Text';

export default function SheetScreen() {
  const canGoBack = router.canGoBack();

  return (
    <BottomSheet title="Example Sheet">
      <Text variant="body" style={styles.text}>
        Form sheet content. Drag to resize on iOS/Android.
      </Text>
      {canGoBack && (
        <Button title="Dismiss" onPress={() => router.back()} style={styles.button} />
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  text: { marginBottom: 16 },
  button: { marginTop: 8 },
});
