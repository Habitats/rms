import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getProducts, 
  getProduct, 
  saveProduct, 
  removeProduct 
} from '../api/GeneralApi'
import { useState } from 'react'

/**
 * Hook for fetching all products
 * @returns {Object} Query result containing products data
 */
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })
}

/**
 * Hook for fetching a single product
 * @param {string} productId - ID of the product to fetch
 * @returns {Object} Query result containing product data
 */
export function useProduct(productId) {
  return useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId
  })
}

/**
 * Hook for product mutations (create, update, delete)
 * @returns {Object} Object containing mutation functions
 */
export function useProductMutations() {
  const queryClient = useQueryClient()

  const createProduct = useMutation({
    mutationFn: saveProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
    }
  })

  const updateProduct = useMutation({
    mutationFn: saveProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
    }
  })

  const deleteProduct = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
    }
  })

  return {
    createProduct,
    updateProduct,
    deleteProduct
  }
}

/**
 * Hook for managing product selection state
 * @returns {Object} Object containing selection state and handlers
 */
export function useProductSelection() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSubProduct, setSelectedSubProduct] = useState(null)

  return {
    selectedCategory,
    selectedProduct,
    selectedSubProduct,
    setSelectedCategory,
    setSelectedProduct,
    setSelectedSubProduct
  }
} 