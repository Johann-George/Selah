# Selah

Quiet time & Bible study tracking – React Native (Expo) + TypeScript + Firebase.

**Figma design:** [Selah](https://www.figma.com/make/dTUIs5iTCjA1NWzf3yTvdK/Selah?t=GV6IqERfDpxoJpcA-1)

## Tech stack

- **React Native** with **Expo** (SDK 54)
- **TypeScript**
- **React Navigation** (native stack + bottom tabs)
- **Firebase**: Authentication (email; Google sign-in placeholder), Firestore (sessions)

## Project structure

```
src/
  config/          # Firebase init
  context/          # Auth context for screens
  hooks/            # useAuth, useTodaySession, useHeatmapData
  navigation/       # Root stack, Main tabs, Home stack
  screens/          # Onboarding, Home, Session, Reflection, Progress, Profile
  services/         # auth.ts, sessions.ts (Firestore CRUD)
  theme/            # colors, typography
  types/            # App and nav types
  components/       # Button, Input, Card
```

## Firebase setup

### 1. Create a Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project (or use an existing one).
2. Enable **Authentication** → Sign-in method → **Email/Password** (and optionally **Google**).
3. Create a **Firestore** database (start in test mode for development; secure rules before production).

### 2. Get config and env vars

1. Project settings → General → Your apps → Add app (iOS/Android or Web).
2. Copy the `firebaseConfig` object and expose it via environment variables so you don’t commit secrets.

Create a `.env` (and add `.env` to `.gitignore`) or use [Expo env](https://docs.expo.dev/guides/environment-variables/):

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

3. In `src/config/firebase.ts`, config is read from `process.env.EXPO_PUBLIC_*`. For Expo, ensure the app is restarted after changing env vars.

### 3. Firestore index (optional but recommended)

For “sessions by user ordered by date” the app uses:

- `collection('sessions')`
- `where('userId', '==', userId)`
- `orderBy('date', 'desc')`
- `limit(500)`

If Firestore prompts for a composite index, create it in the Firebase Console (Firestore → Indexes) for:

- Collection: `sessions`
- Fields: `userId` (Ascending), `date` (Descending)

### 4. Firestore security rules (example)

Tighten before production; example:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sessions/{sessionId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

### 5. Google sign-in (optional)

The app uses **email/password** auth. For **Google sign-in**:

- Implement OAuth (e.g. `expo-auth-session` or `@react-native-google-signin/google-signin`).
- Obtain an ID token and call `signInWithGoogle(idToken)` in `src/services/auth.ts` (see placeholder there).

## Run the app

```bash
npm install
npm start
```

Then open in Expo Go (scan QR) or run `npx expo run:ios` / `npx expo run:android`.

## Assumptions and extensions

- **Design:** UI uses a calm, devotional palette and typography; align with your Figma tokens when you have them.
- **Onboarding:** Single welcome screen with Get started / Sign in. You can add slides or skip later.
- **Users collection:** User data is read from Firebase Auth only. To mirror to Firestore `users/{uid}`, add a write on sign-up (and optionally on sign-in) in `auth.ts`.
- **Reflection:** Only Q, U, A are implemented. L (Life), I (Iniquities), T (Tell) are stubbed in types and can be added as extra inputs on the Reflection screen.
- **Heatmap:** Last 12 weeks; intensity by session count per day. Date range and styling can be tuned to match Figma.

## License

Private.
