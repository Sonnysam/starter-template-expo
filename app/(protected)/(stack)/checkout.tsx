import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Host,
  Form,
  Section,
  Button,
  Text,
  HStack,
  VStack,
  Spacer,
  Image,
} from '@expo/ui/swift-ui';
import {
  buttonStyle,
  controlSize,
  tint,
  font,
  foregroundStyle,
} from '@expo/ui/swift-ui/modifiers';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MainContainer from '@/components/common/MainContainer';
import { useTheme } from '@/constants/themeContext';
import { checkoutData } from '@/constants/tempData/checkoutData';

export default function CheckoutScreen() {
  const router = useRouter();
  const { mode } = useTheme();

  const [selectedDelivery, setSelectedDelivery] = useState(
    checkoutData.deliveryMethods[0]?.id ?? 'standard',
  );
  const [selectedPayment, setSelectedPayment] = useState(
    checkoutData.paymentMethods[0]?.id ?? 'momo',
  );

  const handlePlaceOrder = () => {
    router.push('/(protected)/(stack)/orderConfirmed' as never);
  };

  return (
    <MainContainer scrollable={false}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={mode === 'dark' ? '#FFF' : '#101828'}
          onPress={() => router.back()}
        />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Host matchContents>
            <Text modifiers={[font({ size: 18, weight: 'semibold' })]}>Checkout</Text>
          </Host>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* SwiftUI Form */}
      <Host style={{ flex: 1 }}>
        <Form>
          {/* Order Summary */}
          <Section title="Order Summary">
            {checkoutData.items.map((item) => (
              <HStack key={item.id}>
                <Image systemName="cube" />
                <VStack>
                  <Text modifiers={[font({ weight: 'medium' })]}>{item.name}</Text>
                  <Text modifiers={[foregroundStyle('gray'), font({ size: 13 })]}>
                    Qty: {item.quantity}
                  </Text>
                </VStack>
                <Spacer />
                <Text modifiers={[font({ weight: 'semibold' })]}>
                  GHC {item.price.toFixed(2)}
                </Text>
              </HStack>
            ))}
          </Section>

          {/* Delivery Method */}
          <Section title="Delivery Method">
            {checkoutData.deliveryMethods.map((method) => (
              <Button
                key={method.id}
                modifiers={[buttonStyle('plain')]}
                onPress={() => setSelectedDelivery(method.id)}
              >
                <HStack>
                  <Image
                    systemName={
                      selectedDelivery === method.id
                        ? 'checkmark.circle.fill'
                        : 'circle'
                    }
                  />
                  <VStack>
                    <Text modifiers={[font({ weight: 'medium' })]}>{method.name}</Text>
                    <Text modifiers={[foregroundStyle('gray'), font({ size: 13 })]}>
                      {method.estimate}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text modifiers={[font({ weight: 'semibold' })]}>
                    {method.price === 0 ? 'Free' : `GHC ${method.price.toFixed(2)}`}
                  </Text>
                </HStack>
              </Button>
            ))}
          </Section>

          {/* Payment Method */}
          <Section title="Payment Method">
            {checkoutData.paymentMethods.map((method) => (
              <Button
                key={method.id}
                modifiers={[buttonStyle('plain')]}
                onPress={() => setSelectedPayment(method.id)}
              >
                <HStack>
                  <Image
                    systemName={
                      selectedPayment === method.id
                        ? 'checkmark.circle.fill'
                        : 'circle'
                    }
                  />
                  <VStack>
                    <Text modifiers={[font({ weight: 'medium' })]}>{method.name}</Text>
                    {method.detail && (
                      <Text modifiers={[foregroundStyle('gray'), font({ size: 13 })]}>
                        {method.detail}
                      </Text>
                    )}
                  </VStack>
                </HStack>
              </Button>
            ))}
          </Section>

          {/* Price Summary */}
          <Section title="Price Summary">
            <HStack>
              <Text>Subtotal</Text>
              <Spacer />
              <Text>GHC {checkoutData.subtotal.toFixed(2)}</Text>
            </HStack>
            <HStack>
              <Text>Delivery Fee</Text>
              <Spacer />
              <Text>GHC {checkoutData.deliveryFee.toFixed(2)}</Text>
            </HStack>
            <HStack>
              <Text>Service Fee</Text>
              <Spacer />
              <Text>GHC {checkoutData.serviceFee.toFixed(2)}</Text>
            </HStack>
            <HStack>
              <Text modifiers={[font({ weight: 'bold' })]}>Total</Text>
              <Spacer />
              <Text modifiers={[font({ weight: 'bold', size: 18 })]}>
                GHC {checkoutData.total.toFixed(2)}
              </Text>
            </HStack>
          </Section>

          {/* Buyer Protection */}
          <Section>
            <HStack>
              <Image systemName="shield.checkered" />
              <Text modifiers={[foregroundStyle('green'), font({ size: 13 })]}>
                Buyer Protection: Full refund if item is not as described
              </Text>
            </HStack>
          </Section>

          {/* Place Order */}
          <Section>
            <Button
              label="Place Order"
              modifiers={[
                buttonStyle('borderedProminent'),
                controlSize('large'),
                tint('#155DFC'),
              ]}
              onPress={handlePlaceOrder}
            />
          </Section>
        </Form>
      </Host>
    </MainContainer>
  );
}
