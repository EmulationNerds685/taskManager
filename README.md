# Task Manager — Full Stack Application

A production-ready Task Management Application built with React, Node.js (Express), and MongoDB. Features JWT-based authentication stored in HTTP-only cookies, bcrypt password hashing, AES payload encryption, express-validator input validation, and a clean responsive UI.

---

## 🔗 Links

- **Live URL:** 'https://task-manager-six-liard-48.vercel.app'
- **GitHub Repo:** 'https://github.com/EmulationNerds685/taskManager'

---

## 🛠 Tech Stack

| Layer      | Technology                                          |
|------------|-----------------------------------------------------|
| Frontend   | React, Vite, React Router DOM, Axios                |
| Backend    | Node.js, Express.js                                 |
| Database   | MongoDB, Mongoose                                   |
| Auth       | JWT (HTTP-only cookie, 7d expiry)                   |
| Security   | bcryptjs (salt: 10), express-validator, AES-256-CBC |
| Deployment | Vercel (Frontend), Railway (Backend)       |

---

## 📁 Project Structure

```
task-manager/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js               # Axios instance (withCredentials: true)
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx        # Auth state + session restore
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── taskService.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js                      # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js          # register, login, logout, getMe
│   │   └── taskController.js          # CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js          # JWT verification from cookie
│   ├── models/
│   │   ├── User.js                    # bcrypt pre-save hook, comparePassword
│   │   └── Task.js                    # title, description, status, user ref
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── utils/
│   │   └── encryption.js             # AES-256-CBC encrypt/decrypt
│   ├── validators/
│   │   ├── authValidator.js           # validateRegister, validateLogin
│   │   └── taskValidator.js           # validateTask
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## ⚙️ Local Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
AES_SECRET=your_64_character_hex_string
AES_IV=your_32_character_hex_string
```

Generate AES values by running:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"  # AES_SECRET
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"  # AES_IV
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

App will be available at `http://localhost:5173`

---

## 🏗 Architecture Overview

```
React Client (Vite)
       │
       │  HTTP requests — Axios with withCredentials: true
       │  Cookie sent automatically on every request
       ▼
Express Server (server.js)
       │
       ├── CORS → restricted to FRONTEND_URL, credentials: true
       ├── cookie-parser → reads JWT from incoming cookies
       ├── express.json() → parses request body
       │
       ├── /api/auth
       │     ├── POST /register  → validateRegister → registerUser
       │     ├── POST /login     → validateLogin    → loginUser
       │     ├── POST /logout    → logoutUser
       │     └── GET  /me        → authMiddleware   → getMe
       │
       └── /api/tasks
             ├── POST   /     → authMiddleware → validateTask → createTask
             ├── GET    /     → authMiddleware → getTasks
             ├── PUT    /:id  → authMiddleware → updateTask
             └── DELETE /:id  → authMiddleware → deleteTask
                    │
                    ▼
             authMiddleware
             Reads token from req.cookies.token
             Verifies JWT → sets req.user (userId) → next()
                    │
                    ▼
             MongoDB (Mongoose)
             ├── Users collection
             └── Tasks collection (task.user = ObjectId ref to User)
```

**Key design decisions:**
- JWT stored in **HTTP-only cookie** — inaccessible to JavaScript, prevents XSS
- Cookie uses `sameSite: strict` to prevent CSRF attacks
- `secure: true` only in production (HTTPS), `false` in development (HTTP)
- Every task query includes `user: req.user` — users can never access other users' tasks
- Passwords hashed via bcrypt pre-save hook — plain text never stored
- `password` field has `select: false` — never returned in API responses
- Sensitive auth response data (name, email) encrypted with AES-256-CBC
- Session is restored on page refresh via `GET /auth/me`

---

## 🔐 Security Implementation

| Feature | Detail |
|---|---|
| Password hashing | bcryptjs, salt rounds: 10, applied in `User.js` pre-save hook |
| Password field protection | `select: false` on schema — excluded from all queries by default |
| Authentication | JWT signed with `JWT_SECRET`, expires in 7 days |
| Token storage | HTTP-only cookie — not accessible via `document.cookie` |
| Cookie flags | `httpOnly: true`, `sameSite: strict`, `secure: true` in production |
| AES Encryption | Auth response payload (user data) encrypted with AES-256-CBC |
| Authorization | `authMiddleware` validates JWT and scopes all task queries to `req.user` |
| Input validation | `express-validator` on register, login, and task creation |
| CORS | Restricted to `FRONTEND_URL` env variable with `credentials: true` |
| Environment variables | All secrets in `.env`, never hardcoded |

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

