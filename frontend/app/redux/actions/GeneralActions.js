import * as C from '../constants/GeneralConstants'
import * as GeneralApi from '../api/GeneralApi'

export function save(data) {
  return dispatch => {
    dispatch({type: C.SAVE_PROJECTS})
    return GeneralApi.saveProject(data).then(
      project => dispatch({type: C.SAVE_PROJECTS_SUCCESS, project}),
      error => dispatch({type: C.SAVE_PROJECTS_FAIL})
    )
  }
}

export function fetchProjects() {
  return dispatch => {
    dispatch({type: C.FETCH_PROJECTS_REQUEST})
    return GeneralApi.getProjects().then(
      projects => dispatch({type: C.FETCH_PROJECTS_SUCCESS, projects}),
      error => dispatch({type: C.FETCH_PROJECTS_FAIL})
    )
  }
}

export function fetchProject(id) {
  return (dispatch, getState) => {
    const project = getState().general.projects.find(p => p.id === id)
    if (!project) {
      dispatch({type: C.FETCH_PROJECT_REQUEST})
      return GeneralApi.getProject(id).then(
        project => dispatch({type: C.FETCH_PROJECT_SUCCESS, project}),
        error => dispatch({type: C.FETCH_PROJECT_FAIL})
      )
    } else {
      return dispatch({type: C.FETCH_PROJECT_SUCCESS, project})
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
    dispatch({type: C.FETCH_IMAGES})
    return GeneralApi.getImages().then(
      images => dispatch({type: C.FETCH_IMAGES_SUCCESS, images}),
      error => dispatch({type: C.FETCH_IMAGES_FAIL})
    )
  }
}

export function sendMail(email) {
  return dispatch => {
    dispatch({type: C.SEND_EMAIL})
    return GeneralApi.sendMail(email).then(
      _ => dispatch({type: C.SEND_EMAIL_SUCCESS}),
      error => dispatch({type: C.SEND_EMAIL_FAIL})
    )
  }
}

export function invalidateImageCache() {
  return dispatch => {
    dispatch({type: C.INVALIDATE_CACHE})
    GeneralApi.invalidateImageCache().then(
      res => dispatch({type: C.INVALIDATE_CACHE_SUCCESS}),
      error => dispatch({type: C.INVALIDATE_CACHE_FAIL})
    )
  }
}
