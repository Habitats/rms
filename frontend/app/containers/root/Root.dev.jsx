import React, {Component, PropTypes} from 'react'
import Router from './../../App.jsx'
import DevTools from './../Devtools.jsx'

export default class Root extends Component {
//<DevTools />
  render() {
    return (
      <div>
        <Router />
      </div>
    )
  }
}
