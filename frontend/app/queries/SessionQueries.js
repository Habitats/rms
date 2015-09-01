import Marty from 'marty';
import SessionConstants from '../constants/SessionConstants';

class SessionQueries extends Marty.Queries {

  getSession() {
    return this.app.sessionApi.getSession()
      .then(session => {
        this.dispatch(SessionConstants.RECEIVE_SESSION, session);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default SessionQueries;
