# User Registration Endpoint Documentation

## Endpoint

**POST** `/api/v1/user/register`

## Description

This endpoint registers a new user. It validates the input data, checks if the user already exists, creates the user, and returns a JWT token.

## Request Body

The request body must be a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "string", // required, at least 3 characters
    "lastName": "string" // optional
  },
  "email": "user@example.com", // required, must be a valid email address
  "password": "string" // required, minimum of 6 characters
}
```

## Response

### Success Response

```json
{
  "token": "jwt_token_string",
  "newUser": {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Response

```json
{
  "message": "User already exists"
}
// or
{
  "message": "Validation errors",
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters",
      "param": "fullName.firstName",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters",
      "param": "password",
      "location": "body"
    }
  ]
}
```

## Example Request

```bash
curl -X POST http://localhost:8080/api/v1/user/register
 -H "Content-Type: application/json"
 -d '{
  "fullName": { "firstName": "John", "lastName": "Doe" },
  "email": "john.doe@example.com",
  "password": "secret123"
}'
```

# User Login Endpoint Documentation

## Endpoint

**POST** `/api/v1/user/login`

## Description

This endpoint logs in an existing user. It validates the input data, checks if the user exists, verifies the password, and returns a JWT token.

## Request Body

The request body must be a JSON object with the following structure:

```json
{
  "email": "user@example.com", // required, must be a valid email address
  "password": "string" // required, minimum of 6 characters
}
```

## Response

### Success Response

```json
{
  "token": "jwt_token_string",
  "userData": {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Response

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters",
      "param": "password",
      "location": "body"
    }
  ]
}
```

```json
{
  "message": "Invalid email or password"
}
```

## Example Request

```bash
curl -X POST http://localhost:8080/api/v1/user/login
     -H "Content-Type: application/json"
     -d '{
           "email": "john.doe@example.com",
           "password": "secret123"
         }'
```

# User Profile Endpoint Documentation

## Endpoint

**GET** `/api/v1/user/profile`

## Description

This endpoint retrieves the profile of the authenticated user. It requires a valid JWT token.

## Request Headers

The request must include a valid JWT token in the `Authorization` header or as a `cookie`.

## Responses

### Success Response

- **200 OK**

  - **Description:** User profile retrieved successfully.
  - **Response Body:** Returns a JSON object with the user's data.

  ```json
  {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

### Error Responses

- **401 Unauthorized**

  - **Description:** User is not authorized.
  - **Response Body:** Returns a JSON object with an error message.

  ```json
  {
    "message": "You are not authorized"
  }
  ```

- **404 Not Found**

  - **Description:** User not found.
  - **Response Body:** Returns a JSON object with an error message.

  ```json
  {
    "message": "User not found"
  }
  ```

## Example Request

```bash
curl -X GET http://localhost:8080/api/v1/user/profile
 -H "Authorization: Bearer jwt_token_string"
```

# User Logout Endpoint Documentation

## Endpoint

**GET** `/api/v1/user/logout`

## Description

This endpoint logs out the authenticated user by invalidating the JWT token. The token is added to a blacklist to prevent further use.

## Request Headers

The request must include a valid JWT token in the `Authorization` header or as a `cookie`.

## Responses

- **200 OK**

  - **Description:** User logged out successfully.
  - **Response Body:** Returns a success message.

  ```json
  {
    "message": "User logged out"
  }
  ```

- **401 Unauthorized**

  - **Description:** User is not authorized.
  - **Response Body:** Returns a JSON object with an error message.

  ```json
  {
    "message": "You are not authorized"
  }
  ```

## Example Request

```bash
curl -X GET http://localhost:8080/api/v1/user/logout
 -H "Authorization: Bearer jwt_token_string"
```

# Captain Registration Endpoint Documentation

## Endpoint

**POST** `/api/v1/captain/register`

## Description

This endpoint registers a new captain. It validates the input data, checks if the captain already exists, creates the captain, and returns a JWT token.

## Request Body

The request body must be a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "string", // required, at least 3 characters
    "lastName": "string" // optional
  },
  "email": "captain@example.com", // required, must be a valid email address
  "password": "string", // required, minimum of 6 characters
  "vehicle": {
    "color": "string", // required, at least 3 characters
    "plate": "string", // required, at least 3 characters
    "capacity": 1, // required, minimum of 1
    "vehicleType": "car" // required, must be one of: car, motorcycle, auto
  }
}
```

## Response

### Success Response

```json
{
  "token": "jwt_token_string",
  "newCaptain": {
    "_id": "captain_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error Response

- **400 Bad Request**
- **Description:** The request failed due to validation errors (e.g., invalid email, insufficient password length, etc.) or if the captain already exists.
- **Response Body:** Returns an error message and an array of detailed validation errors if applicable.

```json
{
  "message": "Captain already exists"
}
// or
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters",
      "param": "fullName.firstName",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Vehicle color must be at least 3 characters",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Vehicle plate must be at least 3 characters",
      "param": "vehicle.plate",
      "location": "body"
    },
    {
      "msg": "Capacity must be at least 1",
      "param": "vehicle.capacity",
      "location": "body"
    },
    {
      "msg": "Vehicle type must be one of: car, motorcycle, auto",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

## Example Request

```bash
curl -X POST http://localhost:8080/api/v1/captain/register
     -H "Content-Type: application/json"
     -d '{
           "fullName": { "firstName": "John", "lastName": "Doe" },
           "email": "john.doe@example.com",
           "password": "secret123",
           "vehicle": {
             "color": "red",
             "plate": "ABC123",
             "capacity": 4,
             "vehicleType": "car"
           }
         }'
```

# Captain Profile Endpoint Documentation

## Endpoint

**GET** `/api/v1/captain/profile`

## Description

This endpoint retrieves the profile of the authenticated captain. It requires a valid JWT token.

## Request Headers

The request must include a valid JWT token in the `Authorization` header or as a `cookie`.

## Responses

### Success Response

- **200 OK**

  - **Description:** Captain profile retrieved successfully.
  - **Response Body:** Returns a JSON object with the captain's data.

  ```json
  {
    "captain": {
      "_id": "captain_id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "status": "inactive",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "location": {
        "lat": 12.345678,
        "lng": 98.765432
      }
    }
  }
  ```

### Error Responses

- **401 Unauthorized**

  - **Description:** User is not authorized.
  - **Response Body:** Returns a JSON object with an error message.

  ```json
  {
    "message": "You are not authorized"
  }
  ```

- **404 Not Found**

  - **Description:** Captain not found.
  - **Response Body:** Returns a JSON object with an error message.

  ```json
  {
    "message": "Captain not found"
  }
  ```

## Example Request

```bash
curl -X GET http://localhost:8080/api/v1/captain/profile \
 -H "Authorization: Bearer jwt_token_string"
```

# Captain Logout Endpoint Documentation

## Endpoint

**GET** `/api/v1/captain/logout`

## Description

This endpoint logs out the authenticated captain by invalidating the JWT token. The token is added to a blacklist to prevent further use.

## Request Headers

The request must include a valid JWT token in the `Authorization` header or as a `cookie`.

## Responses

- **200 OK**

  - **Description:** Captain logged out successfully.
  - **Response Body:** Returns a success message.

  ```json
  {
    "message": "Captain logged out"
  }
  ```

- **401 Unauthorized**

  - **Description:** User is not authorized.
  - **Response Body:** Returns a JSON object with an error message.

  ```json
  {
    "message": "You are not authorized"
  }
  ```

## Example Request

```bash
curl -X GET http://localhost:8080/api/v1/captain/logout \
 -H "Authorization: Bearer jwt_token_string"
```

# Map Routes Documentation

## 1. Get Address Coordinates

### Endpoint

**GET** `/api/v1/maps/getAddressCoordinates`

### Description

This endpoint retrieves the latitude and longitude of a given address.

### Request Query Parameters

- **address** (string, required): The address for which coordinates are needed. Must be at least 3 characters long.

### Request Headers

- **Authorization**: A valid JWT token is required in the `Authorization` header or as a cookie.

### Responses

- **200 OK**

  - **Description:** Coordinates retrieved successfully.
  - **Response Body:**
    ```json
    {
      "lat": 37.7749,
      "lng": -122.4194
    }
    ```

- **400 Bad Request**

  - **Description:** Validation error for the `address` parameter.
  - **Response Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid value",
          "param": "address",
          "location": "query"
        }
      ]
    }
    ```

- **500 Internal Server Error**
  - **Description:** An error occurred while fetching the coordinates.
  - **Response Body:**
    ```json
    {
      "message": "Error in map controller",
      "err": "Error details"
    }
    ```

### Example Request

```bash
curl -X GET "http://localhost:8080/api/v1/maps/getAddressCoordinates?address=San Francisco" \
     -H "Authorization: Bearer jwt_token_string"
