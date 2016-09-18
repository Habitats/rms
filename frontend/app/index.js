import 'babel-polyfill'
import 'whatwg-fetch'
import './index.html'
import './scss/base.scss'
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import configureStore from './redux/store/configureStore'
import Root from './containers/root/Root'

const store = configureStore()

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
)
