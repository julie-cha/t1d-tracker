
## Tech Stack
- React Native (Expo)
- TypeScript
- React Navigation
- AsyncStorage
- React Native Chart Kit

## Environment Setup

### Development Environment
```bash
# Run development environment
npm run start:dev
npm run android:dev
npm run ios:dev
npm run web:dev
```

### Production Environment
```bash
# Run production environment
npm run start:prod
npm run android:prod
npm run ios:prod
npm run web:prod
```

## Branch Strategy

- `main`: Production branch (stable code)
- `dev`: Development branch (features in development)

### Development Workflow

1. Develop new features in `dev` branch
2. Test completed features in `dev`
3. Merge stable code to `main`

## Environment Variables

Environment-specific configuration files:
- `.env.development`: Development environment settings
- `.env.production`: Production environment settings
- `.env.example`: Environment variables template

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run start:dev

# Run on iOS simulator (development)
npm run ios:dev

# Run on Android emulator (development)
npm run android:dev

# Run on web (development)
npm run web:dev
```

## Project Structure
```
src/
├── components/     # Reusable components
├── screens/        # Screen components
├── navigation/     # Navigation configuration
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
config/             # Environment configuration files
```

## License
MIT License
