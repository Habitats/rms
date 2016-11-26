import React from 'react'
import ReactDOM from 'react-dom'
import './scss/base.scss'
import {configureStore} from './redux/store/configureStore'
import {Root} from './containers/Root'

/**
 * Import the stylesheet you want used! Here we just reference
 * the main SCSS file we have in the styles directory.
 */

/**
 * Both configureStore and Root are required conditionally.
 * See configureStore.js and Root.js for more details.
 */

const store = configureStore()

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
)
