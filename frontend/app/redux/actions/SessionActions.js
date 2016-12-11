import * as C from '../constants/SessionConstants'
import * as SessionApi from './../api/SessionApi'

export function login(data) {
  return (dispatch) => {
    return SessionApi.login(data).then(
      session => dispatch({type: C.LOGIN_SUCCESS, session}),
      error => dispatch({type: C.LOGIN_FAIL})
    )
  }
}

export function logout(data) {
  return (dispatch) => {
    return SessionApi.logout(data).then(
      session => dispatch({type: C.LOGOUT_SUCCESS, session}),
      error => dispatch({type: C.LOGOUT_FAIL})
    )
  }
}

export function session(data) {
  if (data) {
    return (dispatch) => {
      return SessionApi.save(data).then(
        session => dispatch({type: C.UPDATE, session}),
        error => dispatch({type: C.UPDATE_FAIL})
      )
    }
  } else {
    return (dispatch) => {
      return SessionApi.retrieve().then(
        session => dispatch({type: C.NEW, session}),
        error => dispatch({type: C.NEW_FAIL})
      )
    }
  }
}
