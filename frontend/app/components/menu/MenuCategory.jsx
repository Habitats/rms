import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import * as ProductActionCreators from '../../redux/actions/ProductActionCreators'
import MenuItem from './MenuItem.jsx'

export default class MenuCategory extends React.Component {

  render() {
    let {active, category} = this.props
    let selected = active ?
                   <i className="fa fa-genderless" style={{color: 'darkRed'}}/> :
                   <span className="fa-empty"/>

    let sub = category.sub.map(p => <MenuItem product={p} category={category}/>)
    return (
      <div style={{marginBottom: 30}}>
        <Link to={`/produkter/${category.short}`}><h4>{selected}{category.name}</h4></Link>
        {sub}
      </div>
    )
  }
}

MenuCategory.propTypes = {
  category: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    short: React.PropTypes.string.isRequired,
    sub: React.PropTypes.array.isRequired
  }),
  active: React.PropTypes.bool.isRequired
}

