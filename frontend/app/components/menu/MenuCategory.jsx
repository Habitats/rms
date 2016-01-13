import React, {Component, PropTypes} from 'react'
import Link from './../Link.jsx'
import MenuItem from './MenuItem.jsx'

export default class MenuCategory extends Component {

  constructor(props) {
    super(props)
    this.state = {hover: false}
  }

  toggleHover(hover) {
    this.setState({hover: hover})
  }

  render() {
    let {category: {name, short, sub}, linkTo, active} = this.props
    let {hover} = this.state

    let a = short === active.category && !active.product
    let color = hover ? '#224E6D' : a ? 'black' : '#48494B'
    let markerStyle = {color: color, opacity: a ? 1 : 0, fontSize: 7, height: 8, verticalAlign: 'middle'}
    let itemStyle = {color: color, marginBottom: 35}

    let menuItems = sub.map(p => <MenuItem product={p} active={active.category === short ? active : {...active, product: ''}}
                                           key={`${short} ${p.short}`}
                                           linkTo={`${linkTo}/${p.short}`}/>)

    return (
      <div style={itemStyle}>
        <Link to={linkTo}>
          <div onMouseEnter={this.toggleHover.bind(this, true)} onMouseLeave={this.toggleHover.bind(this, false)}>
            <h3 style={{fontWeight: 600, color: color}}><i className="fa fa-circle" style={markerStyle}/>{name}</h3>
          </div>
        </Link>
        {menuItems}
      </div>
    )
  }
}

MenuCategory.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    short: PropTypes.string.isRequired,
    sub: PropTypes.array.isRequired
  }),
  active: PropTypes.shape({
    category: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired
  }).isRequired,
  linkTo: PropTypes.string.isRequired
}

