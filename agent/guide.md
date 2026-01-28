# Engineering Rules & Build Principles

## Platform Strategy

- The app is built for **both iOS and Android**
- **iOS-first development approach**
  - Uses **Liquid Glass–inspired modern iOS design**
  - Tab navigation uses **Expo Router native tabs** (`expo-router/unstable-native-tabs`) for native tab bar / liquid glass effect
- **Navigation**: **Expo Router** (file-based routing)
  - Route groups: `(auth)` for auth screens, `(dash)/(tabs)` for main app with native tabs
  - Tab configuration lives in `constants/tabs.ts` (name, label, SF Symbol / drawable icons)
- Platform differences are handled using **Expo platform extensions**
  - Reference: https://docs.expo.dev/more/glossary-of-terms/#platform-extensions
- Android support is maintained, but **iOS drives all design and interaction decisions**

---

## Tech Stack Constraints

- Built with **React Native + Expo**
- **Expo Router** for file-based routing and native tabs
- Use **Expo SDKs and Expo-compatible libraries only**
- No custom native code
- State management: **Zustand**
- Backend: **Firebase, Supabase or Custom** (config in `config/firebase.ts`, `config/supabase.ts`)
- **Path alias**: Use `@/` for imports (e.g. `@/constants/colors`, `@/components/common/Text`)
- Images:
  - **Use `expo-image` only** when adding image UI
  - ❌ Do NOT use `Image` from `react-native`
- Text:
  - ❌ Never import `Text` from `react-native`
  - ✅ Always use the custom **Text** component from `components/common/Text` (or `@/components/common/Text`)

---

## Styling System

- Styling approach combines:
  - **NativeWind** for simple utility-based styling (ensure `global.css` is imported in root `app/_layout.tsx`)
  - **StyleSheet** for:
    - Complex layouts
    - Performance-critical styles
    - Platform-specific styles
- Avoid mixing NativeWind and StyleSheet unnecessarily in the same component

---

## State Management Rules

- **Use Zustand for all state management**
- **Avoid `useState` unless it's for minor, truly local UI state** (e.g., input focus, toggle visibility)
- All application state, form state, and shared state should live in Zustand stores
- Organize Zustand stores by domain (auth, user, etc.)
- Use Zustand's persist middleware for state that needs to survive app restarts
- Keep Zustand stores in the `store/` directory

---

## Code Organization Rules

- Keep code **highly modular**
- **Folder structure** (align with this template):
  - `app/` — Expo Router pages and layouts; use route groups `(auth)`, `(dash)/(tabs)` as in template
  - `components/common/` — Shared layout/typography (e.g. `MainContainer`, `Text`)
  - `components/shared/` — App-wide shared components (e.g. `SonnyToast`)
  - `components/ui/` — Reusable UI primitives (e.g. `SonnyButton`, `SonnyInput`, `SonnyPicker`, `SonnyAuthSteps`, `SonnyDocPicker`, `SonnyOtpInput`)
  - `config/` — App config (Firebase, Supabase)
  - `constants/` — Colors, fonts, tabs, and other constants
  - `interfaces/` — TypeScript interfaces by domain (auth, components, etc.)
  - `types/` — Type definitions (e.g. props types) when not interfaces
  - `store/` — Zustand stores
  - `hooks/` — Custom React hooks
  - `services/` — API and external integrations
  - `utils/` — Pure utilities
  - `docs/` — Usage examples and documentation (e.g. component-examples, fonts, toast)
- Any logic that can be reused **must live outside UI components**
- UI components should focus only on:
  - Layout
  - Composition
  - Minimal state (prefer Zustand over useState)

---

## TypeScript Rules

- Avoid using `any` as much as possible
- Always prefer:
  - Explicit types
  - Interfaces
  - Union types and enums where applicable
- **Interfaces**: Live in `interfaces/`, grouped by domain (e.g. `interfaces/auth`, `interfaces/components`), exported and reused
- **Types**: Use `types/` for type definitions (e.g. props, constants) when not using interfaces
- Use the **`@/` path alias** for imports (e.g. `@/interfaces/auth`, `@/types/contants/colors`)

---

## UI & Design System Rules

- Always use:
  - **Text** from `components/common/Text` (Poppins-based variants: body, title, subtitle, caption; weights: regular, medium, semiBold, bold)
  - **MainContainer** from `components/common/MainContainer` for screen layout and safe area
- Typography: Use **Poppins** and `constants/fonts` (sizes, weights) — loaded in root `_layout.tsx`
- Use only:
  - **Colors** from `constants/colors` (e.g. `Colors.primary`, `Colors.white`)
  - Defined spacing and sizing rules
- For toasts / overlays use shared components (e.g. `components/shared/SonnyToast`)
- Maintain:
  - Consistent typography
  - Consistent spacing
  - Consistent layout rhythm across all screens

---

## Firebase/Supabase Backend Rules

- **Config**: Keep Firebase/Supabase client config in `config/firebase.ts` and `config/supabase.ts`
- Firebase/Supabase logic must be:
  - Clean
  - Modular
  - Strongly typed
  - Easy to maintain
- Separate Firebase/Supabase logic into:
  - Auth services
  - User services
  - Notifications / alerts
- Each Firebase/Supabase responsibility should live in its **own file**; aggregate via a single entry or service layer (e.g. `services/`)
- UI should never directly contain Firebase/Supabase logic
- Avoid:
  - Unnecessary logs
  - Console logs
  - Comments
  - JSDoc blocks

---

## Code Quality Rules

- Avoid unnecessary comments
- Do not leave console logs in committed code
- Prefer readable code over clever code
- Keep implementations:
  - Simple
  - Understandable
  - Robust
- Avoid premature optimization while preventing technical debt

---

## Performance & Maintainability

- Keep components small and focused
- Avoid deeply nested components
- Prefer composition over inheritance
- Reuse logic via:
  - Hooks
  - Utilities
  - Services
- Code should always be easy to refactor and scale

---

## Build Philosophy

- Ship fast
- Keep the MVP lean
- Design for iteration
- Optimize for maintainability, not perfection
