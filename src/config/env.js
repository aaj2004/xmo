/**
 * Environment Configuration
 */

const ENV = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'https://blueviolet-dinosaur-678797.hostingersite.com/api/mobile',
  
  // Feature flags
  DEBUG_MODE: import.meta.env.VITE_DEBUG === 'true',
  
  // App info
  APP_NAME: 'Sistem Pakar Diagnosis',
  APP_VERSION: '1.0.0'
}

export default ENV
