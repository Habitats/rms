import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';
import * as generalActionCreators from './../../actions/GeneralActionCreators'

export default class Category extends React.Component {

  onClick() {
    this.props.dispatch(generalActionCreators.selectCategory(this.props.title));
  }

  render() {
    let selected = this.props.category === this.props.title ? <i className="fa fa-genderless" style={{color: 'darkRed'}}/> : <span
      className="fa-empty"/>;

    return (
      <div style={{marginBottom: 30}}>
        <Link to={this.props.linkTo} onClick={this.onClick.bind(this)}><h4>{selected}{this.props.title}</h4></Link>
        {this.props.children}
      </div>
    );
  }
}

Category.defaultProps = {
  linkTo: 'welcome'
};

Category.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  linkTo: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.object.isRequired,
  category: React.PropTypes.string.isRequired
};

export default connect(state => ({
  category: state.general.category
}))(Category)
