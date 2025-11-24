// Mobile API - Production Configuration
// Uses: VITE_API_URL environment variable
// For Vercel deployment: https://emrest.ct.ws/api
const BASE_URL = import.meta.env.VITE_API_URL || 'https://blueviolet-dinosaur-678797.hostingersite.com/';

/**
 * Generic HTTP GET request
 */
export async function get(endpoint, params = {}) {
  try {
    const url = new URL(BASE_URL + endpoint)
    
    // Add query parameters if any
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key])
    })
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('GET request error:', error)
    throw error
  }
}

/**
 * Generic HTTP POST request
 */
export async function post(endpoint, data = {}) {
  try {
    const url = BASE_URL + endpoint
    
    // Check if data is FormData or plain object
    const isFormData = data instanceof FormData
    
    const response = await fetch(url, {
      method: 'POST',
      headers: isFormData ? {} : {
        'Content-Type': 'application/json',
      },
      body: isFormData ? data : JSON.stringify(data),
      credentials: 'include'
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    return result
  } catch (error) {
    console.error('POST request error:', error)
    throw error
  }
}

/**
 * Generic HTTP PUT request
 */
export async function put(endpoint, data = {}) {
  try {
    const url = BASE_URL + endpoint
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    return result
  } catch (error) {
    console.error('PUT request error:', error)
    throw error
  }
}

/**
 * Generic HTTP DELETE request
 */
export async function del(endpoint) {
  try {
    const url = BASE_URL + endpoint
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    return result
  } catch (error) {
    console.error('DELETE request error:', error)
    throw error
  }
}

// Export default dengan semua methods
export default {
  get,
  post,
  put,
  del,
  BASE_URL
}
