import React, {Component, PropTypes} from 'react'
import ProductItem from './ProductItem.jsx'

export default class Category extends Component {

  render() {
    let {name, sub, short} = this.props.category
    let products = sub.map(p => <ProductItem product={p} category={name} linkTo={`/produkter/${short}/${p.short}`}/>)
    return (
        <div className="row">
          {products}
        </div>
    )
  }
}

Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    short: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    sub: PropTypes.object.isRequired
  })
}
