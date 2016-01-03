import React from 'react'
import {Link} from 'react-router'

export default class MenuItem extends React.Component {

  render() {
    let {name, short} = this.props.product
    let {category} = this.props.category
    return (
      <div>
        <Link to={`/produkter/${category}/${short}`}><h5 style={{color: '#3e3e3e', marginLeft: 35}}>{name}</h5></Link>
      </div>
    )
  }
}

MenuItem.propTypes = {
  product: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    short: React.PropTypes.string.isRequired
  }),
  category: React.PropTypes.string.isRequired
}





