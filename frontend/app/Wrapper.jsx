import React from 'react';
import Marty from 'marty';
import Router from 'react-router';
let RouteHandler = Router.RouteHandler;

import Footer from './components/footer/Footer.jsx';
import Header from './components/header/Header.jsx';

class Wrapper extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <section className="container-fluid">
          <RouteHandler/>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Marty.createContainer(Wrapper, {});
