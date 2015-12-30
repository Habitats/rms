import React from 'react';
import { connect } from 'react-redux'
import Router from 'react-router';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import * as sessionActionCreators from './actions/SessionActionCreators'

export default class Layout extends React.Component {

  componentDidMoun() {
    this.props.dispatch(sessionActionCreators.session())
  }

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

export default connect(state => ({
  session: state.session
}))(Layout)
