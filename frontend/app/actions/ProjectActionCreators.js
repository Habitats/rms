import Marty from 'marty';
import ProjectConstants from './../constants/ProjectConstants.js';

class ProjectActionCreators extends Marty.ActionCreators {

  Project(msg) {
    console.log('FLUX > action > Project world');
    this.dispatch(ProjectConstants.UPDATED_PROJECT, msg);
  }

  save(data) {
    this.app.projectApi.save(data).then(project => {
      console.log('INFO: Save project success');
      this.dispatch(ProjectConstants.ADD_PROJECT, project);
    }, error => {
      console.log('WARN: Save project fail');
      this.dispatch(ProjectConstants.ADD_PROJECT_FAILED, error);
    });
  }

  sendMail(email){
    this.app.projectApi.sendMail(email).then(res => {
      this.dispatch(ProjectConstants.SEND_EMAIL, res);
    }, error => {
      this.dispatch(ProjectConstants.SEND_EMAIL_FAILED, error);
    });
  }

  selectCategory(category){
    this.dispatch(ProjectConstants.SELECT_CATEGORY, category);
  }
}

export default ProjectActionCreators;
