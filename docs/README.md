# Usage Examples

Simple copy-paste examples for common patterns.

## Typography

```tsx
import { FontSizes, FontWeights, LineHeights } from '@/constants/typography';
import { fonts } from '@/constants/fonts';

// Font sizes (numeric + semantic)
fontSize: FontSizes.body     // 16
fontSize: FontSizes.heading  // 24
fontSize: FontSizes['2xl']   // 24

// With line height
lineHeight: FontSizes.caption * LineHeights.normal

// Font family
fontFamily: fonts.medium
```

## Text Component

```tsx
import { Text } from '@/components/common/Text';

<Text>Default body</Text>
<Text variant="title" weight="bold">Title</Text>
<Text variant="caption" weight="regular">Caption</Text>
<Text variant="body" weight="medium" style={{ color: '#333' }}>Custom</Text>
```

Variants: `body` | `title` | `subtitle` | `caption`  
Weights: `regular` | `medium` | `semiBold` | `bold`

## Button

```tsx
import SonnyButton from '@/components/ui/SonnyButton';

<SonnyButton title="Submit" onPress={() => {}} />
<SonnyButton title="Cancel" onPress={() => {}} variant="outline" />
<SonnyButton title="Save" onPress={save} iconName="save" iconPosition="left" loading={isLoading} />
```

Variants: `basic` | `outline` | `custom`

## Input

```tsx
import SonnyInput from '@/components/ui/SonnyInput';

<SonnyInput
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
/>
<SonnyInput label="Password" value={pw} onChangeText={setPw} secureTextEntry showPasswordToggle />
```

## Picker

```tsx
import SonnyPicker from '@/components/ui/SonnyPicker';

<SonnyPicker
  label="Country"
  placeholder="Select"
  value={country}
  onValueChange={setCountry}
  items={['Ghana', 'Nigeria', 'Kenya']}
/>
```

## Toast

```tsx
import { useSonnyToast, showSonnyToast } from '@/components/shared/SonnyToast';

// Hook (per-screen)
const { showToast, ToastComponent } = useSonnyToast();
showToast('Saved!', { type: 'success', title: 'Done', showIcon: true });
return <><YourUI /><ToastComponent /></>;

// Global (wrap app with SonnyToastProvider)
showSonnyToast('Error', { type: 'error', title: 'Oops' });
```

Types: `success` | `error` | `warning` | `info`

## OTP Input

```tsx
import SonnyOtpInput from '@/components/ui/SonnyOtpInput';

<SonnyOtpInput length={6} value={otp} onChangeText={setOtp} error={errorMsg} />
<SonnyOtpInput length={6} value={otp} onChangeText={setOtp} circular />
```

## Image Picker

```tsx
import SonnyImagePicker from '@/components/ui/SonnyImagePicker';

<SonnyImagePicker imageUri={uri} onPick={setUri} label="Photo" />
```

## Bottom Sheet (Form Sheet)

Uses [Expo Router form sheet](https://docs.expo.dev/router/advanced/modals/#form-sheet-presentation).

```tsx
// 1. Add sheet route in app/(dash)/_layout.tsx:
<Stack.Screen
  name="sheet"
  options={{
    presentation: 'formSheet',
    sheetAllowedDetents: [0.25, 0.5, 1],
    sheetGrabberVisible: true,
  }}
/>

// 2. Create app/(dash)/sheet.tsx:
import SonnyBottomSheet from '@/components/ui/SonnyBottomSheet';

export default function SheetScreen() {
  return (
    <SonnyBottomSheet title="Title">
      <Text>Content</Text>
    </SonnyBottomSheet>
  );
}

// 3. Open from any screen:
router.push('/(dash)/sheet');
```

## MainContainer

```tsx
import MainContainer from '@/components/common/MainContainer';

<MainContainer>
  <Text>Screen content</Text>
</MainContainer>
```

## Constants

```tsx
import { Colors } from '@/constants/colors';
import { FontSizes } from '@/constants/typography';

color: Colors.primary
fontSize: FontSizes.body
```
