import React from 'react'
import PropTypes from 'prop-types'
import { useRouteError, useNavigate } from 'react-router-dom'
import BigHeadline from './text/BigHeadline.jsx'
import Box from './Box.jsx'

const ErrorBoundary = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  const handleReload = () => {
    navigate('/')
  }

  return (
    <Box>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <BigHeadline 
          big={error?.statusText || error?.message || 'Something went wrong'} 
          small={error?.status || '500'}
        />
        <button 
          className="btn btn-default" 
          onClick={handleReload}
          style={{ marginTop: '20px' }}
        >
          Go to Home Page
        </button>
      </div>
    </Box>
  )
}

export default ErrorBoundary 