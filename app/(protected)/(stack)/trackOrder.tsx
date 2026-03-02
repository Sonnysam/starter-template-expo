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
  font,
  foregroundStyle,
} from '@expo/ui/swift-ui/modifiers';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MainContainer from '@/components/common/MainContainer';
import { useTheme } from '@/constants/themeContext';
import { trackOrderData } from '@/constants/tempData/trackOrderData';

function StepIndicator({
  steps,
  currentStep,
}: {
  steps: typeof trackOrderData.steps;
  currentStep: number;
}) {
  return (
    <>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <HStack key={index}>
            <SwiftImage
              systemName={
                isCompleted
                  ? 'checkmark.circle.fill'
                  : isCurrent
                    ? 'circle.inset.filled'
                    : 'circle'
              }
              modifiers={[
                foregroundStyle(
                  isCompleted ? '#10B981' : isCurrent ? '#155DFC' : '#D1D5DB',
                ),
              ]}
            />
            <VStack>
              <SwiftText
                modifiers={[
                  font({ weight: isCompleted || isCurrent ? 'semibold' : 'regular' }),
                  foregroundStyle(isCompleted || isCurrent ? 'primary' : 'gray'),
                ]}
              >
                {step.title}
              </SwiftText>
              <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 13 })]}>
                {step.description}
              </SwiftText>
              {step.time && (
                <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 12 })]}>
                  {step.time}
                </SwiftText>
              )}
            </VStack>
          </HStack>
        );
      })}
    </>
  );
}

export default function TrackOrderScreen() {
  const router = useRouter();
  const { mode } = useTheme();
  const data = trackOrderData;

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
            <SwiftText modifiers={[font({ size: 18, weight: 'semibold' })]}>Track Order</SwiftText>
          </Host>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <Host style={{ flex: 1 }}>
        <Form>
          {/* Order Info */}
          <Section title="Order Info">
            <HStack>
              <SwiftText modifiers={[foregroundStyle('gray')]}>Order ID</SwiftText>
              <Spacer />
              <SwiftText modifiers={[font({ weight: 'medium' })]}>{data.orderId}</SwiftText>
            </HStack>
            <HStack>
              <SwiftText modifiers={[foregroundStyle('gray')]}>Estimated Arrival</SwiftText>
              <Spacer />
              <SwiftText modifiers={[font({ weight: 'medium' }), foregroundStyle('#155DFC')]}>
                {data.estimatedArrival}
              </SwiftText>
            </HStack>
          </Section>

          {/* Map Placeholder */}
          <Section>
            <VStack>
              <SwiftImage
                systemName="map"
                modifiers={[foregroundStyle('#D1D5DB'), font({ size: 48 })]}
              />
              <SwiftText modifiers={[foregroundStyle('gray')]}>Live Tracking Map</SwiftText>
            </VStack>
          </Section>

          {/* Delivery Status */}
          <Section title="Delivery Status">
            <StepIndicator steps={data.steps} currentStep={data.currentStep} />
          </Section>

          {/* Delivery Person */}
          {data.deliveryPerson && (
            <Section title="Delivery Person">
              <HStack>
                <SwiftImage systemName="person.circle.fill" modifiers={[font({ size: 36 }), foregroundStyle('#D1D5DB')]} />
                <VStack>
                  <SwiftText modifiers={[font({ weight: 'semibold' })]}>{data.deliveryPerson.name}</SwiftText>
                  <HStack>
                    <SwiftImage systemName="star.fill" modifiers={[foregroundStyle('#F59E0B'), font({ size: 12 })]} />
                    <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 13 })]}>
                      {data.deliveryPerson.rating}
                    </SwiftText>
                  </HStack>
                </VStack>
                <Spacer />
                <Button
                  systemImage="phone.fill"
                  modifiers={[buttonStyle('bordered'), foregroundStyle('#155DFC')]}
                  onPress={() => {}}
                />
                <Button
                  systemImage="message.fill"
                  modifiers={[buttonStyle('borderedProminent')]}
                  onPress={() => {}}
                />
              </HStack>
            </Section>
          )}
        </Form>
      </Host>
    </MainContainer>
  );
}
