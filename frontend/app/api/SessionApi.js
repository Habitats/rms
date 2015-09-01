import Marty from 'marty';

const baseUrl = '/';

class SessionApi extends Marty.HttpStateSource {

  getSession() {
    return this.get(`${baseUrl}session`).then(res => {
      if (res.status === 200) {
        return res.body;
      }

      throw res.info;
    });
  }

  logout(user) {
    return this.post({url: `${baseUrl}session/logout`, body: user}).then(res => {
      if (res.status === 200) {
        return res.body;
      }

      throw res.info;
    });
  }

  save(session) {
    return this.post({url: `${baseUrl}session`, body: session}).then(res => {
      if (res.status === 200) {
        return res.body;
      }

      throw res.info;
    });
  }
}

export default SessionApi;
