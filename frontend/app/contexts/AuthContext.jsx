import React, { createContext, useContext, useState, useEffect } from 'react'
import { SessionApi } from '../api/SessionApi'

/**
 * @typedef {Object} AuthContextType
 * @property {Object} session - Current session data
 * @property {boolean} isLoading - Loading state
 * @property {string} error - Error message
 * @property {Function} login - Login function
 * @property {Function} logout - Logout function
 * @property {Function} updateSession - Update session function
 */

const AuthContext = createContext(/** @type {AuthContextType} */ (null))

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    retrieveSession()
  }, [])

  const retrieveSession = async () => {
    try {
      console.log('Auth: Retrieving session')
      setIsLoading(true)
      setError(null)
      const sessionData = await SessionApi.retrieve()
      console.log('Auth: Session retrieved successfully:', sessionData)
      setSession(sessionData)
    } catch (err) {
      console.error('Auth: Failed to retrieve session:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      console.log('Auth: Login attempt with data:', credentials)
      setIsLoading(true)
      setError(null)
      const sessionData = await SessionApi.login(credentials)
      console.log('Auth: Login successful:', sessionData)
      setSession(sessionData)
      return sessionData
    } catch (err) {
      console.error('Auth: Login failed:', err)
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      console.log('Auth: Logout attempt')
      setIsLoading(true)
      setError(null)
      await SessionApi.logout()
      console.log('Auth: Logout successful')
      setSession(null)
    } catch (err) {
      console.error('Auth: Logout failed:', err)
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const updateSession = async (data) => {
    try {
      console.log('Auth: Updating session with data:', data)
      setIsLoading(true)
      setError(null)
      const sessionData = await SessionApi.save(data)
      console.log('Auth: Session updated successfully:', sessionData)
      setSession(sessionData)
      return sessionData
    } catch (err) {
      console.error('Auth: Failed to update session:', err)
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    session,
    isLoading,
    error,
    login,
    logout,
    updateSession
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 