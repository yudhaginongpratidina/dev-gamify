# Authorization API Documentation

## Overview
The Authorization API is used to manage user roles and retrieve user information. It allows administrators to fetch all users, fetch a specific user by ID, and change the role of a user.

---

## Endpoints

### 1. **Get All Users**
#### **Description**
Fetches a list of all users in the system.

#### **Endpoint**
```
GET /api/authorization
```

#### **Authorization**
- Requires a valid `Bearer Token` with `admin` or `superadmin` role.

#### **Response**
- **Success (200)**:
    ```json
    {
        "message": "Users found",
        "data": [
            {
                "id": 1,
                "fullname": "Admin User",
                "email": "admin@example.com",
                "role": "admin"
            },
            {
                "id": 2,
                "fullname": "Regular User",
                "email": "user@example.com",
                "role": "user"
            }
        ]
    }
    ```
- **Error (401)**:
    ```json
    {
        "message": "Unauthorized"
    }
    ```

---

### 2. **Get User by ID**
#### **Description**
Fetches details of a specific user by their ID.

#### **Endpoint**
```
GET /api/authorization/:userId
```

#### **Path Parameters**
| Parameter | Type   | Description         |
|-----------|--------|---------------------|
| `userId`  | Number | The ID of the user. |

#### **Authorization**
- Requires a valid `Bearer Token` with `admin` or `superadmin` role.

#### **Response**
- **Success (200)**:
    ```json
    {
        "message": "User found",
        "data": {
            "id": 2,
            "fullname": "Regular User",
            "email": "user@example.com",
            "role": "user"
        }
    }
    ```
- **Error (404)**:
    ```json
    {
        "message": "User not found"
    }
    ```
- **Error (401)**:
    ```json
    {
        "message": "Unauthorized"
    }
    ```

---

### 3. **Change User Role**
#### **Description**
Changes the role of a specific user.

#### **Endpoint**
```
PATCH /api/authorization/:userId
```

#### **Path Parameters**
| Parameter | Type   | Description         |
|-----------|--------|---------------------|
| `userId`  | Number | The ID of the user. |

#### **Request Body**
| Field | Type   | Description                          |
|-------|--------|--------------------------------------|
| `role`| String | The new role (`user`, `admin`, `superadmin`). |

#### **Authorization**
- Requires a valid `Bearer Token` with `admin` or `superadmin` role.

#### **Response**
- **Success (200)**:
    ```json
    {
        "message": "Role changed",
        "data": {
            "id": 2,
            "fullname": "Regular User",
            "email": "user@example.com",
            "role": "admin"
        }
    }
    ```
- **Error (400)**:
    ```json
    [
        {
            "path": "role",
            "message": "Invalid enum value. Expected 'user' | 'admin' | 'superadmin', received 'invalidRole'"
        }
    ]
    ```
- **Error (404)**:
    ```json
    {
        "message": "User not found"
    }
    ```
- **Error (401)**:
    ```json
    {
        "message": "Unauthorized"
    }
    ```

---

## Status Codes

| Status Code | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| `200`       | Request was successful, and the response contains the requested data.      |
| `400`       | Bad request. The input data is invalid or does not meet validation rules.  |
| `401`       | Unauthorized. The user is not authenticated or does not have permission.   |
| `404`       | Not found. The requested resource (e.g., user) does not exist.             |
| `500`       | Internal server error. An unexpected error occurred on the server.         |

---

## Notes
- Ensure that the `Authorization` header is included in requests that require authentication.
- Only users with `admin` or `superadmin` roles can access these endpoints.
- The `role` field in the request body must be one of the following values: `user`, `admin`, or `superadmin`.
