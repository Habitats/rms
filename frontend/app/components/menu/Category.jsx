import React from 'react';
import Router from 'react-router';
let Link = Router.Link;

export default class Category extends React.Component {

  render() {
    return (
      <div style={{marginBottom:30}}>
        <Link to={this.props.linkTo}><h4>{this.props.title}</h4></Link>
        {this.props.children}
      </div>
    );
  }
}

Category.defaultProps = {
  linkTo: 'welcome'
};

Category.propTypes = {
  linkTo: React.PropTypes.string,
  title: React.PropTypes.string.isRequired
};





