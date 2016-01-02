import history from './../../history'
import * as C from './../constants/SessionConstants'
import * as sessionApi from './../api/SessionApi'

export function login(data) {
  return (dispatch) => {
    return sessionApi.login(data).then(
      session => dispatch({type: C.LOGIN_SUCCESS, session}),
      error => dispatch({type: C.LOGIN_FAIL})
    )
  }
}

export function logout(data) {
  return (dispatch) => {
    return sessionApi.logout(data).then(
      session => dispatch({type: C.LOGOUT_SUCCESS, session}),
      error => dispatch({type: C.LOGOUT_FAIL})
    )
  }
}

export function session(data) {
  if (data) {
    return (dispatch) => {
      return sessionApi.save(data).then(
        session => dispatch({type: C.UPDATE, session}),
        error => dispatch({type: C.UPDATE_FAIL})
      )
    }
  } else {
    return (dispatch) => {
      return sessionApi.retrieve().then(
        session => dispatch({type: C.NEW, session}),
        error => dispatch({type: C.NEW_FAIL})
      )
    }
  }
}