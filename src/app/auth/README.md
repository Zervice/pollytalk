# Authentication Setup with Firebase

This project uses Firebase for authentication with email/password and Google OAuth support.

## Setup Instructions

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)

2. Add your Firebase credentials to your `.env.local` file:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

3. Configure Google OAuth in your Firebase project:
   - Go to Authentication > Sign-in method > Google
   - Enable Google sign-in
   - Configure the OAuth consent screen in the Google Cloud Console
   - Add your domain to the authorized domains list

4. Configure Auth Redirect URLs in Firebase:
   - Go to Authentication > Settings > Authorized domains
   - Add your site domain (e.g., `yourdomain.com`)

## Authentication Flow

The authentication flow is handled by the following components:

- `/src/contexts/auth-context.tsx` - Authentication context provider
- `/src/app/auth/signin/page.tsx` - Sign in page
- `/src/app/auth/signup/page.tsx` - Sign up page
- `/src/app/auth/callback/page.tsx` - OAuth callback handler
- `/src/app/auth/forgot-password/page.tsx` - Password reset request
- `/src/app/auth/reset-password/page.tsx` - Password reset form
- `/src/lib/firebase.ts` - Firebase client configuration

## Adding New OAuth Providers

To add a new OAuth provider (e.g., GitHub, Twitter):

1. Enable the provider in Firebase Authentication dashboard
2. Add a new sign-in function in the auth context:

```typescript
const signInWithGitHub = async () => {
  try {
    const provider = new GithubAuthProvider();
    // Add scopes if needed
    provider.addScope('user');
    
    // Set custom parameters
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    
    // Use redirect-based authentication for better compatibility with static hosting
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error('Error signing in with GitHub:', error);
  }
}
```

3. Add the sign-in button to the sign-in and sign-up pages
