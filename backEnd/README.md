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
