import Router from 'react-router';
import React from 'react';

let DefaultRoute = Router.DefaultRoute;
let Route = Router.Route;
let NotFoundRoute = Router.NotFoundRoute;

import Main from './pages/Main.jsx';
import NotFound from './pages/NotFound.jsx';
import Hello from './components/Hello.jsx';

export default (
  <Route handler={Hello} path="/">
    <DefaultRoute handler={Main} name="main"/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);
