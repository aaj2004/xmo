import { post, get } from './http.js'

/**
 * Login user
 */
export async function login(email, password) {
  try {
    const response = await post('/auth/login', {
      email: email,
      password: password
    })
    
    if (response.success && response.data?.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      return response.data
    }
    
    throw new Error(response.message || 'Login gagal')
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

/**
 * Register user
 */
export async function register(userData) {
  try {
    const response = await post('/auth/register', userData)
    
    if (response.success) {
      return response.data
    }
    
    throw new Error(response.message || 'Registrasi gagal')
  } catch (error) {
    console.error('Register error:', error)
    throw error
  }
}

/**
 * Get current user info
 */
export async function getCurrentUser() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null
    
    const response = await get('/user/profile', {
      token: token
    })
    
    if (response.success) {
      return response.data
    }
    
    return null
  } catch (error) {
    console.error('Get user error:', error)
    return null
  }
}

/**
 * Update user profile
 */
export async function updateProfile(userData) {
  try {
    const token = localStorage.getItem('token')
    const response = await post('/user/profile/update', {
      ...userData,
      token: token
    })
    
    if (response.success) {
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    }
    
    throw new Error(response.message || 'Update profile gagal')
  } catch (error) {
    console.error('Update profile error:', error)
    throw error
  }
}

/**
 * Logout user
 */
export async function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  return !!localStorage.getItem('token')
}

/**
 * Get stored user data
 */
export function getStoredUser() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

/**
 * Get auth token
 */
export function getToken() {
  return localStorage.getItem('token')
}

export default {
  login,
  register,
  getCurrentUser,
  updateProfile,
  logout,
  isAuthenticated,
  getStoredUser,
  getToken
}
