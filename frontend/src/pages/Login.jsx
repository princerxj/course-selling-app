import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../api'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const response = await authAPI.userSignin(formData.email, formData.password)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('role', 'user')
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally { setLoading(false) }
  }

  return <AuthLayout title="Welcome back" subtitle="Sign in to continue learning" accent="#3b82f6">
    <AuthForm
      formData={formData} onChange={handleChange} onSubmit={handleSubmit}
      loading={loading} error={error} submitLabel="Sign In"
      accent="#3b82f6"
      footer={<>New here? <Link to="/signup" style={{ color: '#60a5fa', fontWeight: 600, textDecoration: 'none' }}>Create account →</Link></>}
    />
  </AuthLayout>
}

export function AuthLayout({ title, subtitle, accent, children }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Fraunces:ital,wght@0,700;1,400&display=swap" rel="stylesheet" />

      {/* Left panel */}
      <div style={{ flex: 1, display: 'none', background: `radial-gradient(ellipse at 30% 50%, ${accent}22 0%, transparent 70%)`, alignItems: 'center', justifyContent: 'center', padding: 60, position: 'relative', borderRight: '1px solid rgba(255,255,255,0.05)' }}
        className="auth-left">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div style={{ position: 'relative', maxWidth: 400 }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 52, fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
            Learn.<br /><em style={{ color: accent }}>Grow.</em><br />Succeed.
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, lineHeight: 1.7 }}>
            Join thousands of learners mastering new skills every day.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 48 }}>
            <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg, #f59e0b, #ef4444)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>◆</div>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: '#fff' }}>Coursify</span>
          </Link>

          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.5px' }}>{title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, margin: '0 0 36px' }}>{subtitle}</p>

          {children}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) { .auth-left { display: flex !important; } }
      `}</style>
    </div>
  )
}

export function AuthForm({ formData, onChange, onSubmit, loading, error, submitLabel, accent, footer, extraFields }) {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {error && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '12px 16px', color: '#f87171', fontSize: 14 }}>
          {error}
        </div>
      )}

      <div>
        <label style={labelStyle}>Email address</label>
        <input type="email" name="email" value={formData.email} onChange={onChange} required placeholder="you@example.com" style={inputStyle(accent)} />
      </div>

      <div>
        <label style={labelStyle}>Password</label>
        <input type="password" name="password" value={formData.password} onChange={onChange} required placeholder="••••••••" style={inputStyle(accent)} />
      </div>

      {extraFields}

      <button type="submit" disabled={loading} style={{
        marginTop: 8, padding: '14px', borderRadius: 10, border: 'none',
        background: loading ? 'rgba(255,255,255,0.1)' : `linear-gradient(135deg, ${accent}, ${accent}cc)`,
        color: '#fff', fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer',
        fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.01em', transition: 'opacity 0.2s',
        opacity: loading ? 0.6 : 1
      }}>
        {loading ? 'Please wait...' : submitLabel}
      </button>

      {footer && <p style={{ textAlign: 'center', fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: '8px 0 0' }}>{footer}</p>}
    </form>
  )
}

const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 8, letterSpacing: '0.03em' }
const inputStyle = (accent) => ({
  width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff',
  fontSize: 15, outline: 'none', boxSizing: 'border-box', fontFamily: "'DM Sans', sans-serif",
  transition: 'border-color 0.2s',
})