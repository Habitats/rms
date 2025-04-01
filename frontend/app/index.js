import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { RouterProvider, useNavigate } from 'react-router-dom'
import { router } from './redux/routes'
import { configureStore } from './redux/store/configureStore'
import { initializeNavigator } from './redux/middleware/routingMiddleware'

import './scss/base.scss'

/**
 * Import the stylesheet you want used! Here we just reference
 * the main SCSS file we have in the styles directory.
 */

/**
 * Both configureStore and Root are required conditionally.
 * See configureStore.js and Root.js for more details.
 */

const Root = () => {
  const navigate = useNavigate()
  
  React.useEffect(() => {
    initializeNavigator(navigate)
  }, [navigate])

  return (
    <RouterProvider router={router} />
  )
}

const store = configureStore()

render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
