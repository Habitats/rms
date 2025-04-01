import React from 'react'
import PropTypes from 'prop-types'
import * as V from '../vars'
import useMediaQuery from '../hooks/useMediaQuery'

const Box = ({ children, style: propStyle }) => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');

  const style = {
    background: '#fff',
    float: 'left',
    position: 'relative',
    width: '100%',
    boxShadow: '0 0 35px 3px rgba(0, 0, 0, 0.16)',
    padding: isSmall ? V.MARGIN_XS : V.MARGIN_SM,
    marginBottom: isSmall ? 0 : 20,
    ...propStyle
  }

  return (
    <div style={style} className="box">
      {children}
    </div>
  )
}

Box.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  style: PropTypes.object
}

Box.defaultProps = {
  style: {}
}

export default Box
