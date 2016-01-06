import React from 'react'
import Router from './../../Router.jsx'
import DevTools from './../Devtools.jsx'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router />
        <DevTools />
      </div>
    )
  }
}
