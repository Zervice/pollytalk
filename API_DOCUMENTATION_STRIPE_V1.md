# PollyTalk API Documentation

This document outlines the API endpoints and request/response formats for the PollyTalk payment system.

## Base URL

All API endpoints are relative to: `https://api.pollytaklie.com/`

## API Endpoints

### Payment

#### Parameter Description

**type options:**
- `subscribe`: Subscription
- `extra_time_package`: Extra time package

**channel fixed value:**
- `web`: Web platform

#### Get Stripe Configuration

Retrieves Stripe public key and configuration.

- **URL**: `/web/payment/config`
- **Method**: `GET`
- **Authentication**: Required
- **Success Response** (200 OK):
  ```text
  pk_test_...
  ```

#### Get Payment Packages

Retrieves available payment packages.

- **URL**: `/web/payment`
- **Method**: `GET`
- **Authentication**: Required
- **Headers**:
  - `Authorization`: Bearer token for authentication
- **Query Parameters**:
  - `type`: Package type
  - `channel`: Channel
- **Success Response** (200 OK):
  ```json
  [
    {
      "id": 1,
      "salePrice": 999,
      "name": "Premium Plan",
      "type": "subscribe",
      "channel": "web",
      "originalPrice": 1299,
      "subscribe": {
        "studyHours": -999999999, // This is unlimited
        "validityPeriod": 1,
        "unit": "month",
        "remark": "Premium subscription"
      },
      "extraTimePackage": null,
      "onSales": true,
    },
    {
      "id": 2,
      "salePrice": 199,
      "name": "Extra Time Package",
      "type": "extra_time_package",
      "channel": "web",
      "originalPrice": 299,
      "subscribe": null,
      "extraTimePackage": {
        "studyHours": 10,
        "remark": "10 hours extra study time"
      },
      "onSales": true,
    }
  ]
  ```

#### Check Cancelable Subscription

Checks if user has cancelable subscription.

- **URL**: `/web/payment/cancelable`
- **Method**: `GET`
- **Authentication**: Required
- **Success Response** (200 OK):
  ```json
  {
    "cancelable": true,
    "subscriptionId": "sub_xxx"
  }
  ```

#### Cancel Subscription

Cancels user's current subscription.

- **URL**: `/web/payment/cancel`
- **Method**: `DELETE`
- **Authentication**: Required
- **Success Response** (200 OK):
  ```json
  {
  }
  ```

#### Create Subscription Session

Creates Stripe Checkout session for subscription payment.

- **URL**: `/web/payment/subscription`
- **Method**: `POST`
- **Authentication**: None (uses token parameter)
- **Content-Type**: `application/x-www-form-urlencoded`
- **Form Parameters**:
  - `id`: Package ID (Long, required)
  - `token`: JWT token for authentication (String, required)
- **Success Response** (302 Redirect):
  - Redirects to Stripe Checkout page
- **Callback URLs**:
  - Success: `https://www.pollytalkie.com?success=true`
  - Cancel: `https://www.pollytalkie.com?canceled=true`

#### Purchase Extra Time

Creates PaymentIntent for purchasing extra study time.

- **URL**: `/web/payment/extra-time`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "id": 123
  }
  ```
- **Success Response** (200 OK):
  ```json
  {
    "clientSecret": "pi_xxx_secret_xxx"
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Invalid package ID
  - `401 Unauthorized`: Not authenticated

### Member

#### Get Current Member

Retrieves the current user's member information.

- **URL**: `/web/member`
- **Method**: `GET`
- **Authentication**: Required
- **Headers**:
  - `Authorization`: Bearer token for authentication
- **Success Response** (200 OK):
  ```json
  {
    "id": 123,
    "name": "John Doe",
    "studySeconds": 3600,
    "expireAt": 1735689600000,
    "freeTrial": false,
    "packageId": 1,
    "source": "stripe",
    "unlimitedStudyTime": false // Whether it's an unlimited study time package
  }
  ```
- source: stripe/apple

When source is stripe or null, subscription can be made on the web platform

Not a member:  
- **Empty Response** (200 OK):
  ```json
  {}
  ```
- **Error Responses**:
  - `401 Unauthorized`: Not authenticated
  - `500 Internal Server Error`: Database connection error

## Error Responses

All error responses follow this format:

```json
{
  "error": "error_code",
  "message": "Human-readable error message",
  "statusCode": 400
}
```
