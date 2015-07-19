import Router from 'react-router';
import React from 'react';

let DefaultRoute = Router.DefaultRoute;
let Route = Router.Route;
let NotFoundRoute = Router.NotFoundRoute;

import Layout from './Layout.jsx';
import NotFound from './pages/NotFound.jsx';
import Welcome from './pages/Welcome.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import References from './pages/References.jsx';
import Project from './pages/Project.jsx';
import Private from './pages/Private.jsx';
import Products from './pages/Products.jsx';
import ProjectAdd from './pages/ProjectAdd.jsx';
import ProjectListItem from './components/ProjectListItem.jsx';
import ReferencesList from './components/text/ReferencesList.jsx';

// declare our routes and their hierarchy
let routes = (
  <Route handler={Layout} ignoreScrollBehavior={true} path="/">
    <DefaultRoute handler={Welcome} name="welcome"/>
    <Route handler={Contact} name="contact" path="kontakt"/>
    <Route handler={About} name="about" path="om"/>
    <Route handler={References} name="references" path="referanser/">
      <Route handler={ProjectListItem} name="project" path="prosjekt/:id/"/>
    </Route>
    <Route handler={Products} name="products" path="tjenester"/>
    <Route handler={Private} name="private" path="privat"/>
    <Route handler={Project} name="referenceItem" path="ref/:id/:selected"/>
    <Route handler={ProjectAdd} name="project_add" path="ref/add"/>
    <Route handler={ReferencesList} name="referencesList" path="referanseliste/"/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

export default routes;
