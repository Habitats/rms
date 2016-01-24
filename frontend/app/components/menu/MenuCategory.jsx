import React, {Component, PropTypes} from 'react'
import Link from './../Link.jsx'
import MenuItem from './MenuItem.jsx'

export default class MenuCategory extends Component {

  constructor(props) {
    super(props)
    this.state = {hover: false}
    this.onMouseEnter = () => this.setState({hover: true})
    this.onMouseLeave = () => this.setState({hover: false})
  }

  render() {
    let {category: {title, id, sub, index}, linkTo, active} = this.props
    let {hover} = this.state

    let a = id === active.category && !active.product
    let color = hover ? '#224E6D' : a ? 'black' : '#48494B'
    let markerStyle = {color: color, opacity: a ? 1 : 0, fontSize: 7, height: 8, verticalAlign: 'middle', marginLeft: 3, marginRight: 3}
    let itemStyle = {color: color, marginBottom: 35}

    let menuItems = sub.map(p => <MenuItem product={p} active={active.category === id ? active : {...active, product: ''}}
                                           key={`${p.id}`}
                                           linkTo={`${linkTo}/${p.id}`}/>)

    return (
      <div style={itemStyle}>
        <Link to={linkTo}>
          <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <h3 style={{fontWeight: 600, color: color}}><i className="fa fa-circle" style={markerStyle}/>{title}</h3>
          </div>
        </Link>
        {menuItems}
      </div>
    )
  }
}

MenuCategory.defaultProps = {
  active: {product: '', category: ''}
}

MenuCategory.propTypes = {
  category: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    sub: PropTypes.array.isRequired
  }),
  active: PropTypes.shape({
    category: PropTypes.string,
    product: PropTypes.string
  }).isRequired,
  linkTo: PropTypes.string.isRequired
}

