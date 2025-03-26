# Account API Documentation

## Endpoints

### 1. Create Account
- **Endpoint:** `/api/accounts`
- **Method:** `POST`
- **Description:** Create a new account.
- **Request Body:**
  ```json
  {
    "fullname": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "Account created",
    "data": {
      "id": "number",
      "fullname": "string",
      "email": "string",
      "role": "string",
      "exp": "number",
      "point": "number",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```
- **Status Codes:**
  - `201 Created`: Account successfully created.
  - `400 Bad Request`: Invalid request body.
  - `409 Conflict`: Email already exists.

### 2. Get Account by ID
- **Endpoint:** `/api/accounts/:id`
- **Method:** `GET`
- **Description:** Retrieve account details by ID.
- **Response Body:**
  ```json
  {
    "message": "Account found",
    "data": {
      "id": "number",
      "fullname": "string",
      "email": "string",
      "role": "string",
      "exp": "number",
      "point": "number",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```
- **Status Codes:**
  - `200 OK`: Account successfully retrieved.
  - `404 Not Found`: Account not found.

### 3. Update Account
- **Endpoint:** `/api/accounts/:id`
- **Method:** `PUT`
- **Description:** Update account details.
- **Request Body:**
  ```json
  {
    "fullname": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "Account updated",
    "data": {
      "id": "number",
      "fullname": "string",
      "email": "string",
      "role": "string",
      "exp": "number",
      "point": "number",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
  ```
- **Status Codes:**
  - `200 OK`: Account successfully updated.
  - `400 Bad Request`: Invalid request body.
  - `404 Not Found`: Account not found.

### 4. Delete Account
- **Endpoint:** `/api/accounts/:id`
- **Method:** `DELETE`
- **Description:** Soft delete an account.
- **Response Body:**
  ```json
  {
    "message": "Account deleted",
    "data": {
      "id": "number",
      "fullname": "string",
      "email": "string",
      "role": "string",
      "exp": "number",
      "point": "number",
      "createdAt": "string",
      "updatedAt": "string",
      "deleted": "boolean"
    }
  }
  ```
- **Status Codes:**
  - `200 OK`: Account successfully deleted.
  - `404 Not Found`: Account not found.

## Status Code Explanations

- **201 Created:** The request has been fulfilled and resulted in a new resource being created.
- **200 OK:** The request has succeeded.
- **400 Bad Request:** The server could not understand the request due to invalid syntax.
- **404 Not Found:** The server can not find the requested resource.
- **409 Conflict:** The request could not be completed due to a conflict with the current state of the target resource.
