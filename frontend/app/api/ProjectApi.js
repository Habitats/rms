import Marty from 'marty';

const baseUrl = 'http://localhost:8080/';

class ProjectApi extends Marty.HttpStateSource {

  getProjects() {
    return this.get(`${baseUrl}projects`).then(res => {
      if (res.status === 200) {
        return res.body;
      }

      throw res.info;
    });
  }

  getImages(){
    return this.get(`${baseUrl}images`).then(res => {
      if (res.status === 200) {
        return res.body;
      }

      throw res.info;
    });
  }

  save(project) {
    return this.post({url: baseUrl, body: project}).then(res => {
      if (res.status === 200) {
        return res.body;
      }

      throw res.info;
    });
  }

  sendMail(email) {
    return this.post({url: baseUrl + 'mail', body: email}).then(res => {
      if (res.status === 200) {
        return res.body;
      }

      throw res.info;
    });
  }

  remove(project) {
    let url = `${baseUrl}${project.get('id')}`;
    return this.delete(url).then(res => {
      if (res.info.ok) {
        return project;
      }

      throw res.info;
    });
  }
}

export default ProjectApi;
