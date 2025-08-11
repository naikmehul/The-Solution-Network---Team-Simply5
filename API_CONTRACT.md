API_CONTRACT
1. Data Models

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

2. User Authentication & Profile
2.1 Register User
Feature: Create a new user account
HTTP Method: POST
Endpoint Path: /api/auth/register
Description: Registers a new user.
Request Body:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePass123"
}

Success Response (201 Created):

{
  "success": true,
  "data": {
    "id": "u123",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-08-11T10:00:00Z"
  }
}

Error Response:

{
  "success": false,
  "message": "Email already registered"
}

2.2 Login
Feature: Authenticate user and return JWT token
HTTP Method: POST
Endpoint Path: /api/auth/login
Request Body:

{
  "email": "john@example.com",
  "password": "securePass123"
}

Success Response (200 OK):

{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "u123",
    "name": "John Doe"
  }
}

Error Response:

{
  "success": false,
  "message": "Invalid email or password"
}

2.3 View Profile
HTTP Method: GET
Endpoint Path: /api/users/me
Headers: Authorization: Bearer <token>
Success Response (200 OK):

{
  "success": true,
  "data": {
    "id": "u123",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-08-11T10:00:00Z"
  }
}

Error Response:

{
  "success": false,
  "message": "Unauthorized"
}

2.4 Update Profile
HTTP Method: PUT
Endpoint Path: /api/users/me
Description: Update name or password.
Request Body:

{
  "name": "John Updated",
  "password": "newSecurePass"
}

Success Response (200 OK):

{
  "success": true,
  "data": {
    "id": "u123",
    "name": "John Updated",
    "email": "john@example.com",
    "updatedAt": "2025-08-12T10:00:00Z"
  }
}

Error Response:

{
  "success": false,
  "message": "Unauthorized"
}

3. Issue Management
3.1 Create Issue
HTTP Method: POST
Endpoint Path: /api/issues
Headers: Authorization: Bearer <token>
Request Body:

{
  "title": "Pothole on Main Street",
  "description": "Large pothole causing traffic issues",
  "category": "Road Damage",
  "priority": "High",
  "location": "Main Street, Ward 4"
}

Success Response (201 Created):

{
  "success": true,
  "data": {
    "id": "i123",
    "title": "Pothole on Main Street",
    "status": "Open",
    "createdAt": "2025-08-11T12:00:00Z"
  }
}

Error Response:

{
  "success": false,
  "message": "Missing required fields"
}

3.2 View All Issues
HTTP Method: GET
Endpoint Path: /api/issues
Query Params: page, limit
Success Response:

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


3.3 Update Issue Details
HTTP Method: PUT
Endpoint Path: /api/issues/{id}
Description: Update issue details.
3.4 Update Issue Status
HTTP Method: PATCH
Endpoint Path: /api/issues/{id}/status
Request Body:

{
  "status": "Resolved"
}

4. Comments
4.1 Add Comment
HTTP Method: POST
Endpoint Path: /api/issues/{id}/comments
Request Body:

{
  "text": "This pothole has been here for over 2 months!"
}

4.2 View Comments
HTTP Method: GET
Endpoint Path: /api/issues/{id}/comments
5. Search & Filter Issues
HTTP Method: GET
Endpoint Path: /api/issues/search
Query Params: keyword, status, category, priority, location
6. Attachments
6.1 Upload Attachment
HTTP Method: POST
Endpoint Path: /api/issues/{id}/attachments
Headers: Content-Type: multipart/form-data
6.2 View Attachments
HTTP Method: GET
Endpoint Path: /api/issues/{id}/attachments
