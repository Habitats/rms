import 'babel-core/polyfill';

import './index.html';
import './scss/base.scss';

import React from 'react';
import Marty from 'marty';

Marty.HttpStateSource.removeHook('parseJSON');
let ApplicationContainer = Marty.ApplicationContainer;

import SessionStore from './stores/SessionStore.js';
import Queries from './queries/Queries.js';
import AppActions from './actions/AppActions.js';
import Api from './api/Api.js';
import router from './router';

if (module.hot) {
  module.hot.accept();
}

class Application extends Marty.Application {
  constructor(options) {
    super(options);
    this.register(SessionStore);
    this.register(Queries);
    this.register(Api);
    this.register(AppActions);
    this.router = router;
  }
}

var app = new Application();

app.router.run(function (Handler) {

  React.render((
      <ApplicationContainer app={app}>
        <Handler/>
      </ApplicationContainer>)
    , document.body);
});

