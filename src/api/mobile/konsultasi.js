/**
 * Consultation Service untuk Mobile App
 * File: src/api/mobile/konsultasi.js
 */

import { get, post } from '../http.js'

/**
 * Get list of all symptoms
 */
export async function getSymptoms() {
  try {
    const response = await get('/gejala.php')
    
    if (response.success) {
      return response.data || []
    } else {
      throw new Error(response.message || 'Failed to get symptoms')
    }
  } catch (error) {
    console.error('Get symptoms error:', error)
    throw error
  }
}

/**
 * Start consultation with user answers
 */
export async function startConsultation(gejalaJawaban) {
  try {
    const response = await post('/konsultasi.php?action=start', {
      gejala_jawaban: gejalaJawaban
    })
    
    if (response.success) {
      return response.data
    } else {
      throw new Error(response.message || 'Failed to start consultation')
    }
  } catch (error) {
    console.error('Start consultation error:', error)
    throw error
  }
}

/**
 * Get consultation history
 */
export async function getConsultationHistory() {
  try {
    const response = await get('/konsultasi.php?action=history')
    
    if (response.success) {
      return response.data || []
    } else {
      throw new Error(response.message || 'Failed to get consultation history')
    }
  } catch (error) {
    console.error('Get consultation history error:', error)
    throw error
  }
}

/**
 * Get consultation result by ID
 */
export async function getConsultationResult(consultationId) {
  try {
    const response = await get(`/konsultasi.php?action=result&id=${consultationId}`)
    
    if (response.success) {
      return response.data
    } else {
      throw new Error(response.message || 'Failed to get consultation result')
    }
  } catch (error) {
    console.error('Get consultation result error:', error)
    throw error
  }
}
