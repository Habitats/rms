import Marty from 'marty';
import ProjectConstants from './../constants/ProjectConstants.js';

class ProjectStore extends Marty.Store {
  constructor(props) {
    super(props);
    this.state = {};
    this.handlers = {
      updateProject: ProjectConstants.UPDATE_PROJECT,
      receiveProjects: ProjectConstants.RECEIVE_PROJECTS,
      addProject: ProjectConstants.ADD_PROJECT
    };
  }

  updateProject(msg) {
    console.log('FLUX > updating ProjectStore > ' + msg);
  }

  receiveProjects(projects) {
    this.state = projects;
    this.hasChanged();
  }

  addProject(project) {
    console.log('adding project not implmeneted');
    this.state[this.state.length] = project;
    this.hasChanged();
  }

  getProjects() {
    return this.fetch({
      id: 'projects',
      locally() {
        if (this.hasAlreadyFetched('projects')) {
          return this.state;
        }
      },
      remotely() {
        return this.app.projectQueries.getProjects();
      }
    });
  }
}

export default ProjectStore;
