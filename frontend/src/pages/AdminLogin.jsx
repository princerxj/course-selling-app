import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../api'
import { AuthLayout, AuthForm } from './Login'

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const response = await authAPI.adminSignin(formData.email, formData.password)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('role', 'admin')
      navigate('/admin-dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <AuthLayout title="Admin Portal" subtitle="Manage your courses and students" accent="#f59e0b">
      <AuthForm
        formData={formData} onChange={handleChange} onSubmit={handleSubmit}
        loading={loading} error={error} submitLabel="Access Dashboard"
        accent="#f59e0b"
        footer={<>No admin account? <Link to="/admin-signup" style={{ color: '#fbbf24', fontWeight: 600, textDecoration: 'none' }}>Register →</Link></>}
      />
    </AuthLayout>
  )
}