```

## 2. Get Distance and Time

### Endpoint

**GET** `/api/v1/maps/getDistanceTime`

### Description

This endpoint calculates the distance and estimated travel time between two locations.

### Request Query Parameters

- **origin** (string, required): The starting address. Must be at least 3 characters long.
- **destination** (string, required): The destination address. Must be at least 3 characters long.

### Request Headers

- **Authorization**: A valid JWT token is required in the `Authorization` header or as a cookie.

### Responses

- **200 OK**

  - **Description:** Distance and time retrieved successfully.
  - **Response Body:**
    ```json
    {
      "distance": "10 km",
      "duration": "15 mins"
    }
    ```

- **400 Bad Request**

  - **Description:** Validation error for the origin or destination parameter.
  - **Response Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid value",
          "param": "origin",
          "location": "query"
        },
        {
          "msg": "Invalid value",
          "param": "destination",
          "location": "query"
        }
      ]
    }
    ```

- **500 Internal Server Error**

  - **Description:** An error occurred while fetching the distance and time.
  - **Response Body:**
    ```json
    {
      "message": "Internal Server Error",
      "err": "Error details"
    }
    ```

### Example Request

```bash
curl -X GET "http://localhost:8080/api/v1/maps/getDistanceTime?origin=San Francisco&destination=Los Angeles" \
     -H "Authorization: Bearer jwt_token_string"
```

