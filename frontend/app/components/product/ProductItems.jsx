import React from 'react'
import PropTypes from 'prop-types'
import useMediaQuery from '../../hooks/useMediaQuery'

const ProductItems = ({ items }) => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');

  const style = {
    container: {
      display: 'grid',
      gridTemplateColumns: isSmall ? '1fr' : isMedium ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: isSmall ? '10px' : isMedium ? '15px' : '20px',
      padding: isSmall ? '10px' : isMedium ? '20px' : '30px'
    }
  }

  return (
    <div style={style.container}>
      {items.map((item) => (
        <div 
          key={item.id} 
          className="product-item"
        >
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {item.image && (
            <img 
              src={item.image} 
              alt={item.title}
              style={{
                width: '100%',
                height: isSmall ? '200px' : isMedium ? '250px' : '300px',
                objectFit: 'cover'
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

ProductItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string
    })
  ).isRequired
}

export default ProductItems
