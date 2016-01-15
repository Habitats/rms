import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Router from 'react-router'
import Footer from './../components/Footer.jsx'
import Header from './../components/Header.jsx'
import * as sessionActionCreators from './../redux/actions/sessionActions'

export default class Layout extends Component {

  render() {
    return (
      <div style={{backgroundImage: '/image/bg.png'}}>
        <Header />
        <div className="container" style={{maxWidth:1000, marginBottom: 250}}>
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
