# React Native Expo Starter Template

A React Native starter built with Expo, reusable UI components, and a structured codebase. Ready for mobile app development with TypeScript and a design system.

## Features

- **Expo Router** – File-based navigation
- **Native Tabs** – iOS (SF Symbols) and Android (Material icons) via `expo-router/unstable-native-tabs`; web uses JS fallback
- **Form Sheet Bottom Sheet** – Native bottom sheet with detents via [Expo Router modals](https://docs.expo.dev/router/advanced/modals/#form-sheet-presentation)
- **Typography System** – `constants/typography.ts` (FontSizes, FontWeights, LineHeights); `constants/fonts.ts` (Poppins)
- **Custom UI Components** – Button, Input, Picker, OTP, Image Picker, Doc Picker, Toast, Auth Steps, Bottom Sheet
- **TypeScript** – Full type safety
- **Zustand** – Lightweight state management
- **NativeWind** – Tailwind CSS for React Native
- **Poppins Font** – Custom fonts from `assets/fonts/`
- **Documentation** – Simple usage examples in `docs/`

## Setup

1. **Clone the project** and go into the folder:

   ```bash
   git clone <repository-url>
   cd starter-template-expo
   ```

2. **Install dependencies** (use one of):

   ```bash
   npm install
   ```

   or `bun install` / `yarn install`.

3. **Check and fix the Expo environment** (recommended):

   ```bash
   npx expo-doctor
   ```

   Or to validate and align package versions with the Expo SDK:

   ```bash
   npx expo install --check
   ```

   Fix any reported issues before starting the app.

4. **Start the app**:

   ```bash
   npx expo start
   ```

   Then open in iOS simulator, Android emulator, or scan the QR code with the Expo Go app.

## Project Structure

```
starter-app/
├── app/
│   ├── (dash)/(tabs)/   # Tab layout (Native Tabs on iOS/Android, JS on web)
│   ├── (dash)/sheet.tsx # Form sheet modal
│   ├── _layout.tsx      # Root layout, font loading
│   └── index.tsx
├── components/
│   ├── common/          # MainContainer, Text
│   ├── shared/          # SonnyToast
│   └── ui/              # SonnyButton, SonnyInput, SonnyPicker, SonnyOtpInput, SonnyImagePicker, SonnyDocPicker, SonnyAuthSteps, SonnyBottomSheet
├── constants/
│   ├── colors.ts
│   ├── fonts.ts         # Poppins fonts
│   ├── typography.ts    # FontSizes, FontWeights, LineHeights
│   └── tabs.ts         # Tab config (sf/md icons)
├── docs/                # Usage examples
│   ├── README.md        # Simple copy-paste snippets
│   ├── component-examples.tsx
│   ├── fonts.tsx
│   └── toast.tsx
├── config/              # Firebase, Supabase
├── store/               # Zustand
└── assets/fonts/        # Poppins font files
```

## Key Features

| Feature | Location |
|---------|----------|
| **Typography** | `constants/typography.ts`, `constants/fonts.ts` |
| **Text component** | `components/common/Text` – variants: body, title, subtitle, caption |
| **Native Tabs** | `app/(dash)/(tabs)/_layout.tsx` (native), `_layout.web.tsx` (web) |
| **Bottom Sheet** | `components/ui/SonnyBottomSheet`, `app/(dash)/sheet.tsx` |
| **Usage examples** | `docs/README.md` – concise snippets for all components |

## Documentation

- **`docs/README.md`** – Copy-paste usage for typography, Text, Button, Input, Picker, Toast, OTP, Image Picker, Bottom Sheet, MainContainer
- **`docs/component-examples.tsx`** – Runnable demo of core components
- **`docs/fonts.tsx`** – Text component variants
- **`docs/toast.tsx`** – Toast usage
