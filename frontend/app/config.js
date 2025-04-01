// API URL configuration
export const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8000/api'  // Development API URL
  : '/api'  // Production API URL (relative path)

// Other configuration constants can be added here
export const APP_NAME = 'RMS'
export const APP_VERSION = '1.0.0' 