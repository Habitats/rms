import { API_URL } from '../config'

/**
 * @typedef {Object} Session
 * @property {number} id - User ID
 * @property {string} email - User email
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} role - User role
 * @property {boolean} admin - Whether user is admin
 * @property {string} username - Username
 */

/**
 * Development fallback session data
 * @type {Session}
 */
const developmentFallback = {
  id: 1,
  email: 'dev@example.com',
  firstName: 'Dev',
  lastName: 'User',
  role: 'admin',
  admin: true,
  username: 'dev'
}

/**
 * Parses JSON response
 * @param {Response} response - Fetch Response object
 * @returns {Promise<Session>}
 * @throws {Error}
 */
const parseJson = async (response) => {
  console.log('Session API response:', response)
  if (!response.ok) {
    console.error('Session API error:', response.status, response.statusText)
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

/**
 * Makes an API request
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Session>}
 */
const makeRequest = async (endpoint, options = {}) => {
  console.log(`Session API: Making request to ${endpoint}`)
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Development mode: Using fallback session')
    return developmentFallback
  }

  const url = `${API_URL}${endpoint}`
  console.log('Request URL:', url)
  
  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        ...options.headers
      }
    })
    return parseJson(response)
  } catch (error) {
    console.error('Session API request failed:', error)
    throw error
  }
}

/**
 * Retrieves the current session
 * @returns {Promise<Session>}
 */
export const retrieve = async () => {
  console.log('Session API: Retrieving session')
  return makeRequest('/session')
}

/**
 * Saves session data
 * @param {Object} data - Session data to save
 * @returns {Promise<Session>}
 */
export const save = async (data) => {
  console.log('Session API: Saving session with data:', data)
  return makeRequest('/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

/**
 * Attempts to login
 * @param {Object} data - Login credentials
 * @returns {Promise<Session>}
 */
export const login = async (data) => {
  console.log('Session API: Login attempt with data:', data)
  return makeRequest('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

/**
 * Attempts to logout
 * @returns {Promise<void>}
 */
export const logout = async () => {
  console.log('Session API: Logout attempt')
  return makeRequest('/logout', {
    method: 'POST'
  })
} 