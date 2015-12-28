import 'babel-polyfill';
import 'whatwg-fetch'
import './index.html';
import './scss/base.scss';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Link} from 'react-router';
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import general from './reducers/general'
import session from './reducers/session'
import Application from './App.jsx'

if (module.hot) {
  module.hot.accept()
}

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
const store = createStoreWithMiddleware(combineReducers({general, session}))

render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root')
)
