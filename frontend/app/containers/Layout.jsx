import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Router from 'react-router'
import Footer from './../components/Footer.jsx'
import Header from './../components/Header.jsx'
import * as sessionActionCreators from './../redux/actions/sessionActions'
import Radium from 'radium'
import * as V from '../vars'

class Layout extends Component {

  render() {
    let style = {
      maxWidth: 1000,
      '@media only screen and (max-width: 767px)': {
        marginTop: V.HEADER_HEIGHT_XS + 20,
        marginBottom: V.FOOTER_HEIGHT_XS + 10
      },
      '@media only screen and (min-width: 768px)': {
        marginTop: V.HEADER_HEIGHT_SM + 20,
        marginBottom: V.FOOTER_HEIGHT_SM + 10
      }
    }
    return (
      <div>
        <Header />
        <div style={style} className="container" id="root">
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired
}

export default Radium(Layout)
