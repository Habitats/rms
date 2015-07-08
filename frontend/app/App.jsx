import 'babel-core/polyfill';
import './index.html';
import './scss/base.scss';
import HelloActionCreators from './HelloActionCreators.js';
import Hello from './components/Hello.jsx';
import HelloStore from './HelloStore.js';

import React from 'react';
import Marty from 'marty';

if (module.hot) {
  module.hot.accept();
}

class Application extends Marty.Application {
  constructor(options) {
    super(options);
    this.register({
      helloStore: HelloStore,
      helloActionCreators: HelloActionCreators
    });
  }
}

var app = new Application();
var {ApplicationContainer} = require('marty');
React.render((
  <ApplicationContainer app={app}>
    <Hello />
  </ApplicationContainer>
), document.body);




