import * as C from '../constants/SessionConstants'
import * as SessionApi from './../api/SessionApi'

export function login(data) {
  console.log('Login action dispatched with data:', data)
  return (dispatch) => {
    dispatch({type: C.LOGIN})
    return SessionApi.login(data).then(
      session => {
        console.log('Login success:', session)
        dispatch({type: C.LOGIN_SUCCESS, session})
      },
      error => {
        console.error('Login failed:', error)
        dispatch({type: C.LOGIN_FAIL})
      }
    )
  }
}

export function logout(data) {
  console.log('Logout action dispatched with data:', data)
  return (dispatch) => {
    dispatch({type: C.LOGOUT})
    return SessionApi.logout(data).then(
      session => {
        console.log('Logout success:', session)
        dispatch({type: C.LOGOUT_SUCCESS, session})
      },
      error => {
        console.error('Logout failed:', error)
        dispatch({type: C.LOGOUT_FAIL})
      }
    )
  }
}

export function session(data) {
  console.log('Session action dispatched with data:', data)
  if (data) {
    return (dispatch) => {
      dispatch({type: C.FETCH_SESSION})
      return SessionApi.save(data).then(
        session => {
          console.log('Session update success:', session)
          dispatch({type: C.UPDATE_SESSION_SUCCESS, session})
        },
        error => {
          console.error('Session update failed:', error)
          dispatch({type: C.UPDATE_SESSION_FAIL})
        }
      )
    }
  } else {
    return (dispatch) => {
      dispatch({type: C.FETCH_SESSION})
      return SessionApi.retrieve().then(
        session => {
          console.log('Session retrieve success:', session)
          dispatch({type: C.FETCH_SESSION_SUCCESS, session})
        },
        error => {
          console.error('Session retrieve failed:', error)
          dispatch({type: C.FETCH_SESSION_FAIL})
        }
      )
    }
  }
}
