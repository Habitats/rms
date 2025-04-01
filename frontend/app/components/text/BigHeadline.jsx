import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link.jsx'
import {HEADING_SMALL, HEADING_BIG} from '../../colors'
import useMediaQuery from '../../hooks/useMediaQuery'

const BigHeadline = ({ small, big, to }) => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');

  const style = {
    box: {
      marginTop: isSmall ? 20 : isMedium ? 50 : 50
    },
    divider: {
      marginBottom: isSmall ? 30 : isMedium ? 50 : 70,
      marginTop: isSmall ? 20 : isMedium ? 50 : 70
    },
    big: {
      paddingBottom: 0,
      paddingTop: 10,
      color: HEADING_BIG
    },
    small: {
      color: HEADING_SMALL
    }
  }

  return (
    <div className="row">
      <div className="col-lg-12 text-center" style={style.box}>
        <h5 style={style.small}>
          {to ? <Link to={to}>{small}</Link> : small}
        </h5>
        <h1 style={style.big}>{big}</h1>
        <hr style={style.divider}/>
      </div>
    </div>
  )
}

BigHeadline.propTypes = {
  small: PropTypes.string,
  big: PropTypes.string.isRequired,
  to: PropTypes.string
}

BigHeadline.defaultProps = {
  small: '',
  to: null
}

export default BigHeadline
