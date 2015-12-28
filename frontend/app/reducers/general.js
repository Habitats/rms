import * as ProjectConstants from './../constants/ProjectConstants'

const initialState = {
  projects: [],
  images: [],
  privates: [],
  category: 'Eksteriør'
}

export default function general(state = initialState, action) {
  switch (action.type) {
    case ProjectConstants.RECEIVE_PROJECTS:
      return {...state, projects: action.projects};

    case ProjectConstants.RECEIVE_IMAGES:
      return {...state, images: action.images};

    case ProjectConstants.RECEIVE_PRIVATES:
      return {...state, privates: action.privates};

    case ProjectConstants.ADD_PROJECT:
      return {...state, projects: state.projects.concat(action.projects)};

    case ProjectConstants.UPDATE_PROJECT:
      return {...state, projects: state.projects.concat(action.projects)};

    case ProjectConstants.SELECT_CATEGORY:
      return {...state, category: action.category};

    default:
      return state;
  }
}

