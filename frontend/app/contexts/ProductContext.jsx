import React, { createContext, useContext, useState } from 'react'
import { useProducts } from '../hooks/useProducts'

/**
 * @typedef {Object} ProductContextType
 * @property {Object} selectedProduct - Currently selected product
 * @property {Object} selectedCategory - Currently selected category
 * @property {Object} selectedSubProduct - Currently selected sub-product
 * @property {Array} breadcrumbs - Navigation breadcrumbs
 * @property {boolean} isEditing - Whether in edit mode
 * @property {boolean} isLoading - Loading state
 * @property {string} error - Error message
 * @property {Function} setSelectedProduct - Set selected product
 * @property {Function} setSelectedCategory - Set selected category
 * @property {Function} setSelectedSubProduct - Set selected sub-product
 * @property {Function} setBreadcrumbs - Set breadcrumbs
 * @property {Function} setIsEditing - Set edit mode
 */

const ProductContext = createContext(/** @type {ProductContextType} */ (null))

export function ProductProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSubProduct, setSelectedSubProduct] = useState(null)
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  const { data: products, isLoading, error } = useProducts()

  const value = {
    selectedCategory,
    selectedProduct,
    selectedSubProduct,
    breadcrumbs,
    isEditing,
    isLoading,
    error,
    products,
    setSelectedCategory,
    setSelectedProduct,
    setSelectedSubProduct,
    setBreadcrumbs,
    setIsEditing
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
} 