import 'babel-polyfill';
import './index.html';
import './scss/base.scss';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Link} from 'react-router';
import Marty from 'marty';
import history from './history';

import ProjectActionCreators from './actions/ProjectActionCreators.js';
import ProjectStore from './stores/ProjectStore.js';
import ProjectQueries from './queries/ProjectQueries.js';
import ProjectApi from './api/ProjectApi.js';
import SessionActionCreators from './actions/SessionActionCreators.js';
import SessionStore from './stores/SessionStore.js';
import SessionQueries from './queries/SessionQueries.js';
import SessionApi from './api/SessionApi.js';
import Layout from './Layout.jsx';
import NotFound from './pages/NotFound.jsx';
import Welcome from './pages/Welcome.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import References from './pages/References.jsx';
import Project from './pages/Project.jsx';
import Private from './pages/Private.jsx';
import Products from './pages/Products.jsx';
import Interior from './components/product/Interior.jsx';
import Exterior from './components/product/Exterior.jsx';
import Services from './components/product/Services.jsx';
import Other from './components/product/Other.jsx';
import ProjectAdd from './pages/ProjectAdd.jsx';
import Login from './pages/Login.jsx';
import ProjectListItem from './components/projects/ProjectListItem.jsx';
import ReferencesList from './components/text/ReferencesList.jsx';

if (module.hot) {
  module.hot.accept();
}

let router = (
  <Router history={history}>
    <Route component={Layout} path="/">
      <IndexRoute component={Welcome}/>
      <Route component={Contact} path="kontakt"/>
      <Route component={About} path="om"/>
      <Route component={Products} path="produkter">
        <Route component={Exterior} path="eksterior"/>
        <Route component={Interior} path="interior"/>
        <Route component={Services} path="tjenester"/>
        <Route component={Other} path="diverse"/>
      </Route>
      <Route component={References} path="prosjekt"/>
      <Route component={Project} ignoreScrollBehavior={true} path="prosjekt/:id/:selected"/>
      <Route component={ProjectAdd} path="prosjekt/ny"/>
      <Route component={Private} path="privat"/>
      <Route component={ReferencesList} path="referanseliste"/>
      <Route component={Login} path="login"/>
      <Route component={NotFound} path="*"/>
    </Route>
  </Router>
)

class Application extends Marty.Application {
  constructor(options) {
    super(options);
    this.register({
      projectStore: ProjectStore,
      projectActionCreators: ProjectActionCreators,
      projectQueries: ProjectQueries,
      projectApi: ProjectApi,
      sessionStore: SessionStore,
      sessionActionCreators: SessionActionCreators,
      sessionQueries: SessionQueries,
      sessionApi: SessionApi
    });
    this.router = router;
  }
}
let ApplicationContainer = Marty.ApplicationContainer;
let app = new Application();

render(
  <ApplicationContainer app={app}>
    {router}
  </ApplicationContainer>
  , document.body
);
