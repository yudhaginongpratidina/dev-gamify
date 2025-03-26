# Class Feature Developer Guide

## Overview

The Class feature allows users to manage classes, including creating, retrieving, updating, soft deleting, trashing, and restoring classes. Below is the detailed API documentation for the Class feature.

---

## Endpoints

### 1. Create Class
- **Endpoint**: `POST /api/class`
- **Description**: Create a new class.
- **Request Body**:
  - `authorId` (number, required): ID of the author creating the class.
  - `title` (string, required): Title of the class (4-60 characters).
  - `level` (string, required): Level of the class (`beginner`, `intermediate`, or `advanced`).
  ```json
  {
    "authorId": 1,
    "title": "Class Title",
    "level": "beginner"
  }
  ```
- **Status Codes**:
  - **201 Created**: Class successfully created.
  - **400 Bad Request**: Class already exists.
  - **404 Not Found**: Author account not found.
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Class created",
      "data": {
        "id": 1,
        "authorId": 1,
        "title": "Class Title",
        "level": "beginner",
        "createdAt": "2023-10-01T00:00:00.000Z"
      }
    }
    ```
  - **Failure**:
    ```json
    {
      "message": "Class already exists"
    }
    ```
    ```json
    {
      "message": "Account not found"
    }
    ```

---

### 2. Get All Classes
- **Endpoint**: `GET /api/class`
- **Description**: Retrieve all classes.
- **Status Codes**:
  - **200 OK**: Classes retrieved successfully.
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Classes found",
      "data": [
        {
          "id": 1,
          "authorId": 1,
          "title": "Class Title",
          "level": "beginner",
          "createdAt": "2023-10-01T00:00:00.000Z"
        }
      ]
    }
    ```

---

### 3. Get Class by ID
- **Endpoint**: `GET /api/class/:classId`
- **Description**: Retrieve a class by its ID.
- **Path Parameter**:
  - `classId` (number, required): ID of the class to retrieve.
- **Status Codes**:
  - **200 OK**: Class retrieved successfully.
  - **404 Not Found**: Class not found.
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Class found",
      "data": {
        "id": 1,
        "authorId": 1,
        "title": "Class Title",
        "level": "beginner",
        "createdAt": "2023-10-01T00:00:00.000Z"
      }
    }
    ```
  - **Failure**:
    ```json
    {
      "message": "Class not found"
    }
    ```

---

### 4. Get Classes by Author ID
- **Endpoint**: `GET /api/class/author/:authorId`
- **Description**: Retrieve all classes created by a specific author.
- **Path Parameter**:
  - `authorId` (number, required): ID of the author.
- **Status Codes**:
  - **200 OK**: Classes retrieved successfully.
  - **404 Not Found**: Classes not found.
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Classes found",
      "data": [
        {
          "id": 1,
          "authorId": 1,
          "title": "Class Title",
          "level": "beginner",
          "createdAt": "2023-10-01T00:00:00.000Z"
        }
      ]
    }
    ```
  - **Failure**:
    ```json
    {
      "message": "Class not found"
    }
    ```

---

### 5. Update Class
- **Endpoint**: `PATCH /api/class/author/:id/:classId`
- **Description**: Update an existing class.
- **Path Parameters**:
  - `id` (number, required): ID of the author.
  - `classId` (number, required): ID of the class to update.
- **Request Body**:
  - `title` (string, optional): Updated title of the class (4-60 characters).
  - `level` (string, optional): Updated level of the class (`beginner`, `intermediate`, or `advanced`).
  ```json
  {
    "title": "Updated Class Title",
    "level": "intermediate"
  }
  ```
- **Status Codes**:
  - **200 OK**: Class updated successfully.
  - **404 Not Found**: Class not found.
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Class updated",
      "data": {
        "id": 1,
        "authorId": 1,
        "title": "Updated Class Title",
        "level": "intermediate",
        "createdAt": "2023-10-01T00:00:00.000Z"
      }
    }
    ```
  - **Failure**:
    ```json
    {
      "message": "Class not found"
    }
    ```

---

### 6. Soft Delete Class
- **Endpoint**: `DELETE /api/class/author/:id/:classId`
- **Description**: Soft delete a class.
- **Path Parameters**:
  - `id` (number, required): ID of the author.
  - `classId` (number, required): ID of the class to delete.
- **Status Codes**:
  - **200 OK**: Class soft deleted successfully.
  - **404 Not Found**: Class not found.
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Class deleted",
      "data": {
        "id": 1,
        "authorId": 1,
        "title": "Class Title",
        "level": "beginner",
        "createdAt": "2023-10-01T00:00:00.000Z"
      }
    }
    ```
  - **Failure**:
    ```json
    {
      "message": "Class not found"
    }
    ```

---

### 7. Trash Classes by Author ID
- **Endpoint**: `GET /api/class/author/:id/trash`
- **Description**: Retrieve all trashed classes by author ID.
- **Path Parameter**:
  - `id` (number, required): ID of the author.
- **Status Codes**:
  - **200 OK**: Trashed classes retrieved successfully.
  - **404 Not Found**: Trashed classes not found.
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Classes trashed",
      "data": [
        {
          "id": 1,
          "authorId": 1,
          "title": "Class Title",
          "level": "beginner",
          "createdAt": "2023-10-01T00:00:00.000Z"
        }
      ]
    }
    ```
  - **Failure**:
    ```json
    {
      "message": "Class not found"
    }
    ```

---

### 8. Restore Class
- **Endpoint**: `PATCH /api/class/author/:id/:classId/restore`
- **Description**: Restore a soft deleted class.
- **Path Parameters**:
  - `id` (number, required): ID of the author.
  - `classId` (number, required): ID of the class to restore.
- **Status Codes**:
  - **200 OK**: Class restored successfully.
  - **404 Not Found**: Class not found.
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Class restored",
      "data": {
        "id": 1,
        "authorId": 1,
        "title": "Class Title",
        "level": "beginner",
        "createdAt": "2023-10-01T00:00:00.000Z"
      }
    }
    ```
  - **Failure**:
    ```json
    {
      "message": "Class not found"
    }
    ```

---

## Status Codes

- **200 OK**: The request was successful.
- **201 Created**: The resource was successfully created.
- **400 Bad Request**: The request was invalid or cannot be served.
- **404 Not Found**: The requested resource could not be found.
