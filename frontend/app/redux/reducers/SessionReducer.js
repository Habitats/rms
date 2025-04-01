import * as C from '../constants/SessionConstants'

const initialState = {
  session: null,
  loading: false,
  error: null
}

export default function sessionReducer(state = initialState, action) {
  console.log('Session reducer called with action:', action.type)
  console.log('Current state:', state)
  
  switch (action.type) {
    case C.FETCH_SESSION:
      console.log('Fetching session...')
      return {
        ...state,
        loading: true,
        error: null
      }
      
    case C.FETCH_SESSION_SUCCESS:
      console.log('Session fetched successfully:', action.session)
      return {
        ...state,
        session: action.session,
        loading: false,
        error: null
      }
      
    case C.FETCH_SESSION_FAIL:
      console.error('Session fetch failed:', action.error)
      return {
        ...state,
        loading: false,
        error: action.error
      }
      
    case C.UPDATE_SESSION_SUCCESS:
      console.log('Session updated successfully:', action.session)
      return {
        ...state,
        session: action.session,
        loading: false,
        error: null
      }
      
    case C.UPDATE_SESSION_FAIL:
      console.error('Session update failed:', action.error)
      return {
        ...state,
        loading: false,
        error: action.error
      }
      
    case C.LOGIN:
      console.log('Login in progress...')
      return {
        ...state,
        loading: true,
        error: null
      }
      
    case C.LOGIN_SUCCESS:
      console.log('Login successful:', action.session)
      return {
        ...state,
        session: action.session,
        loading: false,
        error: null
      }
      
    case C.LOGIN_FAIL:
      console.error('Login failed:', action.error)
      return {
        ...state,
        loading: false,
        error: action.error
      }
      
    case C.LOGOUT:
      console.log('Logout in progress...')
      return {
        ...state,
        loading: true,
        error: null
      }
      
    case C.LOGOUT_SUCCESS:
      console.log('Logout successful')
      return {
        ...state,
        session: null,
        loading: false,
        error: null
      }
      
    case C.LOGOUT_FAIL:
      console.error('Logout failed:', action.error)
      return {
        ...state,
        loading: false,
        error: action.error
      }
      
    default:
      return state
  }
} 