import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/')
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(10,10,15,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 0.3s ease',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Fraunces:ital,wght@0,700;1,400&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #f59e0b, #ef4444)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>◆</div>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>Coursify</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {!token ? (
            <>
              <Link to="/login" style={navLinkStyle}>Sign In</Link>
              <Link to="/signup" style={navLinkStyle}>Sign Up</Link>
              <Link to="/admin-login" style={ctaStyle}>Admin →</Link>
            </>
          ) : (
            <>
              {role === 'admin' && (
                <Link to="/admin-dashboard" style={navLinkStyle}>Dashboard</Link>
              )}
              <button onClick={handleLogout} style={{ ...navLinkStyle, background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, cursor: 'pointer', color: '#f87171' }}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

const navLinkStyle = {
  textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 14,
  fontWeight: 500, padding: '8px 14px', borderRadius: 8,
  transition: 'color 0.2s', letterSpacing: '0.01em',
  border: 'none', fontFamily: "'DM Sans', sans-serif"
}

const ctaStyle = {
  textDecoration: 'none', background: 'rgba(245,158,11,0.15)',
  border: '1px solid rgba(245,158,11,0.4)', color: '#f59e0b',
  fontSize: 13, fontWeight: 600, padding: '8px 16px', borderRadius: 8,
  letterSpacing: '0.02em', transition: 'all 0.2s'
}