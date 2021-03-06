import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import history from '../../history'
import Layout from '../../containers/Layout.jsx'
import NotFound from '../../containers/NotFound.jsx'
import Welcome from '../../containers/Welcome.jsx'
import Contact from '../../containers/Contact.jsx'
import About from '../../containers/About.jsx'
import References from '../../containers/ProjectsContainer.jsx'
import Admin from '../../containers/AdminContainer.jsx'
import ProjectContainer from '../../containers/ProjectContainer.jsx'
import ProductsContainer from '../../containers/ProductsContainer.jsx'
import ProductContainer from '../../containers/ProductContainer.jsx'
import CategoryContainer from '../../containers/CategoryContainer.jsx'
import ProjectAdd from '../../containers/ProjectAdd.jsx'
import ProductAdd from '../../components/product/ProductAdd.jsx'
import Login from '../../containers/Login.jsx'

function requireLogin() {
  // if (!this.props.session.admin) {
  //  this.props.dispatch(browserHistory.push('login'))
  // }
}

export default () => {
  return (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <Route component={Layout} path="/">
        <IndexRoute component={Welcome}/>
        <Route component={References} path="referanser"/>
        <Route component={ProjectAdd} onEnter={requireLogin.bind(this)} path="referanser/ny"/>
        <Route component={ProjectAdd} onEnter={requireLogin.bind(this)} path="referanser/endre/:id"/>
        <Route component={Admin} path="admin"/>
        <Route component={ProjectContainer} path="referanser/:id"/>
        <Route component={ProductAdd} path="produkter/ny"/>
        <Route component={ProductAdd} path="produkter/endre/:productId"/>
        <Route component={ProductsContainer} path="produkter">
          <Route component={CategoryContainer} path=":categoryId"/>
          <Route component={ProductContainer} path=":categoryId/:productId"/>
          <Route component={ProductContainer} path=":categoryId/:productId/:subId"/>
          <Route component={ProductContainer} path=":categoryId/:productId/:subId/:subSubId"/>
        </Route>
        <Route component={About} path="om"/>
        <Route component={Contact} path="kontakt"/>
        <Route component={Login} path="login"/>
        <Route component={NotFound} path="*"/>
      </Route>
    </Router>
  )
}
