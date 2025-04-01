import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import useMediaQuery from '../hooks/useMediaQuery'

const Link = ({ to, children, style = {}, className = '', ...props }) => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');

  const defaultStyle = {
    textDecoration: 'none',
    color: 'inherit',
    fontSize: isSmall ? '14px' : isMedium ? '16px' : '16px',
    fontWeight: 400,
    transition: 'color 0.2s ease-in-out'
  }

  return (
    <RouterLink 
      to={to} 
      style={{ ...defaultStyle, ...style }}
      className={`custom-link ${className}`.trim()}
      {...props}
    >
      {children}
    </RouterLink>
  )
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
}

export default Link
