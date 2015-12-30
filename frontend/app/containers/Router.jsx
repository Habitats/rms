import React from 'react';
import {Router, Route, IndexRoute, Link} from 'react-router';
import history from '../history';
import { connect } from 'react-redux'

import Layout from '../Layout.jsx';
import NotFound from '../containers/NotFound.jsx';
import Welcome from '../containers/Welcome.jsx';
import Contact from '../containers/Contact.jsx';
import About from '../containers/About.jsx';
import References from '../containers/References.jsx';
import Project from '../containers/Project.jsx';
import Private from '../containers/Private.jsx';
import Products from '../containers/Products.jsx';
import Interior from '../components/product/Interior.jsx';
import Exterior from '../components/product/Exterior.jsx';
import Services from '../components/product/Services.jsx';
import Other from '../components/product/Other.jsx';
import ProjectAdd from '../containers/ProjectAdd.jsx';
import Login from '../containers/Login.jsx';
import ProjectListItem from '../components/projects/ProjectListItem.jsx';
import ReferencesList from '../components/text/ReferencesList.jsx';

export default class App extends React.Component {
  render() {
    return (
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
  }
}

