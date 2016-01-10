import * as C from './../constants/productConstants'
import {pushPath} from 'redux-simple-router'
import * as GeneralApi from '../api/GeneralApi'

export function fetchProducts() {
  return dispatch => {
    dispatch({type: C.REQUEST_PRODUCTS})
    return GeneralApi.getProducts().then(
      products => dispatch({type: C.RECEIVE_PRODUCTS, products}),
      error => dispatch({type: C.RECEIVE_PRODUCTS_FAIL})
    )
  }
}

export function selectProduct(category, product) {
  return (dispatch) => {
    dispatch(pushPath(`${product.short}/${category.short}`))
    dispatch({type: C.SELECT_PRODUCT, category: category, product: product})
  }
}

export function selectCategory(category) {
  return (dispatch) => {
    dispatch(pushPath(`${category.short}`))
    dispatch({type: C.SELECT_CATEGORY, category: category})
  }
}
