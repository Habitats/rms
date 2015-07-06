import React from 'react';
import Router from 'react-router';
let Link = Router.Link;

export default class ListLink extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    let className = this.context.router.isActive(this.props.to) ? this.props.activeClassName : '';
    return (
      <li className={className}>
        <Link {...this.props}/>
      </li>
    );
  }
}

ListLink.contextTypes = {
  router: React.PropTypes.func
};
ListLink.propTypes = {
  to: React.PropTypes.string.isRequired,
  activeClassName: React.PropTypes.string.isRequired
};
