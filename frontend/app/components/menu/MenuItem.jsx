import React from 'react';
import Router from 'react-router';
let Link = Router.Link;

export default class MenuItem extends React.Component {

  render() {
    return (
      <div>
        <Link to={this.props.linkTo}><h5 style={{color: '#3e3e3e', marginLeft: 35}}>{this.props.title}</h5></Link>
      </div>
    );
  }
}

MenuItem.defaultProps = {
  linkTo: 'welcome'
};

MenuItem.propTypes = {
  linkTo: React.PropTypes.string,
  title: React.PropTypes.string.isRequired
};





