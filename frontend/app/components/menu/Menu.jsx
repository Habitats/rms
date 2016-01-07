import React from 'react'
import MenuCategory from './MenuCategory.jsx'

export default class Menu extends React.Component {

  render() {
    let {categories, selected} = this.props
    let cats = categories.map(c => <MenuCategory category={c} selectedCategory={selected}/>)
    return (
      <div style={{marginLeft: -21}}>
        {cats}
      </div>
    )
  }
}

Menu.propTypes = {
  categories: React.PropTypes.array.isRequired,
  selectedCategory: React.PropTypes.string.isRequired
}
