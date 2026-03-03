import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import SonnyBottomSheet from '@/components/ui/SonnyBottomSheet';
import SonnyButton from '@/components/ui/SonnyButton';
import { Text } from '@/components/common/Text';

export default function SheetScreen() {
  const canGoBack = router.canGoBack();

  return (
    <SonnyBottomSheet title="Example Sheet">
      <Text variant="body" style={styles.text}>
        Form sheet content. Drag to resize on iOS/Android.
      </Text>
      {canGoBack && (
        <SonnyButton title="Dismiss" onPress={() => router.back()} style={styles.button} />
      )}
    </SonnyBottomSheet>
  );
}

const styles = StyleSheet.create({
  text: { marginBottom: 16 },
  button: { marginTop: 8 },
});
