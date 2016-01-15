import React, {Component, PropTypes} from 'react'
import MenuCategory from './MenuCategory.jsx'
import Box from './../Box.jsx'

export default class Menu extends Component {

  render() {
    let {categories, active, linkTo} = this.props
    let cats = categories.sub.map(c => <MenuCategory key={c.short} linkTo={`${linkTo}/${c.short}`} category={c} active={active}/>)
    return (
      <Box>
        <div style={{marginLeft: -31, marginRight: -21}}>
          {cats}
        </div>
      </Box>
    )
  }
}

Menu.propTypes = {
  categories: PropTypes.object.isRequired,
  linkTo: PropTypes.string.isRequired,
  active: PropTypes.shape({
    product: PropTypes.string,
    category: PropTypes.string.isRequired
  }).isRequired
}
