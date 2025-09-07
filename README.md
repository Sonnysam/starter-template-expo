# React Native Expo Starter Template

A comprehensive React Native starter template built with Expo, featuring a modern tech stack, reusable UI components, and a well-structured codebase. This template provides everything you need to kickstart your mobile app development with TypeScript, state management, and a consistent design system.

## Features

- 🚀 **Expo Router** - File-based navigation system
- 🎨 **Custom UI Components** - Pre-built, reusable components with consistent styling
- 📱 **TypeScript** - Full type safety throughout the application
- 🎯 **State Management** - Zustand for lightweight state management
- 🎨 **NativeWind** - Tailwind CSS for React Native styling
- 📚 **Documentation** - Comprehensive examples and usage guides
- 🔧 **Development Ready** - Pre-configured with linting, formatting, and build tools

## Project Structure

```
starter-app/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home page
│   └── +not-found.tsx     # 404 page
├── components/            # Reusable components
│   ├── common/           # Common components
│   │   └── MainContainer.tsx
│   └── ui/               # UI components
│       ├── SonnyButton.tsx
│       ├── SonnyInput.tsx
│       ├── SonnyPicker.tsx
│       ├── SonnyAuthSteps.tsx
│       └── SonnyDocPicker.tsx
├── config/               # Configuration files
│   ├── firebase.ts       # Firebase configuration
│   └── supabase.ts       # Supabase configuration
├── constants/            # App constants
│   └── colors.ts         # Color palette
├── interfaces/           # TypeScript interfaces
│   ├── auth/            # Auth interfaces
│   └── components/      # Component interfaces
├── store/               # State management
│   └── auth.ts          # Auth store (Zustand)
├── hooks/               # Custom React hooks
├── services/            # API services and external integrations
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

2. **Check if packages are Expo compatible and up to date**

   ```bash
   npx expo install --check
   ```

3. **Start development server**

- `npx expo start`: Start Expo development server
- `npx expo start -c`: Start Expo server with cache clean

```

4. **View component examples**
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
```
