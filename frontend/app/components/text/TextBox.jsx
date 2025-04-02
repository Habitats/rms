import React from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import { Row, Column } from '../styled/Common'
import {CONTENT_MAX_WIDTH} from '../../vars'
import useMediaQuery from '../../hooks/useMediaQuery'

const TextContainer = styled.div`
  padding-bottom: 40px;
  text-align: justify;
  max-width: ${props => 
    props.isSmall 
      ? '435px' 
      : props.isMedium 
        ? `${CONTENT_MAX_WIDTH}px` 
        : `${CONTENT_MAX_WIDTH + 50}px`
  };
  margin: 0 auto;
`

const TextBox = ({ children }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`);
  const isMedium = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.md})`);

  return (
    <Row>
      <Column className="col-xs-12">
        <TextContainer isSmall={isSmall} isMedium={isMedium}>
          {children}
        </TextContainer>
      </Column>
    </Row>
  )
}

TextBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default TextBox
