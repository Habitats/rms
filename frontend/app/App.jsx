import 'babel-core/polyfill';
import './index.html';
import './scss/base.scss';
import HelloActionCreators from './HelloActionCreators.js';
import HelloStore from './HelloStore.js';

import React from 'react';
import Marty from 'marty';
import router from './router';

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
    this.router = router;
  }
}
let ApplicationContainer = Marty.ApplicationContainer;
let app = new Application();

app.router.run(Handler => {
  React.render((
      <ApplicationContainer app={app}>
        <Handler/>
      </ApplicationContainer>)
    , document.body);
});




