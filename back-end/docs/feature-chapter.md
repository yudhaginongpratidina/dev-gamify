# Chapter API Documentation

This document provides detailed information about the Chapter API, including its endpoints, request/response formats, and status codes.

---

## Endpoints

### 1. Create Chapter
**Description:** Create a new chapter for a specific class.

- **Endpoint:** `POST /chapter`
- **Request Body:**
  | Field          | Type     | Description                                   |
  |----------------|----------|-----------------------------------------------|
  | `classId`      | `number` | ID of the class to which the chapter belongs. |
  | `title`        | `string` | Title of the chapter (4-60 characters).       |
  | `content`      | `string` | Content of the chapter (4-60 characters).     |
  | `question`     | `string` | Question for the chapter (4-60 characters).   |
  | `optionA`      | `string` | Option A for the question (4-60 characters).  |
  | `optionB`      | `string` | Option B for the question (4-60 characters).  |
  | `optionC`      | `string` | Option C for the question (4-60 characters).  |
  | `optionD`      | `string` | Option D for the question (4-60 characters).  |
  | `correctAnswer`| `string` | Correct answer (4-60 characters).             |

- **Response:**
  - **Success (201):**
    ```json
    {
      "message": "Chapter created",
      "data": {
        "id": 1,
        "classId": 1,
        "title": "Chapter Title",
        "content": "Chapter Content",
        "pointExperience": 0,
        "pointReward": 0,
        "question": "Sample Question",
        "optionA": "Option A",
        "optionB": "Option B",
        "optionC": "Option C",
        "optionD": "Option D",
        "correctAnswer": "Option A",
        "createdAt": "2023-01-01T00:00:00.000Z"
      }
    }
    ```
  - **Failure (400):**
    ```json
    {
      "message": "Validation error",
      "errors": ["Title must be at least 4 characters"]
    }
    ```

---

### 2. Get Chapters by Class ID
**Description:** Retrieve all chapters for a specific class.

- **Endpoint:** `GET /chapter/class/:classId`
- **Response:**
  - **Success (200):**
    ```json
    {
      "message": "Chapters found",
      "data": [
        {
          "id": 1,
          "classId": 1,
          "title": "Chapter Title",
          "pointExperience": 0,
          "pointReward": 0,
          "createdAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
    ```
  - **Failure (404):**
    ```json
    {
      "message": "Chapter not found"
    }
    ```

---

### 3. Get Chapter Details by Chapter ID
**Description:** Retrieve detailed information about a specific chapter.

- **Endpoint:** `GET /chapter/:chapterId`
- **Response:**
  - **Success (200):**
    ```json
    {
      "message": "Chapter found",
      "data": {
        "id": 1,
        "classId": 1,
        "title": "Chapter Title",
        "content": "Chapter Content",
        "pointExperience": 0,
        "pointReward": 0,
        "question": "Sample Question",
        "optionA": "Option A",
        "optionB": "Option B",
        "optionC": "Option C",
        "optionD": "Option D",
        "correctAnswer": "Option A"
      }
    }
    ```
  - **Failure (404):**
    ```json
    {
      "message": "Chapter not found"
    }
    ```

---

### 4. Update Chapter
**Description:** Update an existing chapter.

- **Endpoint:** `PATCH /chapter/author/:authorId/chapter/:chapterId`
- **Request Body:**
  | Field          | Type     | Description                                   |
  |----------------|----------|-----------------------------------------------|
  | `title`        | `string` | (Optional) Updated title (4-60 characters).   |
  | `content`      | `string` | (Optional) Updated content (4-60 characters). |
  | `question`     | `string` | (Optional) Updated question (4-60 characters).|
  | `optionA`      | `string` | (Optional) Updated option A (4-60 characters).|
  | `optionB`      | `string` | (Optional) Updated option B (4-60 characters).|
  | `optionC`      | `string` | (Optional) Updated option C (4-60 characters).|
  | `optionD`      | `string` | (Optional) Updated option D (4-60 characters).|
  | `correctAnswer`| `string` | (Optional) Updated correct answer (4-60 characters).|

- **Response:**
  - **Success (200):**
    ```json
    {
      "message": "Chapter updated",
      "data": {
        "id": 1,
        "classId": 1,
        "title": "Updated Chapter Title",
        "content": "Updated Content",
        "pointExperience": 0,
        "pointReward": 0,
        "question": "Updated Question",
        "optionA": "Updated Option A",
        "optionB": "Updated Option B",
        "optionC": "Updated Option C",
        "optionD": "Updated Option D",
        "correctAnswer": "Updated Option A",
        "createdAt": "2023-01-01T00:00:00.000Z"
      }
    }
    ```
  - **Failure (404):**
    ```json
    {
      "message": "Chapter not found"
    }
    ```

---

### 5. Delete Chapter
**Description:** Delete a chapter by its ID.

- **Endpoint:** `DELETE /chapter/author/:authorId/chapter/:chapterId`
- **Response:**
  - **Success (200):**
    ```json
    {
      "message": "Chapter deleted",
      "data": {
        "id": 1
      }
    }
    ```
  - **Failure (404):**
    ```json
    {
      "message": "Chapter not found"
    }
    ```

---

### Notes
- All endpoints require authentication via a Bearer token in the `Authorization` header.
- Validation errors return a `400` status code with detailed error messages.
- Ensure that the `classId` exists before creating a chapter.
