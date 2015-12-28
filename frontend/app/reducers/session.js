import * as SessionConstants from '../constants/SessionConstants'

const initialState = {
  id: null,
  username: 'none',
  password: null,
  rememberMe: null,
  admin: false,
  modified: new Date().getMilliseconds()
}

export default function session(state = initialState, action) {
  switch (action.type) {
    case SessionConstants.UPDATE:
      return action.session;
    case SessionConstants.NEW:
      return action.session;
    case SessionConstants.LOGIN_SUCCESS:
      return action.session;
    default:
      return state;
  }
}
