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
curl -X POST http://localhost:8080/api/v1/user/register \
 -H "Content-Type: application/json" \
 -d '{
  "fullName": { "firstName": "John", "lastName": "Doe" },
  "email": "john.doe@example.com",
  "password": "secret123"
}'
```
