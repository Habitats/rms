import React from 'react'
import {Link} from 'react-router'

export default class MenuItem extends React.Component {

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
  product: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired
  }),
  linkTo: React.PropTypes.string.isRequires
}





