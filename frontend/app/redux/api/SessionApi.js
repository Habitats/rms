import { API_URL } from '../../config'

const parseJson = (response) => {
  console.log('Session API response:', response)
  if (!response.ok) {
    console.error('Session API error:', response.status, response.statusText)
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

const developmentFallback = {
  id: 1,
  email: 'dev@example.com',
  firstName: 'Dev',
  lastName: 'User',
  role: 'admin',
  admin: true,
  username: 'dev'
}

const makeRequest = (endpoint, options = {}) => {
  console.log(`Session API: Making request to ${endpoint}`)
  if (process.env.NODE_ENV === 'development') {
    console.log('Development mode: Using fallback session')
    return Promise.resolve(developmentFallback)
  }

  const url = `${API_URL}${endpoint}`
  console.log('Request URL:', url)
  
  return fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      ...options.headers
    }
  }).then(parseJson)
}

export const retrieve = () => {
  console.log('Session API: Retrieving session')
  return makeRequest('/session')
}

export const save = (data) => {
  console.log('Session API: Saving session with data:', data)
  return makeRequest('/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const login = (data) => {
  console.log('Session API: Login attempt with data:', data)
  return makeRequest('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const logout = () => {
  console.log('Session API: Logout attempt')
  return makeRequest('/logout', {
    method: 'POST'
  })
}


