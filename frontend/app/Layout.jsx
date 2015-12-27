import React from 'react';
import Marty from 'marty';
import Router from 'react-router';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';

class Layout extends React.Component {

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

export default Marty.createContainer(Layout, {
  listenTo: 'projectStore',
  fetch: {}
});

Layout.propTypes = {
  children: React.PropTypes.object.isRequired
};
