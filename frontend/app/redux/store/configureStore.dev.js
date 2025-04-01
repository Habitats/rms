import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {routingMiddleware} from '../middleware/routingMiddleware'
import rootReducer from '../reducers/rootReducer'
import {syncHistoryWithStore} from 'react-router-redux'
import history from '../../history'

export function configureStore(initialState) {
  const middleware = [thunk, routingMiddleware]
  
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  )

  // Sync history with store
  const syncedHistory = syncHistoryWithStore(history, store)

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
      const nextRootReducer = require('../reducers/rootReducer').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
