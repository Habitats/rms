import React, {Component, PropTypes} from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {connect} from 'react-redux'
import * as SessionActionCreators from './redux/actions/sessionActions'
import Routes from 'redux/routes'

class App extends Component {

  constructor(props) {
    super(props)
    this.props.dispatch(SessionActionCreators.session())
  }

  requireLogin() {
    //if (!this.props.session.admin) {
    //  this.props.dispatch(browserHistory.push('login'))
    //}
  }

  render() {
    return (
      <Routes />
    )
  }
}

App.propTypes = {
  session: PropTypes.shape({
    admin: PropTypes.bool.isRequired,
    username: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired
}

export default connect(state => ({
  session: state.session
}))(App)

