import Marty from 'marty';
import ProjectConstants from './../constants/ProjectConstants.js';

class ProjectActionCreators extends Marty.ActionCreators {

  Project(msg) {
    console.log('FLUX > action > Project world');
    this.dispatch(ProjectConstants.UPDATED_PROJECT, msg);
  }
}

export default ProjectActionCreators;
