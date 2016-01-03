import * as C from '../constants/ProjectConstants'
import * as ProjectApi from '../api/ProjectApi'
import Promise from 'bluebird'

export function save(data) {
  return (dispatch) => {
    return ProjectApi.    save(data, () => {
      dispatch({type: C.ADD_PROJECT})
    })
  }
}

export function fetchProjects() {
  return (dispatch) => {
    return ProjectApi.getProjects().then(
      projects => dispatch({type: C.RECEIVE_PROJECTS, projects}),
      error => dispatch({type: C.RECEIVE_PROJECTS_FAIL})
    )
  }
}

export function fetchImages() {
  return (dispatch) => {
    return ProjectApi.getImages().then(
      images => dispatch({type: C.RECEIVE_IMAGES, images}),
      error => dispatch({type: C.RECEIVE_IMAGES_FAIL})
    )
  }
}

export function fetchPrivates() {
  return (dispatch) => {
    return ProjectApi.getPrivates().then(
      privates => dispatch({type: C.RECEIVE_PRIVATES, privates}),
      error => dispatch({type: C.RECEIVE_PRIVATES_FAIL})
    )
  }
}

export function sendMail(email) {
  return (dispatch) => {
    return ProjectApi.sendMail(email, () => {
      dispatch({type: C.SEND_EMAIL})
    })
  }
}


