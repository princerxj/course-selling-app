import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminLogin from './pages/AdminLogin'
import AdminSignup from './pages/AdminSignup'
import AdminDashboard from './pages/AdminDashboard'
import AdminCreateCourse from './pages/AdminCreateCourse'
import AdminEditCourse from './pages/AdminEditCourse'
import PurchaseSuccess from './pages/PurchaseSuccess'
import './index.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-create-course"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminCreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-edit-course/:courseId"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminEditCourse />
            </ProtectedRoute>
          }
        />
        <Route path="/purchase-success" element={<PurchaseSuccess />} />
      </Routes>
    </Router>
  )
}

export default App
