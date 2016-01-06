import React from 'react'
import {Router, Route, IndexRoute, Link} from 'react-router'
import {pushPath} from 'redux-simple-router'
import { connect } from 'react-redux'

import history from './history'
import Layout from './containers/Layout.jsx'
import NotFound from './containers/NotFound.jsx'
import Welcome from './containers/Welcome.jsx'
import Contact from './containers/Contact.jsx'
import About from './containers/About.jsx'
import References from './containers/References.jsx'
import ProjectWrapper from './containers/ProjectWrapper.jsx'
import Private from './containers/Private.jsx'
import Products from './components/product/Products.jsx'
import Category from './components/product/Category.jsx'
import ProjectAdd from './components/projects/ProjectAdd.jsx'
import Login from './containers/Login.jsx'
import ProjectListItem from './components/projects/ProjectListItem.jsx'
import ReferencesList from './components/text/ReferencesList.jsx'

export default class App extends React.Component {

  requireLogin() {
    if (!this.props.session.admin) {
      this.props.dispatch(pushPath('login'))
    }
  }

  render() {
    return (
      <Router history={history}>
        <Route component={Layout} path="/">
          <IndexRoute component={Welcome}/>
          <Route component={Contact} path="kontakt"/>
          <Route component={About} path="om"/>
          <Route component={Products} path="produkter">
            <Route component={Category} path=":category"/>
          </Route>
          <Route component={References} path="prosjekt"/>
          <Route component={ProjectWrapper} ignoreScrollBehavior={true} path="prosjekt/:id/:selected"/>
          <Route component={ProjectAdd} onEnter={this.requireLogin.bind(this)} path="prosjekt/ny"/>
          <Route component={Private} path="privat"/>
          <Route component={ReferencesList} path="referanseliste"/>
          <Route component={Login} path="login"/>
          <Route component={NotFound} path="*"/>
        </Route>
      </Router>
    )
  }
}

export default connect(state => ({
  session: state.session
}))(App)

