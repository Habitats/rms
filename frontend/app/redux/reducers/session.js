import * as C from "../constants/sessionConstants";
import {UPDATE_PATH} from "redux-simple-router";

const initialState = {
  username: 'none',
  password: null,
  rememberMe: null,
  loginFailed: false,
  admin: false
}

export default function session(state = initialState, action) {
  switch (action.type) {
    case C.NEW:
      return action.session

    case C.UPDATE:
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
