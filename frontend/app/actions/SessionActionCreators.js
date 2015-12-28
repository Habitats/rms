import history from './../history'
import * as SessionConstants from './../constants/SessionConstants'
import * as sessionApi from './../api/SessionApi'

function success(session) {
  return {type: SessionConstants.RECEIVE_SESSION, session}
}

function fail() {
  return {type: SessionConstants.RECEIVE_SESSION_FAIL}
}

export function login(data) {
  return (dispatch) => {
    sessionApi.save(data).then(
      session => dispatch(success(session)),
      error => dispatch(fail)
    )
  }
}

export function logout(data) {
  return (dispatch) => {
    sessionApi.logout(data).then(
      session => dispatch(success(session)),
      error => dispatch(fail)
    )
  }
}

export function session(data = {}) {
  return (dispatch) => {
    sessionApi.newSession().then(
      session => dispatch(success(session)),
      error => dispatch(fail)
    )
  }
}
