import * as C from '../constants/ProductConstants'
import {createAction} from 'redux-actions'
import * as GeneralApi from '../api/GeneralApi'

export function fetchProducts() {
  return dispatch => {
    console.log('Actions: Dispatching FETCH_PRODUCTS')
    dispatch({type: C.FETCH_PRODUCTS})
    return GeneralApi.getProducts()
      .then(products => {
        console.log('Actions: Products fetched successfully:', products)
        dispatch({type: C.FETCH_PRODUCTS_SUCCESS, products})
      })
      .catch(error => {
        console.error('Actions: Error fetching products:', error)
        dispatch({type: C.FETCH_PRODUCTS_FAIL, error: error.message})
      })
  }
}

export function save(data) {
  return dispatch => {
    dispatch({type: C.SAVE_PRODUCT})
    return GeneralApi.saveProduct(data)
      .then(products => dispatch({type: C.SAVE_PRODUCT_SUCCESS, products}))
      .catch(error => dispatch({type: C.SAVE_PRODUCT_FAIL, error: error.message}))
  }
}

export function removeProduct(id) {
  return (dispatch) => {
    dispatch({type: C.DELETE_PRODUCT})
    return GeneralApi.removeProduct(id)
      .then(products => dispatch({type: C.DELETE_PRODUCT_SUCCESS, products}))
      .catch(error => dispatch({type: C.DELETE_PRODUCT_FAIL, error: error.message}))
  }
}

export function selectProduct(category, product) {
  return (dispatch) => {
    dispatch({type: C.SELECT_PRODUCT, category: category, product: product})
    // Navigation will be handled by the component using useNavigate
  }
}

export function selectCategory(category) {
  return (dispatch) => {
    dispatch({type: C.SELECT_CATEGORY, category: category})
    // Navigation will be handled by the component using useNavigate
  }
}

export function deleteProduct(productId) {
  return (dispatch) => {
    dispatch({type: C.DELETE_PRODUCT})
    return fetch(`/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json().then(products => {
          dispatch({type: C.DELETE_PRODUCT_SUCCESS, products})
        })
      }
      throw new Error('Failed to delete product')
    })
    .catch(error => {
      dispatch({type: C.DELETE_PRODUCT_FAIL, error: error.message})
      throw error
    })
  }
}

export function updateProduct(productId, data) {
  return (dispatch) => {
    dispatch({type: C.UPDATE_PRODUCT})
    return fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        return response.json().then(products => {
          dispatch({type: C.UPDATE_PRODUCT_SUCCESS, products})
        })
      }
      throw new Error('Failed to update product')
    })
    .catch(error => {
      dispatch({type: C.UPDATE_PRODUCT_FAIL, error: error.message})
      throw error
    })
  }
}
