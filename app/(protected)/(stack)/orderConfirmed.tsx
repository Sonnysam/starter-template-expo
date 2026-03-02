import React from 'react';
import { View } from 'react-native';
import {
  Host,
  Form,
  Section,
  Button,
  Text as SwiftText,
  HStack,
  VStack,
  Spacer,
  Image as SwiftImage,
} from '@expo/ui/swift-ui';
import {
  buttonStyle,
  controlSize,
  tint,
  font,
  foregroundStyle,
} from '@expo/ui/swift-ui/modifiers';
import { useRouter } from 'expo-router';
import MainContainer from '@/components/common/MainContainer';
import { orderConfirmationData } from '@/constants/tempData/orderConfirmationData';

export default function OrderConfirmedScreen() {
  const router = useRouter();
  const data = orderConfirmationData;

  return (
    <MainContainer scrollable={false}>
      <Host style={{ flex: 1 }}>
        <Form>
          {/* Success Header */}
          <Section>
            <VStack>
              <SwiftImage
                systemName="checkmark.circle.fill"
                modifiers={[foregroundStyle('#10B981'), font({ size: 56 })]}
              />
              <SwiftText modifiers={[font({ size: 24, weight: 'bold' })]}>
                Order Confirmed!
              </SwiftText>
              <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 15 })]}>
                Your order has been placed successfully. You will receive a confirmation shortly.
              </SwiftText>
            </VStack>
          </Section>

          {/* Order Info */}
          <Section title="Order Details">
            <HStack>
              <SwiftText modifiers={[foregroundStyle('gray')]}>Order ID</SwiftText>
              <Spacer />
              <SwiftText modifiers={[font({ weight: 'medium' })]}>{data.orderId}</SwiftText>
            </HStack>
            <HStack>
              <SwiftText modifiers={[foregroundStyle('gray')]}>Estimated Delivery</SwiftText>
              <Spacer />
              <SwiftText modifiers={[font({ weight: 'medium' })]}>{data.estimatedDelivery}</SwiftText>
            </HStack>
            <HStack>
              <SwiftText modifiers={[foregroundStyle('gray')]}>Total Paid</SwiftText>
              <Spacer />
              <SwiftText modifiers={[font({ weight: 'bold' }), foregroundStyle('#155DFC')]}>
                GHC {data.totalPaid.toFixed(2)}
              </SwiftText>
            </HStack>
            <HStack>
              <SwiftText modifiers={[foregroundStyle('gray')]}>Payment Method</SwiftText>
              <Spacer />
              <SwiftText modifiers={[font({ weight: 'medium' })]}>{data.paymentMethod}</SwiftText>
            </HStack>
          </Section>

          {/* Items Summary */}
          <Section title={`${data.items.length} item${data.items.length > 1 ? 's' : ''}`}>
            {data.items.map((item: { name: string; quantity: number }, i: number) => (
              <HStack key={i}>
                <SwiftText modifiers={[foregroundStyle('gray')]}>{item.quantity}x</SwiftText>
                <SwiftText>{item.name}</SwiftText>
              </HStack>
            ))}
          </Section>

          {/* Actions */}
          <Section>
            <Button
              modifiers={[
                buttonStyle('borderedProminent'),
                controlSize('large'),
                tint('#155DFC'),
              ]}
              onPress={() => router.push('/(dash)/trackOrder' as never)}
            >
              <HStack>
                <SwiftImage systemName="location.fill" />
                <SwiftText>Track Order</SwiftText>
              </HStack>
            </Button>
            <Button
              label="Back to Home"
              modifiers={[buttonStyle('bordered'), controlSize('large')]}
              onPress={() => router.replace('/(dash)/(tabs)/home' as never)}
            />
          </Section>
        </Form>
      </Host>
    </MainContainer>
  );
}
