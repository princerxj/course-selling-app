import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { courseAPI } from '../api'

export default function AdminCreateCourse() {
  const [formData, setFormData] = useState({ title: '', description: '', price: '', image: null })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData({ ...formData, image: file })
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const courseFormData = new FormData()
      courseFormData.append('title', formData.title)
      courseFormData.append('description', formData.description)
      courseFormData.append('price', formData.price)
      if (formData.image) courseFormData.append('image', formData.image)
      await courseAPI.createCourse(courseFormData)
      navigate('/admin-dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating course')
    } finally { setLoading(false) }
  }

  return <CourseFormPage title="Create New Course" onSubmit={handleSubmit} formData={formData} onChange={handleChange} onFileChange={handleFileChange} loading={loading} error={error} preview={preview} submitLabel="Publish Course" navigate={navigate} />
}

export function CourseFormPage({ title, onSubmit, formData, onChange, onFileChange, loading, error, preview, submitLabel, navigate }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Fraunces:ital,wght@0,700;1,400&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 24px 60px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
          <span style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }} onClick={() => navigate('/admin-dashboard')}>Dashboard</span>
          <span>/</span>
          <span style={{ color: '#f59e0b' }}>{title}</span>
        </div>

        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 40, fontWeight: 700, color: '#fff', margin: '0 0 48px', letterSpacing: '-1px' }}>{title}</h1>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '14px 18px', color: '#f87171', fontSize: 14, marginBottom: 24 }}>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Image Upload */}
          <div>
            <label style={labelStyle}>Course Thumbnail</label>
            <div style={{ position: 'relative', height: 200, background: preview ? 'transparent' : 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}
              onClick={() => document.getElementById('fileInput').click()}>
              {preview ? (
                <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <>
                  <div style={{ fontSize: 32 }}>🖼️</div>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, margin: 0 }}>Click to upload image</p>
                  <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, margin: 0 }}>PNG, JPG, JPEG</p>
                </>
              )}
              <input id="fileInput" type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} required={submitLabel === 'Publish Course'} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Course Title</label>
            <input type="text" name="title" value={formData.title} onChange={onChange} required placeholder="e.g. Complete React Developer Bootcamp" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea name="description" value={formData.description} onChange={onChange} required rows={5} placeholder="What will students learn in this course?" style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
          </div>

          <div>
            <label style={labelStyle}>Price (₹)</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>₹</span>
              <input type="number" name="price" value={formData.price} onChange={onChange} required placeholder="999" style={{ ...inputStyle, paddingLeft: 36 }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: '14px', background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #f59e0b, #ef4444)', border: 'none', borderRadius: 10, color: '#000', fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Publishing...' : submitLabel}
            </button>
            <button type="button" onClick={() => navigate('/admin-dashboard')} style={{ padding: '14px 24px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 500, fontSize: 15, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 10, letterSpacing: '0.04em' }
const inputStyle = { width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box', fontFamily: "'DM Sans', sans-serif' " }