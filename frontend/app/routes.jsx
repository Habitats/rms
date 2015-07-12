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
import ProjectListItem from './components/ProjectListItem.jsx';
import ProjectItem from './components/ProjectItem.jsx';

// declare our routes and their hierarchy
let routes = (
  <Route handler={Layout} path="/">
    <DefaultRoute handler={Welcome} name="welcome"/>
    <Route handler={Contact} name="contact" path="kontakt"/>
    <Route handler={About} name="about" path="om"/>
    <Route handler={References} name="references" path="referanser/">
      <Route handler={ProjectListItem} name="project" path="prosjekt/:id"/>
    </Route>
    <Route handler={ProjectItem} title="Beste prosjetet" description="fint prosjekt" name="projectItem" path="prosjekt/:id/:index"/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

export default routes;
