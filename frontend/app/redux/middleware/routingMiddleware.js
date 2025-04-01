import { UPDATE_PATH, LOCATION_CHANGE } from '../constants/RouterConstants'

let navigator = null

export const initializeNavigator = (navigate) => {
  navigator = navigate
}

export const routingMiddleware = () => next => action => {
  // Handle old react-router-redux actions
  if (action.type === LOCATION_CHANGE || action.type === UPDATE_PATH) {
    if (navigator) {
      const path = action.payload?.path || action.payload
      navigator(path)
    }
    return next(action)
  }
  
  // Handle direct history calls
  if (action.type === '@@router/CALL_HISTORY_METHOD') {
    if (navigator) {
      const { method, args } = action.payload
      if (method === 'push' || method === 'replace') {
        navigator(args[0], { replace: method === 'replace' })
      }
    }
    return next(action)
  }

  return next(action)
} 