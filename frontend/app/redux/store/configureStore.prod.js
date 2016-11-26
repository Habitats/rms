import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from '../reducers/rootReducer'
import thunk from 'redux-thunk'

const finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore)

module.exports = function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)
  return store
}
