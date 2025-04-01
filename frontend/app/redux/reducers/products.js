import * as C from '../constants/ProductConstants'

export default function product(state = { loading: false, error: null, sub: [] }, action) {
  switch (action.type) {
    case C.FETCH_PRODUCTS:
      return { ...state, loading: true, error: null }

    case C.FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, error: null, ...action.products }

    case C.FETCH_PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.error }

    case C.SELECT_PRODUCT:
      return { ...state, product: action.product, category: action.category }

    case C.SELECT_CATEGORY:
      return { ...state, category: action.category }

    case C.DELETE_PRODUCT_SUCCESS:
      return { ...state, ...action.products }

    case C.SAVE_PRODUCT_SUCCESS:
      return { ...state, ...action.products }

    case C.UPDATE_PRODUCT_SUCCESS:
      return { ...state, ...action.products }

    case C.UPDATE_PRODUCT_FAIL:
      return { ...state, error: action.error }

    default:
      return state
  }
}
