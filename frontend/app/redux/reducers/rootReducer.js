import {combineReducers} from 'redux'
import general from './general'
import session from './session'
import products from './products'

// Create a plain object for reducers
const reducers = {
  general,
  products,
  session
  // Removed routing: routerReducer as it's no longer needed
}

// Use combineReducers with the plain object
const rootReducer = combineReducers(reducers)

export default rootReducer