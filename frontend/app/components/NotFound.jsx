import React from 'react'
import PropTypes from 'prop-types'
import BigHeadline from './text/BigHeadline.jsx'
import Box from './Box.jsx'

const NotFound = () => {
  return (
    <Box>
      <BigHeadline big="Denne siden finnes ikke." small="404"/>
    </Box>
  )
}

NotFound.propTypes = {}

export default NotFound
