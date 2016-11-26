import * as C from '../constants/GeneralConstants'
import * as GeneralApi from '../api/GeneralApi'

export function save(data) {
  return dispatch => {
    dispatch({type: C.SAVE_PROJECTS_INIT})
    return GeneralApi.saveProject(data).then(
      project => dispatch({type: C.SAVE_PROJECTS_SUCCESS, project}),
      error => dispatch({type: C.SAVE_PROJECTS_FAIL})
    )
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
    const project = getState().general.projects.find(p => p.id === id)
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

export function removeProject(id) {
  return (dispatch) => {
    dispatch({type: C.DELETE_PROJECT})
    return GeneralApi.removeProject(id).then(
      projects => dispatch({type: C.DELETE_PROJECT_SUCCESS, projects}),
      error => dispatch({type: C.DELETE_PROJECT_FAIL})
    )
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

export function sendMail(email) {
  return dispatch => {
    return GeneralApi.sendMail(email, () => {
      dispatch({type: C.SEND_EMAIL})
    })
  }
}

export function invalidateImageCache() {
  return dispatch => {
    dispatch({type: C.CACHE_INVALIDATE})
    GeneralApi.invalidateImageCache().then(
      res => dispatch({type: C.CACHE_INVALIDATED}),
      error => dispatch({type: C.CACHE_INVALIDATE_FAIL})
    )
  }
}
