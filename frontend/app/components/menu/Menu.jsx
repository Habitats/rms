import React, {Component, PropTypes} from 'react'
import MenuCategory from './MenuCategory.jsx'

export default class Menu extends Component {

  render() {
    let {categories, selectedCategory} = this.props
    let cats = categories.map(c => <MenuCategory category={c} selectedCategory={selectedCategory}/>)
    return (
      <div style={{marginLeft: -21}}>
        {cats}
      </div>
    )
  }
}

Menu.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired
}
