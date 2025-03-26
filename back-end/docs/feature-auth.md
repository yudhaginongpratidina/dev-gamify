# Authentication API Documentation

## Endpoints

### Register

**URL:** `/api/auth/register`  
**Method:** `POST`  
**Description:** Register a new user.

**Request Body:**
```json
{
    "fullname": "string",
    "email": "string",
    "password": "string",
    "confirmPassword": "string"
}
```

**Response Body:**
```json
{
    "message": "Register success",
    "data": {
        "id": "number",
        "fullname": "string",
        "email": "string",
        "role": "string",
        "point": "number",
        "createdAt": "string"
    }
}
```

**Status Codes:**
- `201 Created`: User registered successfully.
- `400 Bad Request`: Validation error.
- `409 Conflict`: Email already exists.

### Login

**URL:** `/api/auth/login`  
**Method:** `POST`  
**Description:** Login a user.

**Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```

**Response Body:**
```json
{
    "message": "Login success",
    "token": "string"
}
```

**Status Codes:**
- `200 OK`: User logged in successfully.
- `400 Bad Request`: Validation error.
- `401 Unauthorized`: Invalid email or password.

### Refresh Token

**URL:** `/api/auth/refresh-token`  
**Method:** `GET`  
**Description:** Refresh the access token.

**Response Body:**
```json
{
    "message": "Token refreshed successfully",
    "token": "string"
}
```

**Status Codes:**
- `200 OK`: Token refreshed successfully.
- `401 Unauthorized`: No refresh token provided.
- `403 Forbidden`: Invalid refresh token.

### Logout

**URL:** `/api/auth/logout`  
**Method:** `GET`  
**Description:** Logout a user.

**Response Body:**
```json
{
    "message": "Logout success"
}
```

**Status Codes:**
- `200 OK`: User logged out successfully.
