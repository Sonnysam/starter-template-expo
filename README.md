# React Native Expo Starter Template

A React Native starter built with Expo, reusable UI components, light/dark theming, Zod validation, and a structured codebase. Ready for mobile app development with TypeScript and a design system.

## Features

- **Expo Router** – File-based navigation
- **Native Tabs** – iOS (SF Symbols) and Android (Material icons) via `expo-router/unstable-native-tabs`; web uses JS fallback
- **Form Sheet Bottom Sheet** – Native bottom sheet with detents via [Expo Router modals](https://docs.expo.dev/router/advanced/modals/#form-sheet-presentation)
- **Theming** – Light/dark mode with `ThemeContext`; colors adapt via `useTheme()`
- **Typography System** – `constants/typography.ts` (FontSizes, FontWeights, LineHeights); `constants/fonts.ts` (Poppins)
- **Custom UI Components** – Button, TextField, Picker, OtpInput, ImagePicker, DocPicker, Steps, BottomSheet, Link (external URLs)
- **Zod** – Form validation with react-hook-form; schemas in `lib/validation.ts` (login, signUp, otp)
- **TypeScript** – Full type safety
- **Zustand** – Lightweight state management
- **NativeWind** – Tailwind CSS for React Native
- **Poppins Font** – Custom fonts from `assets/fonts/`
- **AI Skills** – Cursor rules in `skills/` (React Native Expo core, API error handling)
- **Documentation** – Usage examples in `docs/`

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
│   ├── shared/          # Toast
│   └── ui/              # Button, TextField, Picker, OtpInput, ImagePicker, DocPicker, Steps, BottomSheet, Link
├── constants/
│   ├── colors.ts        # Light/dark palettes
│   ├── fonts.ts         # Poppins fonts
│   ├── typography.ts    # FontSizes, FontWeights, LineHeights
│   └── tabs.ts         # Tab config (sf/md icons)
├── contexts/            # ThemeContext (light/dark)
├── lib/
│   └── validation.ts    # Zod schemas (login, signUp, otp)
├── skills/              # AI skills (Cursor rules, Expo core, API error handling)
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
| **Theming** | `contexts/ThemeContext.tsx` – `useTheme()` for colors, light/dark toggle |
| **Typography** | `constants/typography.ts`, `constants/fonts.ts` |
| **Text component** | `components/common/Text` – variants: body, title, subtitle, caption |
| **Link** | `components/ui/Link` – External URLs (opens in browser on native) |
| **Zod validation** | `lib/validation.ts` – loginSchema, signUpSchema, otpSchema |
| **Native Tabs** | `app/(dash)/(tabs)/_layout.tsx` (native), `_layout.web.tsx` (web) |
| **Bottom Sheet** | `components/ui/BottomSheet`, `app/(dash)/sheet.tsx` |
| **AI Skills** | `skills/` – rules.md, react-native-expo-core.mdc, api-error-handling.mdc |
| **Usage examples** | `docs/README.md` – snippets for all components |

## Documentation

- **`docs/README.md`** – Copy-paste usage for typography, Text, Button, TextField, Picker, Link, Toast, OtpInput (with Zod), ImagePicker, BottomSheet, MainContainer
- **`docs/component-examples.tsx`** – Runnable demo of core components
- **`docs/fonts.tsx`** – Text component variants
- **`docs/toast.tsx`** – Toast usage
