import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { courseAPI } from '../api'
import { CourseFormPage } from './AdminCreateCourse'

export default function AdminEditCourse() {
  const { courseId } = useParams()
  const [formData, setFormData] = useState({ title: '', description: '', price: '', image: null, courseId })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()

  useEffect(() => { fetchCourseData() }, [courseId])

  const fetchCourseData = async () => {
    try {
      const response = await courseAPI.getAdminCourses()
      const course = response.data.courses.find(c => c._id === courseId)
      if (course) {
        setFormData(prev => ({ ...prev, title: course.title, description: course.description, price: course.price }))
        if (course.imageUrl) setPreview(course.imageUrl)
      }
    } catch (err) {
      setError('Error fetching course data')
    } finally { setLoading(false) }
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData({ ...formData, image: file })
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true); setError('')
    try {
      const courseFormData = new FormData()
      courseFormData.append('title', formData.title)
      courseFormData.append('description', formData.description)
      courseFormData.append('price', formData.price)
      if (formData.image) courseFormData.append('image', formData.image)
      await courseAPI.updateCourse(courseId, courseFormData)
      navigate('/admin-dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating course')
    } finally { setSubmitting(false) }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 36, height: 36, border: '3px solid rgba(245,158,11,0.2)', borderTopColor: '#f59e0b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  return (
    <CourseFormPage
      title="Edit Course"
      onSubmit={handleSubmit}
      formData={formData}
      onChange={handleChange}
      onFileChange={handleFileChange}
      loading={submitting}
      error={error}
      preview={preview}
      submitLabel="Save Changes"
      navigate={navigate}
    />
  )
}