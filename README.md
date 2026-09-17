# Habit Up

A modern habit tracking application built with Expo and React Native to help users build and maintain positive habits.

## Features

- **User Authentication**
  - Email/password registration and login
  - Password recovery
  - Email verification
  - Profile management
  - Account deletion

- **Habit Management**
  - Create custom habits with icons and colors
  - Set daily, weekly, or custom frequency
  - Define goals (boolean or numeric)
  - Set reminder notifications
  - Track habit completion history
  - View detailed statistics and streaks

- **Dashboard**
  - Home screen with daily overview
  - Progress tracking
  - Next habits to complete
  - Statistics and summaries

- **User Interface**
  - Dark theme design
  - Smooth animations with React Native Reanimated
  - Bottom sheets and modals
  - Toast notifications
  - Tab-based navigation

## Tech Stack

- **Framework**: Expo SDK 57 with React Native 0.86
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Query (TanStack Query)
- **Backend**: Firebase (Authentication, Firestore)
- **Forms**: React Hook Form with Zod validation
- **UI Components**:
  - React Native Gesture Handler
  - React Native Reanimated
  - @gorhom/bottom-sheet
  - Lucide React Native icons
  - Sonner Native for toasts

## Project Structure

```
src/
├── app/                    # Expo Router pages
│   ├── (auth)/            # Authentication screens
│   ├── (screens)/         # Main feature screens
│   └── (tabs)/            # Tab navigation screens
├── components/            # Reusable components
│   ├── habits/           # Habit-related components
│   ├── home/             # Home screen components
│   ├── login/            # Authentication components
│   ├── profile/          # Profile components
│   └── ui/               # UI components (buttons, modals, etc.)
├── context/              # React Context providers
├── firebase/             # Firebase configuration
├── helpers/              # Utility functions
├── hooks/                # Custom React hooks
│   ├── auth/            # Authentication hooks
│   └── habits/          # Habit management hooks
├── lib/                  # Library configurations
├── services/             # API and business logic
│   ├── auth/            # Authentication services
│   ├── habits/          # Habit services
│   └── notifications/   # Notification services
└── styles/               # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (package manager)
- Expo CLI
- Android Studio or Xcode (for mobile development)

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd Habit-Up
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Set up environment variables
   - Copy `.env.local` example and configure your Firebase credentials
   - Ensure Firebase Authentication and Firestore are enabled

4. Start the development server
   ```bash
   pnpm start
   ```

### Running the App

- **iOS Simulator**: `pnpm ios`
- **Android Emulator**: `pnpm android`
- **Web**: `pnpm web`
- **Expo Go**: Scan QR code from Expo Dev Tools

## Available Scripts

- `pnpm start` - Start the development server
- `pnpm android` - Run on Android emulator/device
- `pnpm ios` - Run on iOS simulator/device
- `pnpm web` - Run in web browser
- `pnpm lint` - Run ESLint

## Firebase Configuration

The app uses Firebase for authentication and data storage. Make sure to configure:

1. **Authentication**: Enable Email/Password provider
2. **Firestore Database**: Create database with appropriate rules
3. **Environment Variables**: Set Firebase config in `.env.local`

## Development Notes

- The project uses Expo SDK 57 - refer to [versioned docs](https://docs.expo.dev/versions/v57.0.0/)
- File-based routing is used via Expo Router
- TypeScript is configured for type safety
- Tailwind CSS classes are used for styling via NativeWind

## License

This project is licensed under the MIT License - see the LICENSE file for details.
