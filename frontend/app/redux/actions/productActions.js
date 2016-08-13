import * as C from "./../constants/productConstants";
import {routeActions} from "redux-simple-router";
import * as GeneralApi from "../api/GeneralApi";

export function fetchProducts() {
  return dispatch => {
    dispatch({type: C.REQUEST_PRODUCTS})
    return GeneralApi.getProducts().then(
      products => dispatch({type: C.RECEIVE_PRODUCTS, products}),
      error => dispatch({type: C.RECEIVE_PRODUCTS_FAIL})
    )
  }
}

export function save(data) {
  return dispatch => {
    dispatch({type: C.SAVE_PRODUCT_INIT})
    return GeneralApi.saveProduct(data).then(
      products => dispatch({type: C.SAVE_PRODUCT_SUCCESS, products}),
      error => dispatch({type: C.SAVE_PRODUCT_FAIL})
    )
  }
}

export function removeProduct(id) {
  return (dispatch) => {
    dispatch({type: C.DELETE_PRODUCT_INIT})
    return GeneralApi.removeProduct(id).then(
      products => dispatch({type: C.DELETE_PRODUCT_SUCCESS, products}),
      error => dispatch({type: C.DELETE_PRODUCT_FAIL})
    )
  }
}

export function selectProduct(category, product) {
  return (dispatch) => {
    dispatch(routeActions.push(`${category.id}/${product.id}`))
    dispatch({type: C.SELECT_PRODUCT, category: category, product: product})
  }
}

export function selectCategory(category) {
  return (dispatch) => {
    dispatch(routeActions.push(`${category.id}`))
    dispatch({type: C.SELECT_CATEGORY, category: category})
  }
}
