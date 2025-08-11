API_CONTRACT  

1. Data Models  
```json
User {
  id: string,
  name: string,
  email: string,
  password: string (hashed),
  createdAt: string,
  updatedAt: string
}

Issue {
  id: string,
  title: string,
  description: string,
  category: string,
  priority: string,
  status: string,
  location: string,
  createdAt: string,
  updatedAt: string
}

Comment {
  id: string,
  issueId: string,
  text: string,
  authorId: string,
  createdAt: string
}

Attachment {
  id: string,
  issueId: string,
  fileUrl: string,
  uploadedAt: string
}
```

---

2. User Authentication & Profile  

2.1 Register User  
HTTP Method: POST  
Endpoint Path: /api/auth/register  
Description: Registers a new user.  

Request Body:  
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePass123"
}
```

Success Response (201 Created):  
```json
{
  "success": true,
  "data": {
    "id": "u123",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-08-11T10:00:00Z"
  }
}
```

Error Response (409 Conflict):  
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

2.2 Login  
HTTP Method: POST  
Endpoint Path: /api/auth/login  
Description: Authenticates user and returns JWT token.  

Request Body:  
```json
{
  "email": "john@example.com",
  "password": "securePass123"
}
```

Success Response (200 OK):  
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "u123",
    "name": "John Doe"
  }
}
```

Error Response (401 Unauthorized):  
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

2.3 View Profile  
HTTP Method: GET  
Endpoint Path: /api/users/me  
Headers: Authorization: Bearer <token>  

Success Response (200 OK):  
```json
{
  "success": true,
  "data": {
    "id": "u123",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-08-11T10:00:00Z"
  }
}
```

Error Response (401 Unauthorized):  
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

2.4 Update Profile  
HTTP Method: PUT  
Endpoint Path: /api/users/me  
Description: Update name or password.  

Request Body:  
```json
{
  "name": "John Updated",
  "password": "newSecurePass"
}
```

Success Response (200 OK):  
```json
{
  "success": true,
  "data": {
    "id": "u123",
    "name": "John Updated",
    "email": "john@example.com",
    "updatedAt": "2025-08-12T10:00:00Z"
  }
}
```

Error Response (401 Unauthorized):  
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

3. Issue Management  

3.1 Create Issue  
HTTP Method: POST  
Endpoint Path: /api/issues  
Headers: Authorization: Bearer <token>  

Request Body:  
```json
{
  "title": "Pothole on Main Street",
  "description": "Large pothole causing traffic issues",
  "category": "Road Damage",
  "priority": "High",
  "location": "Main Street, Ward 4"
}
```

Success Response (201 Created):  
```json
{
  "success": true,
  "data": {
    "id": "i123",
    "title": "Pothole on Main Street",
    "status": "Open",
    "createdAt": "2025-08-11T12:00:00Z"
  }
}
```

Error Response (400 Bad Request):  
```json
{
  "success": false,
  "message": "Missing required fields"
}
```

Error Response (401 Unauthorized):  
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

3.2 View All Issues  
HTTP Method: GET  
Endpoint Path: /api/issues  
Query Params: page, limit  

Success Response (200 OK):  
```json
{
  "success": true,
  "data": [
    {
      "id": "i123",
      "title": "Pothole on Main Street",
      "status": "Open"
    }
  ]
}
```

Error Response (404 Not Found):  
```json
{
  "success": false,
  "message": "No issues found"
}
```

---

3.3 Update Issue Details  
HTTP Method: PUT  
Endpoint Path: /api/issues/{id}  

Success Response (200 OK):  
```json
{
  "success": true,
  "message": "Issue details updated successfully"
}
```

Error Response (404 Not Found):  
```json
{
  "success": false,
  "message": "Issue not found"
}
```

Error Response (401 Unauthorized):  
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

3.4 Update Issue Status  
HTTP Method: PATCH  
Endpoint Path: /api/issues/{id}/status  

Request Body:  
```json
{
  "status": "Resolved"
}
```

Success Response (200 OK):  
```json
{
  "success": true,
  "message": "Issue status updated successfully"
}
```

Error Response (404 Not Found):  
```json
{
  "success": false,
  "message": "Issue not found"
}
```

---

4. Comments  

4.1 Add Comment  
HTTP Method: POST  
Endpoint Path: /api/issues/{id}/comments  

Request Body:  
```json
{
  "text": "This pothole has been here for over 2 months!"
}
```

Success Response (201 Created):  
```json
{
  "success": true,
  "message": "Comment added successfully"
}
```

Error Response (404 Not Found):  
```json
{
  "success": false,
  "message": "Issue not found"
}
```

Error Response (401 Unauthorized):  
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

4.2 View Comments  
HTTP Method: GET  
Endpoint Path: /api/issues/{id}/comments  

Success Response (200 OK):  
```json
[
  {
    "id": "c123",
    "issueId": "i123",
    "text": "This pothole has been here for over 2 months!",
    "authorId": "u456",
    "createdAt": "2025-08-12T09:00:00Z"
  }
]
```

Error Response (404 Not Found):  
```json
{
  "success": false,
  "message": "No comments found for this issue"
}
```

---

5. Search & Filter Issues  
HTTP Method: GET  
Endpoint Path: /api/issues/search  
Query Params: keyword, status, category, priority, location  

Success Response (200 OK):  
```json
[
  {
    "id": "i123",
    "title": "Pothole on Main Street",
    "status": "Open",
    "category": "Road Damage",
    "priority": "High",
    "location": "Main Street, Ward 4"
  }
]
```

Error Response (404 Not Found):  
```json
{
  "success": false,
  "message": "No matching issues found"
}
```

---

6. Attachments  

6.1 Upload Attachment  
HTTP Method: POST  
Endpoint Path: /api/issues/{id}/attachments  
Headers: Content-Type: multipart/form-data  

Success Response (201 Created):  
```json
{
  "id": "a123",
  "fileUrl": "https://example.com/uploads/pothole.jpg",
  "uploadedAt": "2025-08-12T14:00:00Z"
}
```

Error Response (404 Not Found):  
```json
{
  "success": false,
  "message": "Issue not found"
}
```

Error Response (400 Bad Request):  
```json
{
  "success": false,
  "message": "Invalid file format"
}
```

---

6.2 View Attachments  
HTTP Method: GET  
Endpoint Path: /api/issues/{id}/attachments  

Success Response (200 OK):  
```json
[
  {
    "id": "a123",
    "fileUrl": "https://example.com/uploads/pothole.jpg",
    "uploadedAt": "2025-08-12T14:00:00Z"
  }
]
```

Error Response (404 Not Found):  
```json
{
  "success": false,
  "message": "No attachments found for this issue"
}
```

