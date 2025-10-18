import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
            refresh: refreshToken,
          })

          const { access } = response.data
          localStorage.setItem('access_token', access)
          api.defaults.headers.common['Authorization'] = `Bearer ${access}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (userData) => api.post('/api/accounts/register/', userData),
  refresh: (refreshToken) => api.post('/auth/refresh/', { refresh: refreshToken }),
  me: () => api.get('/api/accounts/me/'),
}

// Products API
export const productsAPI = {
  getProducts: (params = {}) => api.get('/api/products/products/', { params }),
  getProduct: (id) => api.get(`/api/products/products/${id}/`),
  createProduct: (data) => api.post('/api/products/products/create/', data),
  updateProduct: (id, data) => api.put(`/api/products/products/${id}/update/`, data),
  deleteProduct: (id) => api.delete(`/api/products/products/${id}/delete/`),
}

// Cart API
export const cartAPI = {
  getCart: () => api.get('/api/cart/'),
  addToCart: (data) => api.post('/api/cart/add/', data),
  updateCartItem: (id, data) => api.put(`/api/cart/update/${id}/`, data),
  removeCartItem: (id) => api.delete(`/api/cart/remove/${id}/`),
  clearCart: () => api.delete('/api/cart/clear/'),
}

// Orders API
export const ordersAPI = {
  getOrders: () => api.get('/api/orders/'),
  getOrder: (id) => api.get(`/api/orders/${id}/`),
  createOrder: (data) => api.post('/api/orders/create/', data),
}

export default api
