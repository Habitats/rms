import React, {Component, PropTypes} from 'react'
import ProductItems from './ProductItems.jsx'

export default class Category extends Component {

  render() {
    const {title, id, sub} = this.props.category
    return (
      <div className="row">
        <ProductItems products={sub} category={title} parentRoute={`/produkter/${id}`}/>
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
