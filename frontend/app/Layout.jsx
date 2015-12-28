import React from 'react';
import { connect } from 'react-redux'
import Router from 'react-router';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';

export default class Layout extends React.Component {

  render() {
    console.log('FLUX > rendering > layout');
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>

    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.object.isRequired
};
