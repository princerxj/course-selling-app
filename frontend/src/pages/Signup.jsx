import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../api'
import { AuthLayout, AuthForm } from './Login'

export default function Signup() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const response = await authAPI.userSignup(formData.email, formData.password)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('role', 'user')
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally { setLoading(false) }
  }

  return (
    <AuthLayout title="Create account" subtitle="Start your learning journey today" accent="#3b82f6">
      <AuthForm
        formData={formData} onChange={handleChange} onSubmit={handleSubmit}
        loading={loading} error={error} submitLabel="Create Account"
        accent="#3b82f6"
        footer={<>Already a member? <Link to="/login" style={{ color: '#60a5fa', fontWeight: 600, textDecoration: 'none' }}>Sign in →</Link></>}
      />
    </AuthLayout>
  )
}