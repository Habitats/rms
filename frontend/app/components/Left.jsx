import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {MENU_WIDTH} from '../vars'

const LeftContainer = styled.div`
  width: ${MENU_WIDTH}px;
  padding-right: 0;
`

const Left = ({ children }) => {
  return (
    <LeftContainer>
      {children}
    </LeftContainer>
  )
}

Left.propTypes = {
  children: PropTypes.element.isRequired
}

export default Left
