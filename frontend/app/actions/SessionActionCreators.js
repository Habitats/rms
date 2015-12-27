import Marty from 'marty';
import history from './../history'
import SessionConstants from '../constants/SessionConstants';

class SessionActionCreators extends Marty.ActionCreators {

  updateSession(data) {
    this.app.sessionApi.save(data).then(session => {
      this.app.clearState(); // Clear all stores when we receive an updated session
      this.dispatch(SessionConstants.RECEIVE_SESSION, session);
    }).catch(error => {
      console.log(error);
    });
  }

  login(data) {
    this.app.sessionApi.save(data).then(session => {
      this.app.clearState(); // Clear all stores when we receive an updated session
      this.dispatch(SessionConstants.RECEIVE_SESSION, session);
      history.pushState(null, '/prosjekt')
    }).catch(error => {
      console.log(error);
    });
  }

  logout(data) {
    this.app.sessionApi.logout(data).then(session => {
      this.app.clearState(); // Clear all stores when we receive an updated session
      this.dispatch(SessionConstants.RECEIVE_SESSION, session);
    }).catch(error => {
      console.log(error);
    });
  }
}

export default SessionActionCreators;