## 3. Get Auto Suggestion

### Endpoint

**GET** `/api/v1/maps/getAutoSuggestion`

### Description

This endpoint provides auto-complete suggestions for a given input query.

### Request Query Parameters

- **input** (string, required): The partial address or query for which suggestions are needed.

### Request Headers

- **Authorization**: A valid JWT token is required in the `Authorization` header or as a cookie.

### Responses

- **200 OK**

  - **Description:** Suggestions retrieved successfully.
  - **Response Body:**
    ```json
    [
      {
        "description": "San Francisco, CA, USA",
        "place_id": "ChIJIQBpAG2ahYAR_6128GcTUEo"
      },
      {
        "description": "San Francisco International Airport, CA, USA",
        "place_id": "ChIJVXealLU_xkcRja_At0z9AGY"
      }
    ]
    ```

- **400 Bad Request**

  - **Description:** Validation error for the input parameter.
  - **Response Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid value",
          "param": "input",
          "location": "query"
        }
      ]
    }
    ```

- **500 Internal Server Error**

  - **Description:** An error occurred while fetching suggestions.
  - **Response Body:**
    ```json
    {
      "message": "Interval server error",
      "err": "Error details"
    }
    ```

### Example Request

```bash
curl -X GET "http://localhost:8080/api/v1/maps/getAutoSuggestion?input=San" \
     -H "Authorization: Bearer jwt_token_string"
```

# Ride Routes Documentation

## 1. Create Ride

### Endpoint

**POST** `/api/v1/ride/create`

### Description

This endpoint creates a new ride request. It calculates the fare based on the pickup and destination locations and the selected vehicle type.

### Request Body

The request body must be a JSON object with the following structure:

```json
{
  "pickup": "string", // required, at least 3 characters
  "destination": "string", // required, at least 3 characters
  "vehicleType": "string" // required, must be one of: car, auto, motorcycle
}
```

### Request Headers

- **Authorization**: A valid JWT token is required in the `Authorization` header or as a cookie.

### Responses

- **201 Created**

  - **Description:** Ride created successfully.
  - **Response Body:**
    ```json
    {
      "ride": {
        "_id": "ride_id",
        "user": "user_id",
        "pickup": "Pickup Address",
        "destination": "Destination Address",
        "fare": 150,
        "otp": "1234"
      }
    }
    ```

- **400 Bad Request**

  - **Description:** Validation error for the request body parameters.
  - **Response Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Pickup Address",
          "param": "pickup",
          "location": "body"
        },
        {
          "msg": "Invalid Destination Address",
          "param": "destination",
          "location": "body"
        },
        {
          "msg": "Invalid Vehicle Type",
          "param": "vehicleType",
          "location": "body"
        }
      ]
    }
    ```

- **500 Internal Server Error**

  - **Description:** An error occurred while creating the ride.
  - **Response Body:**
    ```json
    {
      "error": "Error details"
    }
    ```

### Example Request

```bash
curl -X POST http://localhost:8080/api/v1/ride/create \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer jwt_token_string" \
 -d '{
       "pickup": "123 Main St",
       "destination": "456 Elm St",
       "vehicleType": "car"
     }'
```

## 2. Get Fare

### Endpoint

**GET** `/api/v1/ride/getFair`

### Description

This endpoint calculates the fare for a ride based on the pickup and destination locations.

