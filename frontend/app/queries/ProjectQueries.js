import Marty from 'marty';
import ProjectConstants from '../constants/ProjectConstants';

class ProjectQueries extends Marty.Queries {

  getProjects() {
    return this.app.projectApi.getProjects()
      .then(projects => {
        this.dispatch(ProjectConstants.RECEIVE_PROJECTS, projects);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default ProjectQueries;
