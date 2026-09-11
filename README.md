# Inventory API

A RESTful Inventory Management API built with Node.js and Express.js. The project provides a backend foundation for managing users, products, categories, inventory operations, and business analytics with Supabase as the backend database and authentication platform.

## Overview

Inventory API is designed to provide a secure and scalable backend for inventory management applications.

The API follows a modular architecture that separates:

- Routes
- Controllers
- Services
- Middleware
- Validators
- Configuration
- Database operations

Authentication is handled using Supabase Auth, while application-specific user information such as name, role, and account status is maintained in the `public.users` table.

## Features

### Authentication

- User registration
- User login
- Supabase Authentication
- Email and password authentication
- Session and access token generation
- User profile creation
- User roles
- Active/inactive user status

### Authorization

Planned:

- JWT authentication middleware
- Protected API routes
- Role-based access control
- ADMIN permissions
- STAFF permissions

### Inventory Management

Planned:

- Product management
- Category management
- Stock-in operations
- Stock-out operations
- Inventory transaction history
- Stock quantity tracking
- Low-stock detection

### Dashboard

Planned:

- Total products
- Total categories
- Current inventory
- Low-stock products
- Stock-in statistics
- Stock-out statistics
- Inventory summaries

### Reports

Planned:

- Inventory reports
- Stock transaction reports
- Product reports
- Low-stock reports
- Date-based filtering

### API Documentation

- Swagger / OpenAPI documentation
- Interactive API testing
- Endpoint request and response documentation

### Deployment

Planned:

- Supabase database
- Production backend deployment
- Environment-based configuration
- Production API documentation

---

## Tech Stack

### Backend

- Node.js
- Express.js
- JavaScript
- REST API

### Database

- PostgreSQL
- Supabase

### Authentication

- Supabase Auth
- JWT

### Validation

- Express Validator

### API Documentation

- Swagger
- OpenAPI

### Development Tools

- Nodemon
- Postman
- Git
- GitHub

---

## Architecture

The project follows a layered backend architecture:

