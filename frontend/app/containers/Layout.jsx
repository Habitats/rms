import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import Footer from './../components/Footer.jsx'
import Header from './../components/Header.jsx'
import Radium from 'radium'
import { connect } from 'react-redux'
import * as SessionActionCreators from '../redux/actions/SessionActions'
import * as V from '../vars'

@Radium
@connect(state => ({
  session: state.session
}))
class Layout extends Component {
  static propTypes = {
    session: PropTypes.shape({
      admin: PropTypes.bool.isRequired,
      username: PropTypes.string
    }),
    dispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    session: {
      admin: false,
      username: null
    }
  }

  constructor(props) {
    console.log('Layout: constructor called')
    super(props)
  }

  componentDidMount() {
    console.log('Layout: componentDidMount called')
  }

  render() {
    console.log('Layout: render called')
    const { session, dispatch } = this.props
    return (
      <div>
        <Header />
        <main>
          <div className="container">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}

export default Layout