import React from 'react';
import Router from 'react-router';
import ListLink from './ListLink.jsx';

let Link = Router.Link;

export default class Header extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {expanded: false};
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="http://www.google.com">
              <i className="fa fa-sun-o fa-1x"></i>    Romerike Markiseservice AS
            </a>
          </div>
        </div>
      </nav>

    );
  }
}

