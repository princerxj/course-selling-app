# Course Selling App

A modern, full-stack course selling platform built with Node.js, Express, React, and MongoDB. This application provides a complete solution for admins to create and manage courses with image uploads, and for users to browse, purchase, and manage their courses.

## 🎯 Features

### Admin Panel
- 🔐 JWT-based authentication with secure login/signup
- ➕ Create, read, update, and delete (CRUD) courses
- 🖼️ Upload course images to Cloudinary with automatic optimization
- 📊 View all created courses in a dashboard
- 💰 Manage course pricing and detailed descriptions
- 🛡️ Role-based access control (admin-only endpoints)

### User Portal
- 👤 Secure user registration and login
- 📚 Browse and preview all available courses
- 🛒 Purchase courses with confirmation
- 💾 Persistent purchase history tracking
- 🎓 Access to purchased courses

### Image Management
- ☁️ Cloudinary integration for reliable image hosting
- ⚡ Automatic image optimization and caching
- 🧹 Clean image deletion on course updates
- 📱 Responsive image display on all devices

### Security Features
- 🔒 Password hashing with bcrypt (salt rounds: 5+)
- 🔑 JWT-based stateless authentication
- 👥 Role-based access control (Admin/User)
- ✔️ Input validation with Zod schema validation
- 🚫 Protected API endpoints with middleware
- 📝 CORS enabled for frontend communication

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js (v14 or higher)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **File Upload**: Multer + Cloudinary Storage
- **Validation**: Zod
- **Security**: Bcrypt
- **Password Hashing**: Bcrypt with salting

### Frontend
- **Library**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router
- **PostCSS**: For CSS processing

## 📋 Prerequisites

