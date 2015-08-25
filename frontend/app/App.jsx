import 'babel-core/polyfill';
import './index.html';
import './scss/base.scss';
import ProjectActionCreators from './actions/ProjectActionCreators.js';
import ProjectStore from './stores/ProjectStore.js';
import ProjectQueries from './queries/ProjectQueries.js';
import ProjectApi from './api/ProjectApi.js';

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
      projectActionCreators: ProjectActionCreators,
      projectQueries: ProjectQueries,
      projectApi: ProjectApi
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
