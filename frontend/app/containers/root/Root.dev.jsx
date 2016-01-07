import React from 'react'
import Router from './../../App.jsx'
import DevTools from './../Devtools.jsx'

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Router />
        <DevTools />
      </div>
    )
  }
}
