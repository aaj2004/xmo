/**
 * Auth Service untuk Mobile App
 * File: src/api/mobile/auth.js
 */

import { get, post } from '../http.js'

/**
 * Login user
 */
export async function login(email, password) {
  try {
    const response = await post('/auth.php?action=login', {
      email,
      password
    })
    
    if (response.success && response.data) {
      // Store user data
      localStorage.setItem('user', JSON.stringify(response.data))
      localStorage.setItem('authenticated', 'true')
      return response.data
    } else {
      throw new Error(response.message || 'Login failed')
    }
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

/**
 * Register new user
 */
export async function register(name, email, password, passwordConfirmation) {
  try {
    const response = await post('/auth.php?action=register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation
    })
    
    if (response.success && response.data) {
      // Auto login after registration
      localStorage.setItem('user', JSON.stringify(response.data))
      localStorage.setItem('authenticated', 'true')
      return response.data
    } else {
      throw new Error(response.message || 'Registration failed')
    }
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

/**
 * Logout user
 */
export async function logout() {
  try {
    const response = await post('/auth.php?action=logout')
    
    // Clear local storage
    localStorage.removeItem('user')
    localStorage.removeItem('authenticated')
    
    return response.success
  } catch (error) {
    console.error('Logout error:', error)
    // Clear local storage anyway
    localStorage.removeItem('user')
    localStorage.removeItem('authenticated')
    throw error
  }
}

/**
 * Get current user info from API
 */
export async function getCurrentUser() {
  try {
    const response = await get('/auth.php?action=me')
    
    if (response.success && response.data) {
      return response.data
    } else {
      throw new Error(response.message || 'Failed to get user info')
    }
  } catch (error) {
    console.error('Get current user error:', error)
    throw error
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  return localStorage.getItem('authenticated') === 'true'
}

/**
 * Get stored user from localStorage
 */
export function getStoredUser() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

/**
 * Get current user ID
 */
export function getUserId() {
  const user = getStoredUser()
  return user?.user_id || null
}
