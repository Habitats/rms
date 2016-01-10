import * as C from '../constants/GeneralConstants'
import * as GeneralApi from '../api/GeneralApi'

export function save(data) {
  return dispatch => {
    return GeneralApi.    save(data, () => {
      dispatch({type: C.ADD_PROJECT})
    })
  }
}

export function fetchProjects() {
  return dispatch => {
    dispatch({type: C.REQUEST_PROJECTS})
    return GeneralApi.getProjects().then(
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
      return GeneralApi.getProject(id).then(
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
    return GeneralApi.getImages().then(
      images => dispatch({type: C.RECEIVE_IMAGES, images}),
      error => dispatch({type: C.RECEIVE_IMAGES_FAIL})
    )
  }
}

export function fetchPrivates() {
  return dispatch => {
    dispatch({type: C.REQUEST_PRIVATES})
    return GeneralApi.getPrivates().then(
      privates => dispatch({type: C.RECEIVE_PRIVATES, privates}),
      error => dispatch({type: C.RECEIVE_PRIVATES_FAIL})
    )
  }
}


export function sendMail(email) {
  return dispatch => {
    return GeneralApi.sendMail(email, () => {
      dispatch({type: C.SEND_EMAIL})
    })
  }
}


