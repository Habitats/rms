import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "../reducers/rootReducer";
import thunkMiddleware from "redux-thunk";
import history from "../../history";
import {syncHistory} from "redux-simple-router";

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(history)
const finalCreateStore = compose(
  // Middleware you want to use in production:
  applyMiddleware(thunkMiddleware, reduxRouterMiddleware)
  // Other store enhancers if you use any
)(createStore)

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState)
}