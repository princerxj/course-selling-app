import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../api'
import { AuthLayout, AuthForm } from './Login'

export default function AdminSignup() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const response = await authAPI.adminSignup(formData.email, formData.password)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('role', 'admin')
      navigate('/admin-dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally { setLoading(false) }
  }

  return (
    <AuthLayout title="Create Admin Account" subtitle="Set up your instructor profile" accent="#f59e0b">
      <AuthForm
        formData={formData} onChange={handleChange} onSubmit={handleSubmit}
        loading={loading} error={error} submitLabel="Create Admin Account"
        accent="#f59e0b"
        footer={<>Already have an account? <Link to="/admin-login" style={{ color: '#fbbf24', fontWeight: 600, textDecoration: 'none' }}>Sign in →</Link></>}
      />
    </AuthLayout>
  )
}