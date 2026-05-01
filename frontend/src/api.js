import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export const authAPI = {
  userSignup: (email, password) => api.post('/user/signup', { email, password }),
  userSignin: (email, password) => api.post('/user/signin', { email, password }),
  adminSignup: (email, password) => api.post('/admin/signup', { email, password }),
  adminSignin: (email, password) => api.post('/admin/signin', { email, password }),
};

export const courseAPI = {
  getAllCourses: () => api.get('/course/preview'),
  purchaseCourse: (courseId) => api.post('/course/purchase', { courseId }),
  getAdminCourses: () => api.get('/admin/course/bulk'),
  createCourse: (formData) => api.post('/admin/course', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateCourse: (courseId, formData) => api.put('/admin/course', {
    ...formData,
    courseId
  }, {
    headers: formData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
  }),
};

export default api;
