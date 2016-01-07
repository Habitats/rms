import * as C from './../constants/productConstants'
import {pushPath} from 'redux-simple-router'

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
