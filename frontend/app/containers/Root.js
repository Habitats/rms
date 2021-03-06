/**
 * Just like our store, we configure a 'Root' component that is
 * required based on the env variable. This component is typically one
 * surrounded by a <Provider>.
 */
import React, {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import Routes from '../redux/routes'
import {StyleRoot} from 'radium'

let loadedModule = class Root extends Component {
  render() {
    const {store} = this.props
    return (
      /**
       * Provider is a component provided to us by the 'react-redux' bindings that
       * wraps our app - thus making the Redux store/state available to our 'connect()'
       * calls in component hierarchy below.
       */
      <Provider store={store}>
        <StyleRoot>
          <Routes />
        </StyleRoot>
      </Provider>
    )
  }
}

export const Root = loadedModule