### Request Query Parameters

- **pickup** (string, required): The pickup location. Must be at least 3 characters long.
- **destination** (string, required): The destination location. Must be at least 3 characters long.

### Request Headers

- **Authorization**: A valid JWT token is required in the `Authorization` header or as a cookie.

### Responses

- **200 OK**

  - **Description:** Fare calculated successfully.
  - **Response Body:**
    ```json
    {
      "fare": {
        "car": 150,
        "auto": 100,
        "motorcycle": 70
      }
    }
    ```

- **400 Bad Request**

  - **Description:** Validation error for the query parameters.
  - **Response Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Pickup Length",
          "param": "pickup",
          "location": "query"
        },
        {
          "msg": "Invalid Destination Length",
          "param": "destination",
          "location": "query"
        }
      ]
    }
    ```

- **500 Internal Server Error**

  - **Description:** An error occurred while calculating the fare.
  - **Response Body:**
    ```json
    {
      "error": "Error details"
    }
    ```

### Example Request

```bash
curl -X GET "http://localhost:8080/api/v1/ride/getFair?pickup=123 Main St&destination=456 Elm St" \
 -H "Authorization: Bearer jwt_token_string"
```

## 3. Confirm Ride

### Endpoint

**POST** `/api/v1/ride/confirm`

### Description

This endpoint allows a captain to confirm a ride request.

### Request Body

The request body must be a JSON object with the following structure:

```json
{
  "rideId": "string" // required, must be a valid MongoDB ObjectId
}
```

### Request Headers

- **Authorization**: A valid JWT token is required in the `Authorization` header or as a cookie.

### Responses

- **200 OK**

  - **Description:** Ride confirmed successfully.
  - **Response Body:**
    ```json
    {
      "ride": {
        "_id": "ride_id",
        "user": "user_id",
        "pickup": "Pickup Address",
        "destination": "Destination Address",
        "fare": 150,
        "status": "confirmed"
      }
    }
    ```

- **400 Bad Request**

  - **Description:** Validation error for the request body parameters.
  - **Response Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Ride ID",
          "param": "rideId",
          "location": "body"
        }
      ]
    }
    ```

- **500 Internal Server Error**

  - **Description:** An error occurred while confirming the ride.
  - **Response Body:**
    ```json
    {
      "error": "Error details"
    }
    ```

### Example Request

```bash
curl -X POST http://localhost:8080/api/v1/ride/confirm \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer jwt_token_string" \
 -d '{
       "rideId": "ride_id"
     }'
```

## 4. Start Ride

### Endpoint

**GET** `/api/v1/ride/start-ride`

### Description

This endpoint allows a captain to start a ride after verifying the OTP.

### Request Query Parameters

- **rideId** (string, required): The ID of the ride. Must be a valid MongoDB ObjectId.
- **otp** (string, required): The OTP for the ride. Must be exactly 4 characters long.

### Request Headers

- **Authorization**: A valid JWT token is required in the `Authorization` header or as a cookie.

### Responses

- **200 OK**

  - **Description:** Ride started successfully.
  - **Response Body:**
    ```json
    {
      "ride": {
        "_id": "ride_id",
        "user": "user_id",
        "pickup": "Pickup Address",
        "destination": "Destination Address",
        "fare": 150,
        "status": "ongoing"
      }
    }
    ```

- **400 Bad Request**

  - **Description:** Validation error for the query parameters.
  - **Response Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Ride ID",
          "param": "rideId",
          "location": "query"
        },
        {
          "msg": "Invalid OTP",
          "param": "otp",
          "location": "query"
        }
      ]
    }
    ```

- **404 Not Found**

  - **Description:** Ride not found.
  - **Response Body:**
    ```json
    {
      "message": "Ride not found"
    }
    ```

- **500 Internal Server Error**

  - **Description:** An error occurred while starting the ride.
  - **Response Body:**
    ```json
    {
      "error": "Error details"
    }
    ```

### Example Request

```bash
curl -X GET "http://localhost:8080/api/v1/ride/start-ride?rideId=ride_id&otp=1234" \
 -H "Authorization: Bearer jwt_token_string"