> All `/tasks` routes require authentication. JWT is read automatically from the `token` cookie.

---

### Auth Routes

#### `POST /auth/register`
Register a new user. Validates input, hashes password, sets JWT cookie, returns encrypted user data.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response `201`:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": "<aes-encrypted-string>"
}
```

**Response `400` — Validation error:**
```json
{
  "errors": [
    { "msg": "Password must be at least 6 characters", "param": "password" }
  ]
}
```

**Response `400` — User already exists:**
```json
{
  "success": false,
  "message": "User already exists"
}
```

---

#### `POST /auth/login`
Authenticate user. Sets JWT in HTTP-only cookie, returns encrypted user data.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response `200`:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": "<aes-encrypted-string>"
}
```

**Response `401`:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

#### `POST /auth/logout`
Clears the JWT cookie.

**Response `200`:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### `GET /auth/me`
Returns the currently logged-in user from the JWT cookie. Used to restore session on page refresh.

**Response `200`:**
```json
{
  "success": true,
  "user": {
    "id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response `401` — No token:**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

### Task Routes

> All routes below require a valid JWT cookie.

---

#### `GET /tasks`
Fetch tasks for the logged-in user with pagination, filtering, and search.

**Query Parameters:**

| Param    | Type   | Default | Description                        |
|----------|--------|---------|------------------------------------|
| `page`   | number | `1`     | Page number                        |
| `limit`  | number | `10`    | Tasks per page                     |
| `status` | string | —       | Filter: `pending` or `completed`   |
| `search` | string | —       | Case-insensitive search by title   |

**Example:**
```
GET /api/tasks?page=1&limit=5&status=pending&search=meeting
```

**Response `200`:**
```json
{
  "success": true,
  "page": 1,
  "total": 12,
  "tasks": [
    {
      "_id": "64abc456...",
      "title": "Team meeting",
      "description": "Weekly sync",
      "status": "pending",
      "user": "64abc123...",
      "createdAt": "2024-02-26T10:30:00.000Z",
      "updatedAt": "2024-02-26T10:30:00.000Z"
    }
  ]
}
```

---

#### `POST /tasks`
Create a new task.

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Optional description",
  "status": "pending"
}
```

**Response `201`:**
```json
{
  "success": true,
  "task": {
    "_id": "64abc789...",
    "title": "New Task",
    "description": "Optional description",
    "status": "pending",
    "user": "64abc123...",
    "createdAt": "2024-02-26T11:00:00.000Z",
    "updatedAt": "2024-02-26T11:00:00.000Z"
  }
}
```

**Response `400` — Validation error:**
```json
{
  "success": false,
  "errors": [
    { "msg": "Title is required", "param": "title" }
  ]
}
```

---

#### `PUT /tasks/:id`
Update a task. Only the owner can update it.

**Request Body (all fields optional):**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "completed"
}
```

**Response `200`:**
```json
{
  "success": true,
  "task": {
    "_id": "64abc789...",
    "title": "Updated Title",
    "description": "Updated description",
    "status": "completed",
    "user": "64abc123...",
    "createdAt": "2024-02-26T11:00:00.000Z",
    "updatedAt": "2024-02-26T12:00:00.000Z"
  }
}
```

**Response `404`:**
```json
{
  "success": false,
  "message": "Task not found"
}
```

---

#### `DELETE /tasks/:id`
Delete a task. Only the owner can delete it.

**Response `200`:**
```json
{
  "success": true,
  "message": "Task deleted"
}
```

**Response `404`:**
```json
{
  "success": false,
  "message": "Task not found"
}
```

---

#### `401` — Any protected route without valid token:
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

## 🌐 Deployment

### Backend (Render / Railway)
1. Push repo to GitHub
2. Create a new Web Service, set root directory to `backend/`
3. Set start command: `node server.js`
4. Add all environment variables:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
AES_SECRET=your_64_character_hex_string
AES_IV=your_32_character_hex_string
```
5. Copy the deployed backend URL

### Frontend (Vercel)
1. Import repo on [vercel.com](https://vercel.com)
2. Set root directory to `frontend/`
3. Add environment variable:
```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com/api
```
4. Deploy

---

## ⚠️ Important Notes

- `NODE_ENV=production` must be set on the backend in deployment — this enables the `Secure` cookie flag for HTTPS
- Frontend axios instance uses `withCredentials: true` — required for cookies to be sent cross-origin
- CORS `origin` is read from `FRONTEND_URL` — must exactly match your deployed frontend URL
- AES encryption is applied to auth response payloads (user data). Task data is returned as plain JSON
