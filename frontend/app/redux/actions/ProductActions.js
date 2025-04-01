import * as C from '../constants/ProductConstants'
import {createAction} from 'redux-actions'
import * as GeneralApi from '../api/GeneralApi'
import history from '../../history'

export function fetchProducts() {
  return dispatch => {
    dispatch({type: C.FETCH_PRODUCTS})
    return GeneralApi.getProducts().then(
      products => dispatch({type: C.FETCH_PRODUCTS_SUCCESS, products}),
      error => dispatch({type: C.FETCH_PRODUCTS_FAIL})
    )
  }
}

export function save(data) {
  return dispatch => {
    dispatch({type: C.SAVE_PRODUCT})
    return GeneralApi.saveProduct(data).then(
      products => dispatch({type: C.SAVE_PRODUCT_SUCCESS, products}),
      error => dispatch({type: C.SAVE_PRODUCT_FAIL})
    )
  }
}

export function removeProduct(id) {
  return (dispatch) => {
    dispatch({type: C.DELETE_PRODUCT})
    return GeneralApi.removeProduct(id).then(
      products => dispatch({type: C.DELETE_PRODUCT_SUCCESS, products}),
      error => dispatch({type: C.DELETE_PRODUCT_FAIL})
    )
  }
}

export function selectProduct(category, product) {
  return (dispatch) => {
    dispatch({type: C.SELECT_PRODUCT, category: category, product: product})
    history.push(`${category.id}/${product.id}`)
  }
}

export function selectCategory(category) {
  return (dispatch) => {
    dispatch({type: C.SELECT_CATEGORY, category: category})
    history.push(`${category.id}`)
  }
}

export function deleteProduct(productId) {
  return (dispatch) => {
    dispatch(deleteProductRequest(productId));
    return fetch(`/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        dispatch(deleteProductSuccess(productId));
        history.push('/products');
      } else {
        throw new Error('Failed to delete product');
      }
    })
    .catch(error => {
      dispatch(deleteProductFailure(error));
      throw error;
    });
  };
}

export function updateProduct(productId, data) {
  return (dispatch) => {
    dispatch(updateProductRequest(productId, data));
    return fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        dispatch(updateProductSuccess(productId, data));
        history.push(`/products/${productId}`);
      } else {
        throw new Error('Failed to update product');
      }
    })
    .catch(error => {
      dispatch(updateProductFailure(error));
      throw error;
    });
  };
}
