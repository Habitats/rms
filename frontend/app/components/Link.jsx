import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import useMediaQuery from '../hooks/useMediaQuery'

const StyledLink = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
  font-size: ${props => 
    props.isSmall 
      ? '14px' 
      : props.isMedium 
        ? '16px' 
        : '16px'
  };
  font-weight: 400;
  transition: color 0.2s ease-in-out;
  
  &:hover {
    color: ${props => props.theme.colors.PRIMARY || 'inherit'};
  }
`

const Link = ({ to, children, style = {}, className = '', ...props }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`);
  const isMedium = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.md})`);

  return (
    <StyledLink 
      to={to} 
      style={style}
      className={`custom-link ${className}`.trim()}
      isSmall={isSmall}
      isMedium={isMedium}
      {...props}
    >
      {children}
    </StyledLink>
  )
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
}

export default Link
