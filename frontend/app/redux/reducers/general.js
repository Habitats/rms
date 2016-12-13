import * as C from '../constants/GeneralConstants'

const initialState = {
  projects: [],
  images: [],
  project: {fetching: true},
  privates: [],
  category: 'Eksteriør'
}

export default function general(state = initialState, action) {
  switch (action.type) {
    case C.FETCH_PROJECTS_SUCCESS:
      return {...state, projects: action.projects}

    case C.DELETE_PROJECT_SUCCESS:
      return {...state, projects: action.projects}

    case C.FETCH_PROJECT_REQUEST:
      return {...state, project: {... action.project, fetching: true}}
    case C.FETCH_PROJECT_SUCCESS:
      return {...state, project: {... action.project, fetching: false}}
    case C.FETCH_PROJECT_FAIL:
      return {...state, project: null, fetching: false}

    case C.FETCH_IMAGES_SUCCESS:
      return {...state, images: action.images}

    case C.FETCH_PRIVATES_SUCCESS:
      return {...state, privates: action.privates}

    case C.SAVE_PROJECTS_SUCCESS:
      return {...state, projects: state.projects.concat(action.project)}

    default:
      return state
  }
}

