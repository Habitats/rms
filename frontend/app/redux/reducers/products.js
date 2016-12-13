import * as C from '../constants/ProductConstants'

export default function product(state = {}, action) {
  switch (action.type) {

    case C.SELECT_PRODUCT:
      return {... state, product: action.product, category: action.category}

    case C.SELECT_CATEGORY:
      return {... state, category: action.category}

    case C.FETCH_PRODUCTS_SUCCESS:
      return action.products

    case C.DELETE_PRODUCT_SUCCESS:
      return action.products

    case C.SAVE_PRODUCT_SUCCESS:
      return action.products

    default:
      return state
  }
}
