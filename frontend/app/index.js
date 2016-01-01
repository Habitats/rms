import 'babel-polyfill';
import 'whatwg-fetch'
import './index.html';
import './scss/base.scss';

import React from 'react';
import {render} from 'react-dom';
import history from './history';
import {syncReduxAndRouter} from 'redux-simple-router'
import {Provider} from 'react-redux'

import configureStore from './redux/store/configureStore'
import App from './containers/root/App'

const store = configureStore();
syncReduxAndRouter(history, store)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
