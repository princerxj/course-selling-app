# Course Selling App - React Frontend

A modern, minimal yet attractive React frontend for the Course Selling App with Tailwind CSS styling.

## Features

- ✨ Responsive design with Tailwind CSS
- 🔐 User and Admin authentication
- 📚 Course browsing and purchasing
- 👨‍💼 Admin dashboard for course management
- 🖼️ Course image uploads
- 🎯 Clean and intuitive UI

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navigation bar
│   │   ├── CourseCard.jsx          # Course card component
│   │   └── ProtectedRoute.jsx      # Route protection
│   ├── pages/
│   │   ├── Home.jsx                # Course listing
│   │   ├── Login.jsx               # User login
│   │   ├── Signup.jsx              # User signup
│   │   ├── AdminLogin.jsx          # Admin login
│   │   ├── AdminSignup.jsx         # Admin signup
│   │   ├── AdminDashboard.jsx      # Admin dashboard
│   │   ├── AdminCreateCourse.jsx   # Create course
│   │   ├── AdminEditCourse.jsx     # Edit course
│   │   └── PurchaseSuccess.jsx     # Purchase success page
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point
│   ├── index.css                   # Global styles
│   └── api.js                      # API integration
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- Backend server running on `http://localhost:3000`

### Steps

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Pages

### Public Pages
- **Home** (`/`) - Browse all available courses
- **User Login** (`/login`) - User authentication
- **User Signup** (`/signup`) - User registration
- **Admin Login** (`/admin-login`) - Admin authentication
- **Admin Signup** (`/admin-signup`) - Admin registration

### Protected Pages (User)
- **Purchase Success** (`/purchase-success`) - Confirmation after course purchase

### Protected Pages (Admin)
- **Admin Dashboard** (`/admin-dashboard`) - View all created courses
- **Create Course** (`/admin-create-course`) - Create new course with image upload
- **Edit Course** (`/admin-edit-course/:courseId`) - Update course details

## Features

### User Features
- Browse all available courses
- View course details (title, description, price, image)
- Purchase courses
- See purchase confirmation with "Enjoy free for now" message

### Admin Features
- Create new courses with image uploads
- Edit existing courses
- Update course images
- View all courses created
- Manage course pricing and descriptions

## Component Structure

### Navbar
- Responsive navigation
- Conditional login/logout buttons
- Role-based navigation

### CourseCard
- Course image display
- Course details (title, description, price)
- Action buttons (Buy/Edit)

### ProtectedRoute
- Route protection based on authentication
- Role-based access control

## API Integration

The app communicates with the backend through the `api.js` module which handles:
- User authentication (signup/signin)
- Admin authentication (signup/signin)
- Course operations (create, read, update, purchase)

All API requests automatically include the JWT token from localStorage.

## Styling

Built with Tailwind CSS for:
- Responsive design
- Modern UI components
- Easy customization
- Consistent design system

## Notes

- All courses are currently **free** to purchase
- Payment gateway integration will be added later
- Purchase confirmation displays a friendly message about free access

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Payment gateway integration
- User dashboard with purchased courses
- Course reviews and ratings
- Search and filter functionality
- Course categories
- Wishlist feature
- User profile management

