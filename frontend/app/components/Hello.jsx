import React from 'react';
import Marty from 'marty';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Main from '../pages/Main.jsx';

class Hello extends React.Component {
  onClick(e) {
    console.log('clicked');
    e.preventDefault();
    this.app.helloActionCreators.hello(new Date().getMilliseconds());
  }

  render() {
    console.log('FLUX > rendering > hello');
    return (
      <div>
        <Header />

        <div className="container">
          <Main />

          <div className="row">
            <div className="col-lg-12 box">
              <button className="btn btn-primary vertical-center" onClick={this.onClick.bind(this)} type="submit"
                      value="Hello">{this.props.hello}</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>

    );
  }
}

export default Marty.createContainer(Hello, {
  listenTo: 'helloStore',
  fetch: {
    hello() {
      return this.app.helloStore.getHelloWorld();
    }
  }
});