- **Node.js** v14 or higher
- **npm** or **yarn** package manager
- **MongoDB** instance (local or MongoDB Atlas cloud)
- **Cloudinary** account (free tier available at [cloudinary.com](https://cloudinary.com))
- **Git** for version control

## 📦 Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Course-Selling-App
```

### Step 2: Backend Setup

Install backend dependencies:

```bash
npm install
```

### Step 3: Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
cd ..
```

### Step 4: Environment Configuration

Create a `.env` file in the root directory using the provided `.env.example`:

```bash
cp .env.example .env
```

Then edit `.env` with your actual configuration:

```env
# Database
DB_URL=mongodb://localhost:27017/course-selling-app

# JWT Secrets (Generate strong random strings for production)
JWT_USER_PASSWORD=your_strong_jwt_user_secret_key_here
JWT_ADMIN_PASSWORD=your_strong_jwt_admin_secret_key_here

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Optional: Server Configuration
PORT=3000
NODE_ENV=development
```

### Step 5: Get Cloudinary Credentials

1. Sign up at [Cloudinary.com](https://cloudinary.com)
2. Go to your Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Paste them into your `.env` file

### Step 6: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running locally on port 27017
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get connection string
3. Update `DB_URL` in `.env` file

### Step 7: Start the Application

#### Terminal 1 - Backend Server

```bash
npm start
```

Backend will run on `http://localhost:3000`

#### Terminal 2 - Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173` (or another available port)

Visit `http://localhost:5173` to access the application.

## 📁 Project Structure

```
Course-Selling-App/
├── Backend (Root)
│   ├── cloudConfig.js              # Cloudinary configuration
│   ├── config.js                   # App configuration & secrets
│   ├── db.js                       # Database connection & Mongoose schemas
│   ├── index.js                    # Application entry point
│   ├── package.json                # Backend dependencies
│   ├── .env.example                # Example environment variables
│   ├── middlewares/
│   │   ├── admin.js               # Admin JWT verification middleware
│   │   └── user.js                # User JWT verification middleware
│   └── routes/
│       ├── admin.route.js         # Admin CRUD endpoints
│       ├── course.route.js        # Public course endpoints
│       └── user.route.js          # User authentication endpoints
│
└── Frontend (React + Vite)
    ├── src/
    │   ├── api.js                  # API client & axios configuration
    │   ├── App.jsx                 # Main App component
    │   ├── main.jsx                # React entry point
    │   ├── index.css               # Global styles
    │   ├── components/
    │   │   ├── CourseCard.jsx      # Course display component
    │   │   ├── Navbar.jsx          # Navigation bar component
    │   │   └── ProtectedRoute.jsx  # Protected route wrapper
    │   └── pages/
    │       ├── Home.jsx            # Landing & course listing
    │       ├── Login.jsx           # User login
    │       ├── Signup.jsx          # User registration
    │       ├── AdminLogin.jsx      # Admin login
    │       ├── AdminSignup.jsx     # Admin registration
    │       ├── AdminDashboard.jsx  # Admin course management
    │       ├── AdminCreateCourse.jsx   # Create new course
    │       ├── AdminEditCourse.jsx     # Edit existing course
    │       └── PurchaseSuccess.jsx     # Purchase confirmation
    ├── public/                      # Static assets
    ├── package.json                # Frontend dependencies
    ├── vite.config.js              # Vite build configuration
    ├── tailwind.config.js          # Tailwind CSS configuration
    └── postcss.config.js           # PostCSS configuration
```

## 🔌 API Endpoints

### Admin Routes (`/admin`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/admin/signup` | Admin registration | ❌ No |
| POST | `/admin/signin` | Admin login (returns JWT) | ❌ No |
| POST | `/admin/course` | Create new course with image | ✅ Yes (Admin) |
| PUT | `/admin/course` | Update existing course | ✅ Yes (Admin) |
| GET | `/admin/course/bulk` | Get all courses by current admin | ✅ Yes (Admin) |

### User Routes (`/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/user/signup` | User registration | ❌ No |
| POST | `/user/signin` | User login (returns JWT) | ❌ No |

### Course Routes (`/course`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/course/preview` | Get all available courses | ❌ No |
| POST | `/course/purchase` | Purchase a course | ✅ Yes (User) |

### Authentication

Include JWT token in request header:

```bash
Authorization: Bearer <your_jwt_token>
```

## 💡 Usage Examples

### Admin Workflow

#### 1. Admin Signup

```bash
curl -X POST http://localhost:3000/admin/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "securepassword123"
  }'
```

#### 2. Admin Login

```bash
curl -X POST http://localhost:3000/admin/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "securepassword123"
  }'
```

Response includes JWT token to use in subsequent requests.

#### 3. Create a Course

```bash
curl -X POST http://localhost:3000/admin/course \
  -H "Authorization: Bearer <admin_jwt_token>" \
  -F "image=@course-image.jpg" \
  -F "title=Web Development 101" \
  -F "description=Learn modern web development with React and Node.js" \
  -F "price=4999"
```

#### 4. Update Course

```bash
curl -X PUT http://localhost:3000/admin/course \
  -H "Authorization: Bearer <admin_jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "course_id_here",
    "title": "Advanced Web Development",
    "description": "Master advanced web development concepts",
    "price": 7999
  }'
```

#### 5. Get All Courses

```bash
curl -X GET http://localhost:3000/admin/course/bulk \
  -H "Authorization: Bearer <admin_jwt_token>"
```

### User Workflow

#### 1. User Signup

```bash
curl -X POST http://localhost:3000/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "userpassword123"
  }'
```

#### 2. User Login

```bash
curl -X POST http://localhost:3000/user/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "userpassword123"
  }'
```

#### 3. Browse Courses

```bash
curl http://localhost:3000/course/preview
```

#### 4. Purchase a Course

```bash
curl -X POST http://localhost:3000/course/purchase \
  -H "Authorization: Bearer <user_jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{"courseId": "course_id_here"}'
```

## 📦 Key Dependencies

### Backend
- **express** (4.x) - Web framework for routing and middleware
- **mongoose** (7.x) - MongoDB ODM for schema management
- **jsonwebtoken** - JWT token generation and verification
- **bcrypt** - Password hashing and verification
- **multer** - File upload handling middleware
- **cloudinary** - Cloud storage for images
- **multer-storage-cloudinary** - Multer integration with Cloudinary
- **zod** - Schema validation and TypeScript-first validation
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing middleware

### Frontend
- **react** (18.x) - UI library
- **react-router-dom** - Client-side routing
- **axios** - HTTP client for API calls
- **tailwindcss** - Utility-first CSS framework
- **vite** - Fast build tool and dev server

See [package.json](package.json) for complete dependency list with versions.

## 🛡️ Security Implementation

### Password Security
- Passwords are hashed using bcrypt with salt rounds of 5+
- Original passwords are never stored in the database
- Password verification uses secure comparison functions

### Authentication & Authorization
- JWT tokens are generated upon successful login
- Tokens include user/admin ID and role information
- Admin and user routes are protected with middleware verification
- Tokens include expiration times for enhanced security

### Data Validation
- All inputs are validated using Zod schemas
- Type-safe validation prevents injection attacks
- Invalid data is rejected before database operations

### Environment Security
- Sensitive credentials stored in `.env` file (never committed)
- `.env` file is in `.gitignore` to prevent accidental exposure
- Example `.env.example` provided for configuration template

### Cloudinary Integration
- API credentials stored securely in environment variables
- Image uploads use signed URLs for secure access
- Sensitive data never exposed in client-side code

## ⚠️ Error Handling

The application handles errors comprehensively:

| Error Type | Handler | Response |
|------------|---------|----------|
| Invalid credentials | Auth middleware | 401 Unauthorized |
| Unauthorized access | Role middleware | 403 Forbidden |
| Missing fields | Input validation | 400 Bad Request |
| File upload errors | Multer middleware | 400 Bad Request |
| Database errors | Error catch blocks | 500 Internal Server Error |
| Course not found | Route handler | 404 Not Found |
| Cloudinary errors | Upload handler | 500 Internal Server Error |

All errors include descriptive messages to aid debugging.

## 🔧 Development

### Running in Development Mode

**Backend with auto-reload:**
```bash
npm install -g nodemon  # Install globally if not already
npm run dev             # Or use: nodemon index.js
```

**Frontend with HMR (Hot Module Reload):**
```bash
cd frontend
npm run dev
```

### Project Guidelines

- Follow ES6+ JavaScript conventions
- Use async/await over callbacks
- Validate all user inputs with Zod
- Document API changes in this README
- Test changes locally before committing

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running locally or MongoDB Atlas connection string is correct
- Check `DB_URL` in `.env` file
- Verify firewall isn't blocking MongoDB port (27017)

### Cloudinary Upload Fails
- Verify `CLOUD_NAME`, `CLOUD_API_KEY`, and `CLOUD_API_SECRET` are correct
- Check Cloudinary dashboard for API key validity
- Ensure image file size is within Cloudinary limits

### Port Already in Use
- Change `PORT` in `.env` or use: `PORT=4000 npm start`
- Kill the process using the port: `lsof -i :3000` (Mac/Linux)

### JWT Token Expired
- Re-login to get a new token
- Tokens expire based on backend configuration
- Check JWT secret keys are consistent

### CORS Errors
- Ensure frontend URL is whitelisted in backend CORS configuration
- Verify API calls are using correct base URL
- Check Content-Type headers in requests

## 🚀 Future Enhancements

- 💳 Payment gateway integration (Razorpay/Stripe)
- 📧 Email notifications for registrations and purchases
- ⭐ Course reviews and ratings system
- 📊 Comprehensive user dashboard with purchase analytics
- 🔍 Advanced search and filtering by category
- 📂 Course categorization system
- ❤️ Wishlist functionality for users
- 📱 Mobile app (React Native)
- 🎥 Video streaming integration
- 📈 Admin analytics and sales reports
- 🔔 Real-time notifications (Socket.io)
- 🌙 Dark mode support

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure code follows project conventions and includes appropriate comments.

## 📄 License

This project is open source and available under the ISC License.

## 💬 Support & Questions

For issues, questions, or suggestions:

- 📝 Open an issue in the [GitHub repository](https://github.com/your-username/Course-Selling-App/issues)
- 💌 Contact the development team
- 📖 Check existing issues for similar problems

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Guide](https://docs.mongodb.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Built with ❤️ for online learning**

**Happy learning! 🚀**
