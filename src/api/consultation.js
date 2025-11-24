import { post, get } from './http.js'

/**
 * Start consultation
 */
export async function startConsultation(symptoms) {
  try {
    const token = localStorage.getItem('token')
    const response = await post('/consultation/start', {
      symptoms: symptoms,
      token: token
    })
    
    if (response.success) {
      return response.data
    }
    
    throw new Error(response.message || 'Mulai konsultasi gagal')
  } catch (error) {
    console.error('Start consultation error:', error)
    throw error
  }
}

/**
 * Get consultation result
 */
export async function getConsultationResult(consultationId) {
  try {
    const token = localStorage.getItem('token')
    const response = await get(`/consultation/${consultationId}/result`, {
      token: token
    })
    
    if (response.success) {
      return response.data
    }
    
    throw new Error(response.message || 'Mendapatkan hasil konsultasi gagal')
  } catch (error) {
    console.error('Get consultation result error:', error)
    throw error
  }
}

/**
 * Get consultation history
 */
export async function getConsultationHistory() {
  try {
    const token = localStorage.getItem('token')
    const response = await get('/consultation/history', {
      token: token
    })
    
    if (response.success) {
      return response.data
    }
    
    throw new Error(response.message || 'Mendapatkan riwayat konsultasi gagal')
  } catch (error) {
    console.error('Get consultation history error:', error)
    throw error
  }
}

/**
 * Get symptoms list
 */
export async function getSymptoms() {
  try {
    const response = await get('/symptoms')
    
    if (response.success) {
      return response.data
    }
    
    throw new Error(response.message || 'Mendapatkan daftar gejala gagal')
  } catch (error) {
    console.error('Get symptoms error:', error)
    throw error
  }
}

/**
 * Get diseases list
 */
export async function getDiseases() {
  try {
    const response = await get('/diseases')
    
    if (response.success) {
      return response.data
    }
    
    throw new Error(response.message || 'Mendapatkan daftar penyakit gagal')
  } catch (error) {
    console.error('Get diseases error:', error)
    throw error
  }
}

/**
 * Save consultation
 */
export async function saveConsultation(consultationData) {
  try {
    const token = localStorage.getItem('token')
    const response = await post('/consultation/save', {
      ...consultationData,
      token: token
    })
    
    if (response.success) {
      return response.data
    }
    
    throw new Error(response.message || 'Menyimpan konsultasi gagal')
  } catch (error) {
    console.error('Save consultation error:', error)
    throw error
  }
}

export default {
  startConsultation,
  getConsultationResult,
  getConsultationHistory,
  getSymptoms,
  getDiseases,
  saveConsultation
}
