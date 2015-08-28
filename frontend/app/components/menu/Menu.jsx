import React from 'react';

export default class Menu extends React.Component {

  render() {
    return (
      <div style={{borderRight : 0.5}}>
        {this.props.children}
      </div>
    )
  }
}
Menu.defaultProps = {};

Menu.propTypes = {};





