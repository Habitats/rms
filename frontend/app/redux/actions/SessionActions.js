import * as C from '../constants/SessionConstants'
import * as SessionApi from './../api/SessionApi'

export function login(data) {
  return (dispatch) => {
    dispatch({type: C.LOGIN})
    return SessionApi.login(data).then(
      session => dispatch({type: C.LOGIN_SUCCESS, session}),
      error => dispatch({type: C.LOGIN_FAIL})
    )
  }
}

export function logout(data) {
  return (dispatch) => {
    dispatch({type: C.LOGOUT})
    return SessionApi.logout(data).then(
      session => dispatch({type: C.LOGOUT_SUCCESS, session}),
      error => dispatch({type: C.LOGOUT_FAIL})
    )
  }
}

export function session(data) {
  if (data) {
    return (dispatch) => {
      dispatch({type: C.FETCH_SESSION})
      return SessionApi.save(data).then(
        session => dispatch({type: C.UPDATE_SESSION_SUCCESS, session}),
        error => dispatch({type: C.UPDATE_SESSION_FAIL})
      )
    }
  } else {
    return (dispatch) => {
      dispatch({type: C.FETCH_SESSION})
      return SessionApi.retrieve().then(
        session => dispatch({type: C.FETCH_SESSION_SUCCESS, session}),
        error => dispatch({type: C.FETCH_SESSION_FAIL})
      )
    }
  }
}
