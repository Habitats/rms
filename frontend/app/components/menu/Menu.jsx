import React, {Component, PropTypes} from 'react'
import MenuCategory from './MenuCategory.jsx'
import Box from './../Box.jsx'

export default class Menu extends Component {

  render() {
    let {categories, selectedCategory} = this.props
    let cats = categories.map(c => <MenuCategory key={c.short} category={c} selectedCategory={selectedCategory}/>)
    return (
      <Box>
        <div style={{marginLeft: -21, marginRight: -21}}>
          {cats}
        </div>
      </Box>
    )
  }
}

Menu.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired
}
