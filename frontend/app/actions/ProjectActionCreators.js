import Marty from 'marty';
import ProjectConstants from './../constants/ProjectConstants.js';

class ProjectActionCreators extends Marty.ActionCreators {

  Project(msg) {
    console.log('FLUX > action > Project world');
    this.dispatch(ProjectConstants.UPDATED_PROJECT, msg);
  }

  save(data) {
    this.app.projectApi.save(data).then(project => {
      this.dispatch(ProjectConstants.ADD_PROJECT, project);
    }, error => {
      this.dispatch(ProjectConstants.ADD_PROJECT_FAILED, error);
    });
  }
}

export default ProjectActionCreators;
