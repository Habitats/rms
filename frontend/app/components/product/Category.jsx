import React, {Component, PropTypes} from 'react'
import ProductItem from './ProductItem.jsx'

export default class Category extends Component {

  render() {
    let {title,id, sub} = this.props.category
    let products = sub.map(p => <ProductItem key={`${p.id}`} product={p} category={title} linkTo={`/produkter/${id}/${p.id}`}/>)
    return (
        <div className="row">
          {products}
        </div>
    )
  }
}

Category.propTypes = {
  category: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    sub: PropTypes.array.isRequired
  })
}
