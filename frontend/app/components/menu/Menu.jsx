import React from 'react'
import MenuCategory from './MenuCategory.jsx'

export default class Menu extends React.Component {

  render() {
    let {categories, category} = this.props
    let cats = categories.map(c => <MenuCategory category={c} active={c.short === category.short}/>)
    return (
      <div style={{marginLeft: -21}}>
        {cats}
      </div>
    )
  }
}

Menu.propTypes = {
  categories: React.PropTypes.array.isRequired,
  category: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    short: React.PropTypes.string.isRequired,
    sub: React.PropTypes.array.isRequired
  })
}
