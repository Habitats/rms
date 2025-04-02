import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {MENU_WIDTH, MARGIN_XS} from '../vars'

const RightContainer = styled.div`
  margin-left: ${MENU_WIDTH + MARGIN_XS}px;
`

const Right = ({ children }) => {
  return (
    <RightContainer>
      {children}
    </RightContainer>
  )
}

Right.propTypes = {
  children: PropTypes.element.isRequired
}

export default Right
