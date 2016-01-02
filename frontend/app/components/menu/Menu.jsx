import React from 'react'

export default class Menu extends React.Component {

  render() {
    return (
      <div style={{marginLeft: -21}}>
        {this.props.children}
      </div>
    )
  }
}

Menu.propTypes = {
  children: React.PropTypes.object.isRequired
}