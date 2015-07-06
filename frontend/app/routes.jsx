import Router from 'react-router';
import React from 'react';

let DefaultRoute = Router.DefaultRoute;
let Route = Router.Route;
let NotFoundRoute = Router.NotFoundRoute;

import Wrapper from './Wrapper.jsx';
import Main from './pages/Main.jsx';
import NotFound from './pages/NotFound.jsx';

export default (
  <Route handler={Wrapper} path="/">
    <DefaultRoute handler={Main} name="main"/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);
