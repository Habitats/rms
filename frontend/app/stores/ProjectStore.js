import Marty from 'marty';
import ProjectConstants from './../constants/ProjectConstants.js';
import history from './../history'

class ProjectStore extends Marty.Store {
  constructor(props) {
    super(props);
    this.state = {};
    this.handlers = {
      updateProject: ProjectConstants.UPDATE_PROJECT,
      receiveProjects: ProjectConstants.RECEIVE_PROJECTS,
      receiveImages: ProjectConstants.RECEIVE_IMAGES,
      receivePrivate: ProjectConstants.RECEIVE_PRIVATE,
      addProject: ProjectConstants.ADD_PROJECT,
      selectCategory: ProjectConstants.SELECT_CATEGORY
    };
  }

  selectCategory(category) {
    this.setState({category: category});
  }

  updateProject(msg) {
    console.log('FLUX > updating ProjectStore > ' + msg);
  }

  receiveProjects(projects) {
    this.setState({projects: projects});
  }

  receiveImages(images) {
    this.setState({images: images});
  }

  receivePrivate(images) {
    this.setState({private: images});
  }

  addProject(project) {
    this.state.projects[this.state.projects.length] = project;
    history.pushState(null, '/prosjekt');

    this.hasChanged();
  }

  getSelectedCategory() {
    return this.state.category;
  }

  getProjects() {
    return this.fetch({
      id: 'projects',
      locally() {
        if (this.hasAlreadyFetched('projects')) {
          return this.state.projects;
        }
      },
      remotely() {
        return this.app.projectQueries.getProjects();
      }
    });
  }

  getImages() {
    return this.fetch({
      id: 'images',
      locally() {
        if (this.hasAlreadyFetched('images')) {
          return this.state.images;
        }
      },
      remotely() {
        return this.app.projectQueries.getImages();
      }
    });
  }

  getPrivate() {
    return this.fetch({
      id: 'private',
      locally() {
        if (this.hasAlreadyFetched('private')) {
          return this.state.private;
        }
      },
      remotely() {
        return this.app.projectQueries.getPrivate();
      }
    });
  }
}

export default ProjectStore;
