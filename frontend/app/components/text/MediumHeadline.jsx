import React from 'react'
import PropTypes from 'prop-types'
import {HEADING_SMALL, HEADING_BIG} from '../../colors'
import Link from '../Link.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'

const MediumHeadline = ({ small, big, to }) => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');

  const style = {
    box: {
      marginTop: isSmall ? 10 : 30
    },
    divider: {
      marginBottom: isSmall ? 20 : 40,
      marginTop: isSmall ? 15 : 30
    },
    big: {
      paddingTop: isSmall ? 0 : 20,
      paddingBottom: 0,
      color: HEADING_BIG
    },
    small: {
      marginBottom: isSmall ? -10 : -20,
      color: HEADING_SMALL
    }
  }

  return (
    <div className="row">
      <div className="col-lg-12 text-center" style={style.box}>
        <h5 style={style.small}>
          {to ? <Link to={to}>{small}</Link> : small}
        </h5>
        <h2 style={style.big}>{big}</h2>
        <hr style={style.divider}/>
      </div>
    </div>
  )
}

MediumHeadline.defaultProps = {
  small: '',
  big: '',
  to: null
}

MediumHeadline.propTypes = {
  small: PropTypes.string,
  big: PropTypes.string,
  to: PropTypes.string
}

export default MediumHeadline
