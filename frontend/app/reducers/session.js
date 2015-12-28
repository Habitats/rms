import * as SessionConstants from '../constants/SessionConstants'

const initialState = {
  user: null,
  admin: false,
  modified: new Date().getMilliseconds()
}

export default function session(state = initialState, action) {
  switch (action.type) {
    case SessionConstants.RECEIVE_SESSION:
      return action.payload;
    case SessionConstants.RECEIVE_SESSION_FAIL:
      return state;
    default:
      return state;
  }
}
