import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { RouterProvider } from 'react-router-dom'
import { router } from './redux/routes'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-4">
          <h1 className="text-danger">Something went wrong</h1>
          <p className="text-muted">{this.state.error?.message || 'An unexpected error occurred'}</p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => {
              this.setState({ hasError: false, error: null })
              window.location.reload()
            }}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
}

const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="text-center p-4">
      <i className="fa fa-spinner fa-spin fa-3x"></i>
      <p className="mt-2">Loading...</p>
    </div>
  </div>
)

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  )
}

App.propTypes = {}

export default App