```

## 5. End Ride

### Endpoint

**POST** `/api/v1/ride/end-ride`

### Description

This endpoint allows a captain to end a ride.

### Request Body

The request body must be a JSON object with the following structure:

```json
{
  "rideId": "string" // required, must be a valid MongoDB ObjectId
}
```

### Request Headers

- **Authorization**: A valid JWT token is required in the `Authorization` header or as a cookie.

### Responses

- **200 OK**

  - **Description:** Ride ended successfully.
  - **Response Body:**
    ```json
    {
      "ride": {
        "_id": "ride_id",
        "user": "user_id",
        "pickup": "Pickup Address",
        "destination": "Destination Address",
        "fare": 150,
        "status": "completed"
      }
    }
    ```

- **400 Bad Request**

  - **Description:** Validation error for the request body parameters.
  - **Response Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Ride ID",
          "param": "rideId",
          "location": "body"
        }
      ]
    }
    ```

- **500 Internal Server Error**

  - **Description:** An error occurred while ending the ride.
  - **Response Body:**
    ```json
    {
      "error": "Error details"
    }
    ```

### Example Request

```bash
curl -X POST http://localhost:8080/api/v1/ride/end-ride \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer jwt_token_string" \
 -d '{
       "rideId": "ride_id"
     }'
```

# Payment Routes Documentation

## 1. Create Order

### Endpoint

**POST** `/api/v1/payment/create-order`

### Description

This endpoint creates a Razorpay order for payment.

### Request Body

The request body must be a JSON object with the following structure:

```json
{
  "amount": 1000, // required, numeric, amount in smallest currency unit (e.g., paise for INR)
  "currency": "INR", // required, string, must be at least 3 characters
  "receipt": "receipt_123" // optional, string, must be at least 3 characters
}
```

### Request Headers

- **Content-Type**: `application/json`

### Responses

- **200 OK**

  - **Description:** Razorpay order created successfully.
  - **Response Body:**
    ```json
    {
      "success": true,
      "order": {
        "id": "order_id",
        "entity": "order",
        "amount": 1000,
        "currency": "INR",
        "receipt": "receipt_123",
        "status": "created"
      }
    }
    ```

- **400 Bad Request**

  - **Description:** Validation error for the request body parameters.
  - **Response Body:**
    ```json
    {
      "success": false,
      "errors": [
        {
          "msg": "Invalid value",
          "param": "amount",
          "location": "body"
        },
        {
          "msg": "Invalid value",
          "param": "currency",
          "location": "body"
        }
      ]
    }
    ```

- **500 Internal Server Error**

  - **Description:** An error occurred while creating the Razorpay order.
  - **Response Body:**
    ```json
    {
      "success": false,
      "message": "Failed to create Razorpay order"
    }
    ```

### Example Request

```bash
curl -X POST http://localhost:8080/api/v1/payment/create-order \
 -H "Content-Type: application/json" \
 -d '{
       "amount": 1000,
       "currency": "INR",
       "receipt": "receipt_123"
     }'
```

## 2. Verify Payment

### Endpoint

**POST** `/api/v1/payment/verify-payment`

### Description

This endpoint verifies the payment made through Razorpay.

### Request Body

The request body must be a JSON object with the following structure:

```json
{
  "rideId": "ride_id", // required, must be a valid MongoDB ObjectId
  "razorpayOrderId": "order_id", // required, string
  "razorpayPaymentId": "payment_id", // required, string
  "razorpaySignature": "signature" // required, string
}
```

### Request Headers

- **Content-Type**: `application/json`

### Responses

- **200 OK**

  - **Description:** Payment verified successfully.
  - **Response Body:**
    ```json
    {
      "success": true,
      "message": "Payment verified",
      "ride": {
        "_id": "ride_id",
        "paymentId": "payment_id",
        "orderId": "order_id",
        "signature": "signature"
      }
    }
    ```

- **400 Bad Request**

  - **Description:** Invalid payment signature or validation error for the request body parameters.
  - **Response Body:**
    ```json
    {
      "success": false,
      "errors": [
        {
          "msg": "Invalid RideId",
          "param": "rideId",
          "location": "body"
        },
        {
          "msg": "Invalid OrderId",
          "param": "razorpayOrderId",
          "location": "body"
        }
      ]
    }
    ```

- **404 Not Found**

  - **Description:** Ride not found.
  - **Response Body:**
    ```json
    {
      "success": false,
      "message": "Ride not found"
    }
    ```

- **500 Internal Server Error**

  - **Description:** An error occurred while verifying the payment.
  - **Response Body:**
    ```json
    {
      "success": false,
      "message": "Server Error"
    }
    ```

### Example Request

```bash
curl -X POST http://localhost:8080/api/v1/payment/verify-payment \
 -H "Content-Type: application/json" \
 -d '{
       "rideId": "ride_id",
       "razorpayOrderId": "order_id",
       "razorpayPaymentId": "payment_id",
       "razorpaySignature": "signature"
     }'
```
