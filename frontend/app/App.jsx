import 'babel-core/polyfill';
import './index.html';
import './scss/base.scss';
import ProjectActionCreators from './ProjectActionCreators.js';
import ProjectStore from './ProjectStore.js';

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
      projectStore: ProjectStore,
      projectActionCreators: ProjectActionCreators
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




