import Marty from 'marty';
import SessionConstants from './../constants/SessionConstants.js';

class SessionStore extends Marty.Store {
  constructor(props) {
    super(props);
    this.state = {};
    this.handlers = {
      setSession: SessionConstants.RECEIVE_SESSION
    };
  }

  setSession(session) {
    this.setState(session);
  }

  getSession() {
    return this.fetch({
      id: 'session',
      locally() {
        if (this.hasAlreadyFetched('session')) {
          return this.state;
        }
      },
      remotely() {
        return this.app.sessionQueries.getSession();
      }
    });
  }
}

export default SessionStore;
