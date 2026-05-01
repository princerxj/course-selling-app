import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PurchaseSuccess() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'DM Sans', sans-serif", position: 'relative', overflow: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Fraunces:ital,wght@0,700;1,400&display=swap" rel="stylesheet" />

      {/* Background glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: 480, width: '100%', textAlign: 'center', transition: 'all 0.6s ease', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>

        {/* Success icon */}
        <div style={{ width: 80, height: 80, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', fontSize: 36 }}>
          ✓
        </div>

        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 44, fontWeight: 700, color: '#fff', margin: '0 0 12px', letterSpacing: '-1px' }}>
          You're enrolled!
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, lineHeight: 1.6, margin: '0 0 40px' }}>
          Your course access has been confirmed. Start learning at your own pace.
        </p>

        {/* Free badge */}
        <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 12, padding: '16px 20px', marginBottom: 40, textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 16 }}>🎉</span>
            <span style={{ fontWeight: 600, color: '#4ade80', fontSize: 14 }}>Free access during beta</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, margin: 0, lineHeight: 1.5 }}>
            We're working on integrating a payment gateway. All courses are free to enjoy right now!
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={() => navigate('/')} style={{ padding: '14px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            Browse More Courses →
          </button>
          <button onClick={() => navigate('/admin-dashboard')} style={{ padding: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 500, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            Go to Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}