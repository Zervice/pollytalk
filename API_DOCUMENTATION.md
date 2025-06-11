# PollyTalk API Documentation

This document outlines the API endpoints and request/response formats for the PollyTalk authentication system.

## Base URL

All API endpoints are relative to: `https://api.pollytalkie.com`

## Authentication

Most endpoints require authentication using a Bearer token:

```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication

#### Sign In

Authenticates a user with email and password.

- **URL**: `/web/auth/signin`
- **Method**: `POST`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Success Response** (200 OK):
  ```json
  {
    "user": {
      "id": "user123",
      "email": "user@example.com",
      "name": "John Doe",
      "avatar": "https://example.com/avatar.jpg",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    },
    "member":{
      "name":"Aggressive/Unlimited",
      "expireAt":1746709992780,
      "studySeconds":54000
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Invalid credentials
  - `429 Too Many Requests`: Too many login attempts


####  Notify Code

Send register notify code

- **URL**: `/web/notify`
- **Method**: `POST`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "receiver": "user@example.com",
    "type": "signup",
  }
  ```
- **Success Response** (200 Created):
  ```json
  {
   "id":"veryfy code id"
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Invalid input
  - `409 Conflict`: Email already exists  
  

#### Sign Up

Registers a new user.

- **URL**: `/web/auth/signup`
- **Method**: `POST`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword",
    "code":"verify code",
    "id":"verify code id",
    "name": "John Doe"
  }
  ```
- **Success Response** (201 Created):
  ```json
  {
    "user": {
      "id": "user123",
      "loginName": "user@example.com",
      "name": "John Doe",
      "avatar": "a1_ejxsaqqa70g0",
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Invalid input
  - `409 Conflict`: Email already exists

#### Sign Out

Signs out the current user.

- **URL**: `/web/auth/signout`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**: None
- **Success Response** (200 OK):
  ```json
  {}
  ```

#### Get Current User

Retrieves the profile of the currently authenticated user.

- **URL**: `/web/auth/me`
- **Method**: `GET`
- **Authentication**: Required
- **Success Response** (200 OK):
  ```json
  {
     "id": "user123",
     "loginName": "user@example.com",
     "name": "John Doe",
     "avatar": "a1_ejxsaqqa70g0",
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Not authenticated

#### Refresh Token

Refreshes an authentication token using a refresh token.

- **URL**: `/web/auth/refresh`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**:
  ```json
  {}
  ```
- **Success Response** (200 OK):
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Invalid refresh token

### OAuth Authentication

#### Get Google Auth URL

Returns a URL to redirect the user to for Google authentication.

- **URL**: `/web/auth/google`
- **Method**: `GET`
- **Query Parameters**:
  - `redirectUrl`: URL to redirect to after authentication
- **Success Response** (200 OK):
  ```json
  {
    "url": "https://accounts.google.com/o/oauth2/v2/auth?..."
  }
  ```

#### OAuth Callback

Exchanges an OAuth code for authentication tokens.

- **URL**: `/web/auth/oauth/callback`
- **Method**: `POST`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "code": "4/P7q7W91a-oMsCeLvIaQm6bTrgtp7",
    "provider": "google",
    "redirectUrl": "https://example.com/auth/callback"
  }
  ```
- **Success Response** (200 OK):
  ```json
  {
    "user": {
      "id": "user123",
      "loginName": "user@example.com",
      "name": "John Doe",
      "avatar": "a1_ejxsaqqa70g0",
    },
    "member":{
      "name":"Aggressive/Unlimited",
      "expireAt":1746709992780,
      "studySeconds":54000
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Invalid code
  - `401 Unauthorized`: Authentication failed

### Password Management

#### Forgot Password

Sends a password reset email to the user.

- **URL**: `/web/auth/forgot-password`
- **Method**: `POST`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "redirectUrl": "https://example.com/auth/reset-password"
  }
  ```
- **Success Response** (200 OK):
  ```json
  {}
  ```
- **Note**: For security reasons, this endpoint always returns a success response even if the email doesn't exist.

#### Reset Password

Resets a user's password using a reset token.

- **URL**: `/web/auth/reset-password`
- **Method**: `POST`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "token": "reset-token-from-email",
    "password": "new-password"
  }
  ```
- **Success Response** (200 OK):
  ```json
  {  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Invalid password
  - `401 Unauthorized`: Invalid or expired token

### User Profile

#### Update Profile

Updates the current user's profile.

- **URL**: `/web/auth/profile`
- **Method**: `PUT`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "name": "New Name",
    "avatar": "a1_ejxsaqqa70g0"
  }
  ```
- **Success Response** (200 OK):
  ```json
   {
      "id": "user123",
      "loginName": "user@example.com",
      "name": "New Nameßß",
      "avatar": "a1_ejxsaqqa70g0",
    }
  ```
- **Error Responses**:
  - `400 Bad Request`: Invalid input
  - `401 Unauthorized`: Not authenticated

## Error Responses

All error responses follow this format:

```json
{
  "error": "error_code",
  "message": "Human-readable error message",
  "statusCode": 400
}
```

Common error codes:
- `invalid_credentials`: Email or password is incorrect
- `email_already_exists`: Email is already registered
- `invalid_email`: Email format is invalid
- `weak_password`: Password doesn't meet strength requirements
- `user_not_found`: User not found
- `invalid_token`: Token is invalid
- `expired_token`: Token has expired
- `too_many_requests`: Rate limit exceeded
- `account_not_verified`: Account email is not verified
