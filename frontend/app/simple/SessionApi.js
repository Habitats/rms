// Simple session API service
const API_URL = process.env.API_URL || 'http://localhost:3000'

export const SessionApi = {
  session: async () => {
    console.log('SessionApi.session called')
    if (process.env.NODE_ENV === 'development') {
      console.log('Using development fallback session')
      return {
        isAuthenticated: true,
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User'
        }
      }
    }
    
    try {
      const response = await window.fetch(`${API_URL}/api/session`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Session API response:', data)
      return data
    } catch (error) {
      console.error('Session API error:', error)
      throw error
    }
  },

  login: async (credentials) => {
    console.log('SessionApi.login called with:', credentials)
    if (process.env.NODE_ENV === 'development') {
      console.log('Using development fallback login')
      return {
        isAuthenticated: true,
        user: {
          id: 1,
          email: credentials.username,
          name: 'Test User'
        }
      }
    }
    
    try {
      const response = await window.fetch(`${API_URL}/api/session`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Login API response:', data)
      return data
    } catch (error) {
      console.error('Login API error:', error)
      throw error
    }
  },

  logout: async () => {
    console.log('SessionApi.logout called')
    if (process.env.NODE_ENV === 'development') {
      console.log('Using development fallback logout')
      return { isAuthenticated: false, user: null }
    }
    
    try {
      const response = await window.fetch(`${API_URL}/api/session`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Logout API response:', data)
      return data
    } catch (error) {
      console.error('Logout API error:', error)
      throw error
    }
  }
} 