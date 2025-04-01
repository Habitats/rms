import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Radium from 'radium'
import PropTypes from 'prop-types'

const Link = ({ to, children, className, onClick, style }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <RouterLink
      to={to}
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </RouterLink>
  )
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
}

export default Radium(Link)
