import * as C from './../constants/ProjectConstants'

const initialState = {
  projects: [],
  images: [],
  privates: [],
  category: 'Eksteriør'
}

export default function general(state = initialState, action) {
  switch (action.type) {
    case C.RECEIVE_PROJECTS:
      return {...state, projects: action.projects}

    case C.RECEIVE_IMAGES:
      return {...state, images: action.images}

    case C.RECEIVE_PRIVATES:
      return {...state, privates: action.privates}

    case C.ADD_PROJECT:
      return {...state, projects: state.projects.concat(action.projects)}

    case C.UPDATE_PROJECT:
      return {...state, projects: state.projects.concat(action.projects)}

    case C.SELECT_CATEGORY:
      return {...state, category: action.category}

    default:
      return state
  }
}
