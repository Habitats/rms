import * as C from '../constants/ProjectConstants'
import * as ProjectApi from '../api/ProjectApi'
import Promise from 'bluebird'

export function save(data) {
  return dispatch => {
    return ProjectApi.    save(data, () => {
      dispatch({type: C.ADD_PROJECT})
    })
  }
}

export function fetchProjects() {
  return dispatch => {
    dispatch({type: C.REQUEST_PROJECTS})
    return ProjectApi.getProjects().then(
      projects => dispatch({type: C.RECEIVE_PROJECTS, projects}),
      error => dispatch({type: C.RECEIVE_PROJECTS_FAIL})
    )
  }
}

export function fetchProject(id) {
  return (dispatch, getState) => {
    let project = getState().general.projects.find(p => p.id === id)
    if (!project) {
      dispatch({type: C.REQUEST_PROJECT})
      return ProjectApi.getProject(id).then(
        project => dispatch({type: C.RECEIVE_PROJECT, project}),
        error => dispatch({type: C.RECEIVE_PROJECT_FAIL})
      )
    } else {
      return dispatch({type: C.RECEIVE_PROJECT, project})
    }
  }
}

export function fetchImages() {
  return dispatch => {
    dispatch({type: C.REQUEST_IMAGES})
    return ProjectApi.getImages().then(
      images => dispatch({type: C.RECEIVE_IMAGES, images}),
      error => dispatch({type: C.RECEIVE_IMAGES_FAIL})
    )
  }
}

export function fetchPrivates() {
  return dispatch => {
    dispatch({type: C.REQUEST_PRIVATES})
    return ProjectApi.getPrivates().then(
      privates => dispatch({type: C.RECEIVE_PRIVATES, privates}),
      error => dispatch({type: C.RECEIVE_PRIVATES_FAIL})
    )
  }
}

export function sendMail(email) {
  return dispatch => {
    return ProjectApi.sendMail(email, () => {
      dispatch({type: C.SEND_EMAIL})
    })
  }
}


