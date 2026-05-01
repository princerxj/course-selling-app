import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import { courseAPI } from '../api'

export default function AdminDashboard() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => { fetchAdminCourses() }, [])

  const fetchAdminCourses = async () => {
    try {
      const response = await courseAPI.getAdminCourses()
      setCourses(response.data.courses)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally { setLoading(false) }
  }

  const handleEdit = (courseId) => navigate(`/admin-edit-course/${courseId}`)

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Fraunces:ital,wght@0,700;1,400&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '100px 24px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#f59e0b', letterSpacing: '0.1em', margin: '0 0 8px' }}>ADMIN DASHBOARD</p>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 44, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-1px' }}>
              Your Courses
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 15, margin: '8px 0 0' }}>
              {courses.length} course{courses.length !== 1 ? 's' : ''} published
            </p>
          </div>

          <button
            onClick={() => navigate('/admin-create-course')}
            style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', border: 'none', borderRadius: 10, color: '#000', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.01em' }}
          >
            + New Course
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex' }}>
          {[
            ['Total Courses', courses.length],
            ['Total Revenue', `₹${courses.reduce((a, c) => a + (c.price || 0), 0).toLocaleString()}`],
            ['Avg. Price', courses.length ? `₹${Math.round(courses.reduce((a, c) => a + (c.price || 0), 0) / courses.length)}` : '₹0'],
          ].map(([label, val]) => (
            <div key={label} style={{ padding: '24px 48px 24px 0', marginRight: 48, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: '#fff' }}>{val}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 4, letterSpacing: '0.05em' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ display: 'inline-block', width: 36, height: 36, border: '3px solid rgba(245,158,11,0.2)', borderTopColor: '#f59e0b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        ) : courses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 24px', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: 20 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 18, margin: '0 0 24px', fontFamily: "'Fraunces', serif" }}>No courses yet</p>
            <button
              onClick={() => navigate('/admin-create-course')}
              style={{ padding: '12px 28px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 10, color: '#f59e0b', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
            >
              Create your first course →
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {courses.map(course => (
              <CourseCard key={course._id} course={course} onEdit={handleEdit} isAdmin={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}