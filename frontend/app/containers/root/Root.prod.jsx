import React, {Component, PropTypes} from 'react'
import Routes from '../../redux/routes'
import {Provider} from 'react-redux'
import {StyleRoot} from 'radium'

export default class Root extends Component {
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
