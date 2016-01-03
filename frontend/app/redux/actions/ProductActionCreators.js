import * as C from './../constants/ProductConstants'

export function selectProduct(product) {
  return {type: C.SELECT_PRODUCT, product: product}
}

export function selectCategory(category) {
  return (dispatch) => dispatch({type: C.SELECT_CATEGORY, category: category})
}
