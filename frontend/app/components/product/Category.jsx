import React from 'react'
import ProductItem from './ProductItem.jsx'

export default class Category extends React.Component {

  render() {
    let {name, sub, short} = this.props.category
    let products = sub.map(p => <ProductItem product={p} linkTo={`/produkter/${short}/${p.short}`}/>)
    return (
      <div className="row">
        {products}
      </div>
    )
  }
}

Category.propTypes = {
  category: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string.isRequired,
    src: React.PropTypes.string.isRequired,
    sub: React.PropTypes.object.isRequired
  })
}
