import React from 'react'
import PropTypes from 'prop-types'
import {CONTENT_MAX_WIDTH} from '../../vars'
import useMediaQuery from '../../hooks/useMediaQuery'

const TextBox = ({ children }) => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');

  const style = {
    paddingBottom: 40,
    textAlign: 'justify',
    maxWidth: isSmall ? 435 : isMedium ? CONTENT_MAX_WIDTH : CONTENT_MAX_WIDTH + 50,
    margin: '0 auto'
  }

  return (
    <div className="row">
      <div className="col-xs-12">
        <div style={style}>
          {children}
        </div>
      </div>
    </div>
  )
}

TextBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default TextBox
