import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { StyleRoot } from 'radium'
import { configureStore } from './redux/store/configureStore'
import { router } from './redux/routes'
import './scss/base.scss'

console.log('App: Starting initialization')

/**
 * Import the stylesheet you want used! Here we just reference
 * the main SCSS file we have in the styles directory.
 */

/**
 * Both configureStore and Root are required conditionally.
 * See configureStore.js and Root.js for more details.
 */

const store = configureStore()
console.log('App: Store configured')

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh the page.</div>
    }

    return this.props.children
  }
}

render(
  <React.StrictMode>
    <ErrorBoundary>
      <StyleRoot>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </StyleRoot>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)

console.log('App: Initial render complete')
