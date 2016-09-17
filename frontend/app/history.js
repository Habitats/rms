import {createStore, combineReducers} from 'redux'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import reducers from './redux/reducers/rootReducer.js'
// useRouterHistory creates a composable higher-order function
// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)
const history = syncHistoryWithStore(browserHistory, store)
export default history
