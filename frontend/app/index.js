import 'babel-polyfill'
import 'whatwg-fetch'
import './index.html'
import './scss/base.scss'

import React, {Component, PropTypes} from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route} from 'react-router'

import configureStore from './redux/store/configureStore'
import App from './containers/root/Root'


const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
