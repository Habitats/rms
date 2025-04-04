// Product Constants
export const PRODUCT_ACTIONS = {
  FETCH: 'FETCH_PRODUCTS',
  FETCH_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
  FETCH_FAIL: 'FETCH_PRODUCTS_FAIL',
  SAVE: 'SAVE_PRODUCT',
  SAVE_SUCCESS: 'SAVE_PRODUCT_SUCCESS',
  SAVE_FAIL: 'SAVE_PRODUCT_FAIL',
  DELETE: 'DELETE_PRODUCT',
  DELETE_SUCCESS: 'DELETE_PRODUCT_SUCCESS',
  DELETE_FAIL: 'DELETE_PRODUCT_FAIL',
  SELECT: 'SELECT_PRODUCT',
  SELECT_CATEGORY: 'SELECT_CATEGORY'
}

// General Constants
export const GENERAL_ACTIONS = {
  FETCH_PROJECTS: 'FETCH_PROJECTS_REQUEST',
  FETCH_PROJECTS_SUCCESS: 'FETCH_PROJECTS_SUCCESS',
  FETCH_PROJECTS_FAIL: 'FETCH_PROJECTS_FAIL',
  FETCH_PROJECT: 'FETCH_PROJECT_REQUEST',
  FETCH_PROJECT_SUCCESS: 'FETCH_PROJECT_SUCCESS',
  FETCH_PROJECT_FAIL: 'FETCH_PROJECT_FAIL',
  SAVE_PROJECT: 'SAVE_PROJECT',
  SAVE_PROJECT_SUCCESS: 'SAVE_PROJECT_SUCCESS',
  SAVE_PROJECT_FAIL: 'SAVE_PROJECT_FAIL',
  FETCH_IMAGES: 'FETCH_IMAGES',
  FETCH_IMAGES_SUCCESS: 'FETCH_IMAGES_SUCCESS',
  FETCH_IMAGES_FAIL: 'FETCH_IMAGES_FAIL',
  INVALIDATE_CACHE: 'INVALIDATE_CACHE',
  INVALIDATE_CACHE_SUCCESS: 'INVALIDATE_CACHE_SUCCESS',
  INVALIDATE_CACHE_FAIL: 'INVALIDATE_CACHE_FAIL'
}

// Session Constants
export const SESSION_ACTIONS = {
  FETCH: 'FETCH_SESSION',
  FETCH_SUCCESS: 'FETCH_SESSION_SUCCESS',
  FETCH_FAIL: 'FETCH_SESSION_FAIL',
  UPDATE: 'UPDATE_SESSION',
  UPDATE_SUCCESS: 'UPDATE_SESSION_SUCCESS',
  UPDATE_FAIL: 'UPDATE_SESSION_FAIL',
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAIL: 'LOGOUT_FAIL',
  NAVIGATE: 'NAVIGATE'
}

// Router Constants
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/produkter',
  PRODUCT_DETAIL: '/produkter/:categoryId/:productId',
  SUB_PRODUCT: '/produkter/:categoryId/:productId/:subId',
  SUB_SUB_PRODUCT: '/produkter/:categoryId/:productId/:subId/:subSubId'
} 