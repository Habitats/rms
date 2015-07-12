import React from 'react';
import Marty from 'marty';
import Router from 'react-router';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
let RouteHandler = Router.RouteHandler;

class Layout extends React.Component {

  render() {
    console.log('FLUX > rendering > layout');
    return (
      <div>
        <Header />
        <RouteHandler/>
        <Footer />
      </div>

    );
  }
}

export default Marty.createContainer(Layout, {
  listenTo: 'helloStore',
  fetch: {
    hello() {
      return this.app.helloStore.getHelloWorld();
    }
  }
});