```text
Client
  |
  v
Routes
  |
  v
Controllers
  |
  v
Services
  |
  v
Supabase / PostgreSQL

Middleware and validators are used across the request lifecycle.

Request
  |
  v
Route
  |
  v
Validation Middleware
  |
  v
Authentication Middleware
  |
  v
Authorization Middleware
  |
  v
Controller
  |
  v
Service
  |
  v
Database
  |
  v
Response
Project Structure
inventory-api/
│
├── src/
│   │
│   ├── config/
│   │   └── supabase.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── dashboardController.js
│   │   ├── productController.js
│   │   ├── reportController.js
│   │   └── transactionController.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── productRoutes.js
│   │   ├── reportRoutes.js
│   │   └── transactionRoutes.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── categoryService.js
│   │   ├── dashboardService.js
│   │   ├── productService.js
│   │   ├── reportService.js
│   │   └── transactionService.js
│   │
│   ├── validators/
│   │   └── ...
│   │
│   ├── swagger.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
Database Design

The application uses PostgreSQL through Supabase.

Users

Application users are stored in:

public.users

Authentication credentials are managed by:

auth.users

The application user is linked to the Supabase authentication user using the same UUID.

Users Table
Column	Description
id	User UUID
full_name	User's full name
email	User email
role	User role
is_active	Account status
created_at	Account creation time
updated_at	Last update time

Supported roles:

ADMIN
STAFF

Passwords are not stored in public.users. Password authentication is handled by Supabase Auth.

Authentication Flow
Registration

The registration process follows these steps:

Client
  |
  v
POST /api/auth/register
  |
  v
Create Supabase Auth User
  |
  v
Create public.users Profile
  |
  v
Return User Information
Login
Client
  |
  v
POST /api/auth/login
  |
  v
Supabase Auth
  |
  v
Validate Email + Password
  |
  v
Generate Session
  |
  v
Find User in public.users
  |
  v
Return Session + User
API Endpoints
Authentication
Register
POST /api/auth/register

Request:

{
  "full_name": "Anoop",
  "email": "user@example.com",
  "password": "Password@123"
}

Response:

{
  "success": true,
  "user": {
    "id": "user-uuid",
    "full_name": "Anoop",
    "email": "user@example.com",
    "role": "STAFF",
    "is_active": true
  }
}
Login
POST /api/auth/login

Request:

{
  "email": "user@example.com",
  "password": "Password@123"
}

Response:

{
  "success": true,
  "session": {
    "access_token": "..."
  },
  "user": {
    "id": "user-uuid",
    "full_name": "Anoop",
    "email": "user@example.com",
    "role": "ADMIN",
    "is_active": true
  }
}
Planned API Endpoints

The following endpoints are part of the planned inventory management functionality.

Categories
POST   /api/categories
GET    /api/categories
GET    /api/categories/:id
PUT    /api/categories/:id
DELETE /api/categories/:id
Products
POST   /api/products
GET    /api/products
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id
Inventory Transactions
POST /api/transactions/stock-in
POST /api/transactions/stock-out
GET  /api/transactions
GET  /api/transactions/:id
Dashboard
GET /api/dashboard
Reports
GET /api/reports/inventory
GET /api/reports/transactions
GET /api/reports/low-stock
Environment Variables

Create a .env file in the project root:

PORT=5000

SUPABASE_URL=your_supabase_project_url

SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

SUPABASE_ANON_KEY=your_supabase_anon_key

Never commit .env to GitHub.

Add it to .gitignore:

.env
node_modules/
Installation
1. Clone the Repository
git clone https://github.com/anoopcodehack/inventory-api.git
2. Navigate to the Project
cd inventory-api
3. Install Dependencies
npm install
4. Configure Environment Variables

Create:

.env

and add the required Supabase credentials.

5. Start the Development Server
npm run dev

The API will run on:

http://localhost:5000
Available Scripts
npm run dev

Starts the development server using Nodemon.

npm start

Starts the application in production mode.

API Testing

The API can be tested using:

Postman
Swagger UI
REST Client
cURL

Example:

curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "user@example.com",
  "password": "Password@123"
}'
Security

The project is designed with security in mind.

Current security measures include:

Supabase-managed password authentication
Environment variables for secrets
UUID-based user identification
Server-side authentication
Active user status
Role-based user model

Planned security improvements include:

JWT verification middleware
Role-based route authorization
Request validation
Rate limiting
Secure HTTP headers
Centralized error handling
Production CORS configuration
Development Status
Completed
 Node.js and Express server
 Supabase integration
 PostgreSQL database integration
 User registration
 User login
 Supabase Auth integration
 User profile creation
 ADMIN / STAFF roles
 Active user status
 Authentication API testing
In Progress
 JWT authentication middleware
 Role-based authorization
 Category CRUD
 Product CRUD
 Stock-in functionality
 Stock-out functionality
 Inventory transaction history
 Dashboard analytics
 Reports
 Swagger documentation
 Production deployment
Future Improvements

Potential future improvements include:

Pagination
Advanced product search
Inventory alerts
Audit logs
CSV report export
Advanced dashboard analytics
Automated low-stock notifications
Database indexes for performance
API rate limiting
Automated testing
CI/CD pipeline
Error Response Format

The API follows a consistent error response structure.

Example:

{
  "success": false,
  "message": "Invalid credentials"
}

Successful responses follow:

{
  "success": true,
  "data": {}
}
Contribution

Contributions are welcome.

To contribute:

git checkout -b feature/your-feature

Make your changes, test the API, and create a pull request.

Please keep the project structure modular and follow the existing coding conventions.

License

This project is currently intended for educational and portfolio purposes.

Author

Anoop A

GitHub: https://github.com/anoopcodehack

