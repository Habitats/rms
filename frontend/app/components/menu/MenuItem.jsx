import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

export default class MenuItem extends Component {

  render() {
    let {product: {name}, linkTo} = this.props
    return (
      <div>
        <Link to={linkTo}><h5 style={{color: '#3e3e3e', marginLeft: 35}}>{name}</h5></Link>
      </div>
    )
  }
}

MenuItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  linkTo: PropTypes.string.isRequired
}





