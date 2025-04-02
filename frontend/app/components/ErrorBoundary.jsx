import React from 'react'
import PropTypes from 'prop-types'
import { useRouteError, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import BigHeadline from './text/BigHeadline.jsx'
import Box from './Box.jsx'

const ErrorContainer = styled.div`
  padding: 20px;
  text-align: center;
`

const HomeButton = styled.button`
  margin-top: 20px;
`

const ErrorBoundary = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  const handleReload = () => {
    navigate('/')
  }

  return (
    <Box>
      <ErrorContainer>
        <BigHeadline 
          big={error?.statusText || error?.message || 'Something went wrong'} 
          small={error?.status || '500'}
        />
        <HomeButton 
          className="btn btn-default" 
          onClick={handleReload}
        >
          Go to Home Page
        </HomeButton>
      </ErrorContainer>
    </Box>
  )
}

export default ErrorBoundary 