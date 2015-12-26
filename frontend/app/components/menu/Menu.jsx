import React from 'react';

export default class Menu extends React.Component {

  render() {
    return (
      <div style={{marginLeft: -21}}>
        {this.props.children}
      </div>
    );
  }
}
Menu.defaultProps = {
  children: React.PropTypes.object.isRequired
};

Menu.propTypes = {};





