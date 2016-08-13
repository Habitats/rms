import {combineReducers} from "redux";
import {routeReducer} from "redux-simple-router";
import general from "./general";
import session from "./session";
import products from "./products";

const reducers = {
  general,
  products,
  session
}

const rootReducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

export default rootReducer