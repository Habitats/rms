import React, {Component, PropTypes} from 'react'
import Link from './../Link.jsx'

export default class MenuItem extends Component {

  constructor(props) {
    super(props)
    this.state = {hover: false}
  }

  toggleHover(hover) {
    this.setState({hover: hover})
  }

  render() {
    let {product: {name, short}, linkTo, active} = this.props
    let {hover} = this.state
    let a = short === active.product
    let color = hover ? '#224E6D' : a ? 'black' : '#48494B'
    let markerStyle = {color: color, opacity: a ? 1 : 0, fontSize: 7, height: 8, verticalAlign: 'middle'}
    let itemStyle = {color: color, marginLeft: 10, fontWeight: 300}
    return (
      <div onMouseEnter={this.toggleHover.bind(this, true)} onMouseLeave={this.toggleHover.bind(this, false)}>
        <Link to={linkTo}>
          <h4 style={itemStyle}><i className="fa fa-circle" style={markerStyle}/>{name}</h4>
        </Link>
      </div>
    )
  }
}

MenuItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    short: PropTypes.string.isRequired
  }),
  active: PropTypes.shape({
    category: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired
  }).isRequired,
  linkTo: PropTypes.string.isRequired
}





