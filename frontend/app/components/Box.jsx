import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as V from '../vars'

const StyledBox = styled.div`
  background: #fff;
  float: left;
  position: relative;
  width: 100%;
  box-shadow: 0 0 35px 3px rgba(0, 0, 0, 0.16);

  @media only screen and (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: ${V.MARGIN_XS};
    width: 100%;
    margin-bottom: 0;
  }

  @media only screen and (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${V.MARGIN_SM};
    margin-bottom: 20px;
  }
`

const Box = ({ children }) => {
  return (
    <StyledBox className="box">
      {children}
    </StyledBox>
  )
}

Box.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Box
