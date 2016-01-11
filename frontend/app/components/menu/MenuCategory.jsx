import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as ProductActionCreators from '../../redux/actions/productActions'
import MenuItem from './MenuItem.jsx'

export default class MenuCategory extends Component {

  render() {
    let {selectedCategory, category} = this.props
    let active = category.short === selectedCategory ?
                 <i className="fa fa-genderless" style={{color: 'darkRed'}}/> :
                 <span className="fa-empty"/>

    let sub = category.sub.map(p => <MenuItem product={p}
                                              linkTo={`/produkter/${category.short}/${p.short}`}
    />)
    return (
      <div style={{marginBottom: 30}}>
        <Link to={`/produkter/${category.short}`}><h4>{active}{category.name}</h4></Link>
        {sub}
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
  selectedCategory: PropTypes.string.isRequired
}

