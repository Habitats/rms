import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProducts, useProduct } from '../hooks/useProducts'
import { useProductContext } from '../contexts/ProductContext'
import useMediaQuery from '../hooks/useMediaQuery'
import Carousel from '../components/photo/Carousel'

const ProductContainer = () => {
  const { categoryId, productId, subId } = useParams()
  const navigate = useNavigate()
  const isXs = useMediaQuery('only screen and (max-width: 767px)')
  const isSm = useMediaQuery('only screen and (min-width: 768px) and (max-width: 991px)')
  
  const { data: products, isLoading: isLoadingProducts } = useProducts()
  const { data: product, isLoading: isLoadingProduct } = useProduct(productId)
  
  const {
    selectedCategory,
    selectedProduct,
    setSelectedCategory,
    setSelectedProduct,
    setSelectedSubProduct,
    setBreadcrumbs
  } = useProductContext()

  const columns = isXs ? 1 : isSm ? 2 : 3

  React.useEffect(() => {
    if (categoryId && products) {
      const category = products.find(p => p.id === categoryId)
      setSelectedCategory(category)
      setBreadcrumbs([{ id: categoryId, name: category.name }])
    }
  }, [categoryId, products, setSelectedCategory, setBreadcrumbs])

  React.useEffect(() => {
    if (productId && product) {
      setSelectedProduct(product)
      setBreadcrumbs(prev => [...prev, { id: productId, name: product.name }])
    }
  }, [productId, product, setSelectedProduct, setBreadcrumbs])

  React.useEffect(() => {
    if (subId && product) {
      const subProduct = product.subProducts?.find(sp => sp.id === subId)
      setSelectedSubProduct(subProduct)
      setBreadcrumbs(prev => [...prev, { id: subId, name: subProduct.name }])
    }
  }, [subId, product, setSelectedSubProduct, setBreadcrumbs])

  if (isLoadingProducts || isLoadingProduct) {
    return <div>Loading...</div>
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="product-container">
      <div className="breadcrumbs">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && ' / '}
            <span 
              className="breadcrumb-item"
              onClick={() => navigate(`/produkter/${item.id}`)}
            >
              {item.name}
            </span>
          </React.Fragment>
        ))}
      </div>

      <div className="product-content">
        <h1>{product.name}</h1>
        {product.images && <Carousel images={product.images} />}
        <div className="description" dangerouslySetInnerHTML={{ __html: product.description }} />
        
        {product.subProducts && (
          <div className={`sub-products grid grid-cols-${columns}`}>
            {product.subProducts.map(subProduct => (
              <div 
                key={subProduct.id}
                className="sub-product-item"
                onClick={() => navigate(`/produkter/${categoryId}/${productId}/${subProduct.id}`)}
              >
                <img src={subProduct.image} alt={subProduct.name} />
                <h3>{subProduct.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductContainer
