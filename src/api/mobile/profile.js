/**
 * Profile Service untuk Mobile App
 * File: src/api/mobile/profile.js
 */

import { get, put, post } from '../http.js'

/**
 * Get user profile
 */
export async function getProfile() {
  try {
    const response = await get('/profile.php?action=get')
    
    if (response.success) {
      return response.data
    } else {
      throw new Error(response.message || 'Failed to get profile')
    }
  } catch (error) {
    console.error('Get profile error:', error)
    throw error
  }
}

/**
 * Update user profile
 */
export async function updateProfile(name) {
  try {
    const response = await put('/profile.php?action=update', { name })
    
    if (response.success) {
      return response.data
    } else {
      throw new Error(response.message || 'Failed to update profile')
    }
  } catch (error) {
    console.error('Update profile error:', error)
    throw error
  }
}

/**
 * Change password
 */
export async function changePassword(currentPassword, newPassword, newPasswordConfirmation) {
  try {
    const response = await post('/profile.php?action=change_password', {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: newPasswordConfirmation
    })
    
    if (response.success) {
      return true
    } else {
      throw new Error(response.message || 'Failed to change password')
    }
  } catch (error) {
    console.error('Change password error:', error)
    throw error
  }
}
