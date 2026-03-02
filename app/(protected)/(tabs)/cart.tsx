import React, { useState, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import {
  Host,
  Button,
  Text as SwiftText,
} from '@expo/ui/swift-ui';
import {
  buttonStyle,
  controlSize,
  tint,
  font,
} from '@expo/ui/swift-ui/modifiers';
import { cartStyles as styles } from '@/styles/tabs/cart';
import { useRouter } from 'expo-router';
import MainContainer from '@/components/common/MainContainer';
import { useTheme } from '@/constants/themeContext';
import CartItem from '@/components/common/CartItem';
import PriceSummary from '@/components/common/PriceSummary';
import EmptyCartScreen from '@/components/common/EmptyCartScreen';
import { useAuthGate } from '@/hooks/useAuthGate';
import AuthPromptModal from '@/components/common/AuthPromptModal';
import cartData, {
  DELIVERY_FEE,
  PLATFORM_FEE_PERCENTAGE,
} from '@/constants/tempData/cartData';

export default function CartPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const { requireAuth, showAuthPrompt, authAction, dismissAuthPrompt } = useAuthGate();

  const [items, setItems] = useState(cartData.INITIAL_CART_ITEMS);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const handleIncrease = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecrease = (id: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (items.length === 0) {
    return (
      <MainContainer scrollable={false} edges={['top', 'left', 'right']}>
        <EmptyCartScreen />
      </MainContainer>
    );
  }

  return (
    <>
      <MainContainer scrollable={false} edges={['top', 'left', 'right']} style={{ paddingHorizontal: 0 }}>
        <View style={styles.header}>
          <Host matchContents>
            <SwiftText modifiers={[font({ size: 20, weight: 'bold' })]}>My Cart</SwiftText>
          </Host>
          <Host matchContents>
            <SwiftText modifiers={[font({ size: 14 })]}>{items.length} items</SwiftText>
          </Host>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
            />
          ))}

          <PriceSummary
            subtotal={subtotal}
            deliveryFee={DELIVERY_FEE}
            platformFeePercentage={PLATFORM_FEE_PERCENTAGE}
          />
        </ScrollView>

        <View style={styles.footer}>
          <Host matchContents>
            <Button
              label="Proceed to Checkout"
              modifiers={[
                buttonStyle('borderedProminent'),
                controlSize('large'),
                tint('#155DFC'),
              ]}
              onPress={() => {
                if (!requireAuth('checkout')) return;
                router.push('/checkout' as never);
              }}
            />
          </Host>
        </View>
      </MainContainer>

      <AuthPromptModal
        visible={showAuthPrompt}
        onDismiss={dismissAuthPrompt}
        action={authAction}
      />
    </>
  );
}
