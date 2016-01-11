import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Router from 'react-router'
import Footer from './../components/Footer.jsx'
import Header from './../components/Header.jsx'
import * as sessionActionCreators from './../redux/actions/sessionActions'

export default class Layout extends Component {

  componentWillMount() {
    this.props.dispatch(sessionActionCreators.session())
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(state => ({
  session: state.session
}))(Layout)
