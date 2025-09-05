## Project Structure

```
driver-app/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home page
│   └── +not-found.tsx     # 404 page
├── components/            # Reusable components
│   ├── common/           # Common components
│   │   └── MainContainer.tsx
│   └── ui/               # UI components
│       ├── SendvaButton.tsx
│       ├── SendvaInput.tsx
│       ├── SendvaPicker.tsx
│       ├── SendvaAuthSteps.tsx
│       └── SendvaDocPicker.tsx
├── constants/            # App constants
│   └── colors.ts         # Color palette
├── interfaces/           # TypeScript interfaces
│   ├── auth/            # Auth interfaces
│   └── components/      # Component interfaces
├── store/               # State management
│   └── auth.ts          # Auth store (Zustand)
├── types/               # Type definitions
├── utils/               # Utility functions
├── docs/                # Documentation & examples
│   ├── component-examples.tsx
│   └── fonts.tsx        # Font usage examples
└── assets/              # Static assets
```

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **NativeWind** for styling
- **Zustand** for state management
- **Expo Router** for navigation

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npx expo start
   ```

### ** or (clearing cache)**

```bash
npx expo start -c
```

3. **View component examples**
   - Check `docs/component-examples.tsx` for usage examples
   - All UI components are documented with props and examples

## Key Features

- **Reusable UI Components** - Custom button, input, picker, and document upload components
- **MainContainer** - Consistent layout wrapper with safe area handling
- **Typography System** - Custom font utilities and text components
- **State Management** - Zustand store for auth and registration data
- **TypeScript** - Full type safety throughout the application
- **Responsive Design** - NativeWind for consistent styling

## Documentation

- **Component Examples** - See `docs/component-examples.tsx` for comprehensive usage examples of all UI components
- **Font Usage** - See `docs/fonts.tsx` for typography and text component examples
