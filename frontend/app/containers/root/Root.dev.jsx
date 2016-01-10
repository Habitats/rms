import React from 'react'
import Router from './../../App.jsx'
import DevTools from './../Devtools.jsx'

export default class Root extends React.Component {
//<DevTools />
  render() {
    return (
      <div>
        <Router />
      </div>
    )
  }
}
