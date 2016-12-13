import * as C from '../constants/SessionConstants'
import {UPDATE_PATH} from 'react-router-redux'

const initialState = {
  username: 'none',
  password: null,
  rememberMe: null,
  loginFailed: false,
  admin: false
}

export default function session(state = initialState, action) {
  switch (action.type) {
    case C.FETCH_SESSION_SUCCESS:
      return action.session

    case C.UPDATE_SESSION_SUCCESS:
      return action.session

    case C.LOGIN_SUCCESS:
      return action.session

    case C.LOGIN_FAIL:
      return {... state, loginFailed: true}

    case C.LOGOUT_SUCCESS:
      return action.session

    case UPDATE_PATH:
      return {... state, path: action.payload.path}

    default:
      return state
  }
}
