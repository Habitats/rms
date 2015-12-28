import * as ProjectConstants from '../constants/ProjectConstants'
import * as ProjectApi from '../api/ProjectApi'
import Promise from 'bluebird'

export function save(data) {
  return (dispatch) => {
    return ProjectApi.    save(data, () => {
      dispatch({type: ProjectConstants.ADD_PROJECT})
    })
  }
}

export function fetchProjects() {
  return (dispatch) => {
    return ProjectApi.getProjects().then(
      projects => dispatch({type: ProjectConstants.RECEIVE_PROJECTS, projects}),
      error => dispatch({type: ProjectConstants.RECEIVE_PROJECTS_FAIL})
    )
  }
}

export function fetchImages() {
  return (dispatch) => {
    return ProjectApi.getImages().then(
      images => dispatch({type: ProjectConstants.RECEIVE_IMAGES, images}),
      error => dispatch({type: ProjectConstants.RECEIVE_IMAGES_FAIL})
    )
  }
}

export function fetchPrivates() {
  return (dispatch) => {
    return ProjectApi.getPrivates().then(
      privates => dispatch({type: ProjectConstants.RECEIVE_PRIVATES, privates}),
      error => dispatch({type: ProjectConstants.RECEIVE_PRIVATES_FAIL})
    )
  }
}

export function sendMail(email) {
  return (dispatch) => {
    return ProjectApi.sendMail(email, () => {
      dispatch({type: ProjectConstants.SEND_EMAIL})
    })
  }
}

export function selectCategory(category) {
  return {type: ProjectConstants.SELECT_CATEGORY, category: category}
}
