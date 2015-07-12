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
import ReferenceItem from './pages/ReferenceItem.jsx';
import ProjectListItem from './components/ProjectListItem.jsx';
import ReferencesList from './components/text/ReferencesList.jsx';

// declare our routes and their hierarchy
let routes = (
  <Route handler={Layout} path="/">
    <DefaultRoute handler={Welcome} name="welcome"/>
    <Route handler={Contact} name="contact" path="kontakt"/>
    <Route handler={About} name="about" path="om"/>
    <Route handler={References} name="references" path="referanser/">
      <Route handler={ProjectListItem} name="project" path="prosjekt/:id"/>
    </Route>
    <Route handler={ReferenceItem} title="Beste prosjetet" description="fint prosjekt" name="referenceItem" path="prosjekt/:id/:index"/>
    <Route handler={ReferencesList} name="referencesList" path="referanseliste/"/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

export default routes;
