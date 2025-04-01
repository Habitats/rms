import { useNavigate } from 'react-router-dom'

let navigator = null

export const initializeNavigator = (navigate) => {
  navigator = navigate
}

export const routingMiddleware = () => next => action => {
  // Handle navigation actions
  if (action.type === '@@router/NAVIGATE') {
    if (navigator) {
      const { path, replace } = action.payload
      navigator(path, { replace })
    }
    return next(action)
  }

  return next(action)
} 