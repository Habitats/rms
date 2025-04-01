import React from 'react'
import { useNavigate } from 'react-router-dom'
import Radium from 'radium'
import PropTypes from 'prop-types'

const Link = ({ to, children, className, onClick }) => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    if (onClick) {
      onClick(e)
    }
    navigate(to)
  }

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default Radium(Link)
