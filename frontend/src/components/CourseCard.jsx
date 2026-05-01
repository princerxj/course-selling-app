import React, { useState } from 'react'

export default function CourseCard({ course, onBuy, onEdit, isAdmin }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
        border: hovered ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16, overflow: 'hidden',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.2)',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex', flexDirection: 'column'
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 180, background: 'linear-gradient(135deg, #1a1a2e, #16213e)', overflow: 'hidden' }}>
        {course.imageUrl ? (
          <img
            src={course.imageUrl}
            alt={course.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
            📘
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
        {isAdmin && (
          <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 600, color: '#f59e0b', letterSpacing: '0.05em' }}>
            YOURS
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#fff', lineHeight: 1.3, fontFamily: "'Fraunces', serif" }}>
          {course.title}
        </h3>
        <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {course.description}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#f59e0b', fontFamily: "'Fraunces', serif" }}>₹{course.price}</span>
          </div>
          {isAdmin ? (
            <button
              onClick={() => onEdit(course._id)}
              style={{ padding: '8px 18px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)', borderRadius: 8, color: '#f59e0b', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif" }}
            >
              Edit Course
            </button>
          ) : (
            <button
              onClick={() => onBuy(course._id)}
              style={{ padding: '8px 18px', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', border: 'none', borderRadius: 8, color: '#000', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.01em', fontFamily: "'DM Sans', sans-serif" }}
            >
              Enroll Now →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}