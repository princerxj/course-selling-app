import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import { courseAPI } from '../api'

export default function Home() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await courseAPI.getAllCourses()
      setCourses(response.data.courses)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBuy = async (courseId) => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    try {
      await courseAPI.purchaseCourse(courseId)
      navigate('/purchase-success')
    } catch (error) {
      alert('Error purchasing course: ' + error.message)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Fraunces:ital,wght@0,700;0,900;1,400&display=swap" rel="stylesheet" />

      {/* Hero */}
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Background effects */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, background: 'rgba(239,68,68,0.06)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 400, height: 400, background: 'rgba(245,158,11,0.05)', borderRadius: '50%', filter: 'blur(100px)' }} />

        {/* Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px', opacity: 0.5 }} />

        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 800, padding: '120px 24px 80px', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 100, padding: '6px 16px', marginBottom: 32 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#f59e0b', letterSpacing: '0.08em' }}>LIVE COURSES AVAILABLE</span>
          </div>

          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, margin: '0 0 24px', letterSpacing: '-2px' }}>
            Master skills that
            <br />
            <em style={{ fontStyle: 'italic', color: '#f59e0b' }}>matter.</em>
          </h1>

          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 48px', fontWeight: 400 }}>
            Expert-crafted courses to accelerate your career. Learn at your own pace, on your own terms.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#courses" style={{ padding: '14px 32px', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', borderRadius: 10, color: '#000', fontWeight: 700, fontSize: 15, textDecoration: 'none', letterSpacing: '0.01em' }}>
              Browse Courses →
            </a>
            <a href="/signup" style={{ padding: '14px 32px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#fff', fontWeight: 500, fontSize: 15, textDecoration: 'none' }}>
              Create Account
            </a>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 72, paddingTop: 48, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {[['500+', 'Students'], ['50+', 'Courses'], ['4.9★', 'Rating']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: '#fff' }}>{val}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div id="courses" style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#f59e0b', letterSpacing: '0.1em', margin: '0 0 8px' }}>ALL COURSES</p>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 40, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-1px' }}>
              Start learning today
            </h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, margin: 0 }}>{courses.length} courses available</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ display: 'inline-block', width: 36, height: 36, border: '3px solid rgba(245,158,11,0.2)', borderTopColor: '#f59e0b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg) } } @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
          </div>
        ) : courses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)', fontSize: 16 }}>
            No courses available yet. Check back soon.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {courses.map(course => (
              <CourseCard key={course._id} course={course} onBuy={handleBuy} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, margin: 0 }}>
          © 2025 <span style={{ fontFamily: "'Fraunces', serif", color: 'rgba(255,255,255,0.4)' }}>Coursify</span> · Built with passion
        </p>
      </div>
    </div>
  )
}