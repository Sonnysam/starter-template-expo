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
import Button from '@/components/ui/Button';

<Button title="Submit" onPress={() => {}} />
<Button title="Cancel" onPress={() => {}} variant="outline" />
<Button title="Save" onPress={save} iconName="save" iconPosition="left" loading={isLoading} />
```

Variants: `basic` | `outline` | `custom`

## Link (External)

```tsx
import { Link } from '@/components/ui/Link';

<Link href="https://github.com/username">
  <Text>Open in browser</Text>
</Link>
```

Opens external URLs in the system browser on native; uses `target="_blank"` on web.

## Input

```tsx
import TextField from '@/components/ui/TextField';

<TextField
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
/>
<TextField label="Password" value={pw} onChangeText={setPw} secureTextEntry showPasswordToggle />
```

## Picker

```tsx
import Picker from '@/components/ui/Picker';

<Picker
  label="Country"
  placeholder="Select"
  value={country}
  onValueChange={setCountry}
  items={['Ghana', 'Nigeria', 'Kenya']}
/>
```

## Toast

```tsx
import { useToast, showToast } from '@/components/shared/Toast';

// Hook (per-screen)
const { showToast, ToastComponent } = useToast();
showToast('Saved!', { type: 'success', title: 'Done', showIcon: true });
return <><YourUI /><ToastComponent /></>;

// Global (wrap app with ToastProvider)
showToast('Error', { type: 'error', title: 'Oops' });
```

Types: `success` | `error` | `warning` | `info`

## OTP Input

```tsx
import OtpInput from '@/components/ui/OtpInput';

// Standalone
<OtpInput length={6} value={otp} onChangeText={setOtp} error={errorMsg} />
<OtpInput length={6} value={otp} onChangeText={setOtp} circular />

// With react-hook-form + zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v3';
import { otpSchema } from '@/lib/validation';

const schema = z.object({ code: otpSchema(6) });
const { control } = useForm({ resolver: zodResolver(schema), defaultValues: { code: '' } });

<OtpInput control={control} name="code" length={6} rules={{ required: 'Enter 6 digits' }} />
```

## Image Picker

```tsx
import ImagePicker from '@/components/ui/ImagePicker';

<ImagePicker imageUri={uri} onPick={setUri} label="Photo" />
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
import BottomSheet from '@/components/ui/BottomSheet';

export default function SheetScreen() {
  return (
    <BottomSheet title="Title">
      <Text>Content</Text>
    </BottomSheet>
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
