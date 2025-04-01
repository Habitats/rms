import * as C from '../constants/SessionConstants'

const initialState = {
  username: 'none',
  password: null,
  rememberMe: null,
  loginFailed: false,
  admin: false,
  loading: false,
  error: null,
  lastPath: null
}

export default function session(state = initialState, action) {
  console.log('Session reducer called with action:', action.type)
  console.log('Current state:', state)
  
  switch (action.type) {
    case C.FETCH_SESSION:
      return {
        ...state,
        loading: true,
        error: null
      }
      
    case C.FETCH_SESSION_SUCCESS:
      return {
        ...state,
        ...action.session,
        loading: false,
        error: null
      }
      
    case C.FETCH_SESSION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case C.UPDATE_SESSION:
      return {
        ...state,
        loading: true,
        error: null
      }
      
    case C.UPDATE_SESSION_SUCCESS:
      return {
        ...state,
        ...action.session,
        loading: false,
        error: null
      }
      
    case C.UPDATE_SESSION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case C.LOGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
      
    case C.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.session,
        loading: false,
        error: null,
        loginFailed: false
      }
      
    case C.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        loginFailed: true
      }

    case C.LOGOUT:
      return {
        ...state,
        loading: true,
        error: null
      }
      
    case C.LOGOUT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        error: null
      }
      
    case C.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case C.NAVIGATE:
      return {
        ...state,
        lastPath: action.payload.path
      }

    default:
      return state
  }
}
