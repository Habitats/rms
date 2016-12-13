import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from '../reducers/rootReducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const finalCreateStore = composeEnhancers(
  applyMiddleware(thunk)
)(createStore)

module.exports = function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () =>
      store.replaceReducer(require('../reducers/rootReducer'))
    )
  }

  return store
}
