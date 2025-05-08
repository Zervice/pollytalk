# Authentication Setup with Supabase

This project uses Supabase for authentication with email/password and Google OAuth support.

## Setup Instructions

1. Create a Supabase project at [https://supabase.com](https://supabase.com)

2. Add the following environment variables to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. Configure Google OAuth in your Supabase project:
   - Go to Authentication > Providers > Google
   - Enable Google auth
   - Create a Google OAuth client ID and client secret from the [Google Cloud Console](https://console.cloud.google.com/)
   - Add your site URL to the authorized JavaScript origins
   - Add `https://your-project-url.supabase.co/auth/v1/callback` to the authorized redirect URIs
   - Save your Google client ID and client secret in Supabase

4. Configure Auth Redirect URLs in Supabase:
   - Go to Authentication > URL Configuration
   - Add your site URL as the Site URL
   - Add `/auth/callback` as a redirect URL

## Features Implemented

- Sign in with email/password
- Sign up with email/password
- Sign in/up with Google OAuth
- Password reset functionality
- Auth state management across the application
- Responsive UI for all auth pages
- Internationalization support (English and Chinese)

## File Structure

- `/src/contexts/auth-context.tsx` - Auth context provider for state management
- `/src/lib/supabase.ts` - Supabase client configuration
- `/src/app/auth/signin/page.tsx` - Sign in page
- `/src/app/auth/signup/page.tsx` - Sign up page
- `/src/app/auth/forgot-password/page.tsx` - Forgot password page
- `/src/app/auth/reset-password/page.tsx` - Reset password page
- `/src/app/auth/callback/route.ts` - OAuth callback handler

## Adding More OAuth Providers

To add more OAuth providers in the future:

1. Configure the provider in Supabase dashboard
2. Add the provider to the `signInWithOAuth` function in `auth-context.tsx`
3. Create UI components for the new provider
4. Add translations for the new provider

Example for adding GitHub authentication:

```typescript
const signInWithGitHub = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
}
```
