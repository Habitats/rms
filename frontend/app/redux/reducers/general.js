import * as C from './../constants/GeneralConstants'

const initialState = {
  projects: [],
  images: [],
  project: {fetching: true},
  privates: [],
  category: 'Eksteriør'
}

export default function general(state = initialState, action) {
  switch (action.type) {
    case C.RECEIVE_PROJECTS:
      return {...state, projects: action.projects}

    case C.REQUEST_PROJECT:
      return {...state, project: {... action.project, fetching: true}}
    case C.RECEIVE_PROJECT:
      return {...state, project: {... action.project, fetching: false}}

    case C.RECEIVE_IMAGES:
      return {...state, images: action.images}

    case C.RECEIVE_PRIVATES:
      return {...state, privates: action.privates}

    case C.SAVE_PROJECTS_SUCCESS:
      return {...state, projects: state.projects.concat(action.project)}

    default:
      return state
  }
}

