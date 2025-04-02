import React from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import Link from '../Link.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'

const HeadlineRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeadlineBox = styled.div`
  margin-top: ${props => props.isSmall ? '10px' : '30px'};
  text-align: center;
  width: 100%;
`

const SmallHeadline = styled.h5`
  margin-bottom: ${props => props.isSmall ? '-10px' : '-20px'};
  color: ${props => props.theme.colors.HEADING_SMALL};
`

const BigHeadline = styled.h2`
  padding-top: ${props => props.isSmall ? '0' : '20px'};
  padding-bottom: 0;
  color: ${props => props.theme.colors.HEADING_BIG};
`

const Divider = styled.hr`
  margin-bottom: ${props => props.isSmall ? '20px' : '40px'};
  margin-top: ${props => props.isSmall ? '15px' : '30px'};
`

const MediumHeadline = ({ small, big, to }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`);

  return (
    <HeadlineRow className="row">
      <HeadlineBox className="col-lg-12" isSmall={isSmall}>
        <SmallHeadline isSmall={isSmall}>
          {to ? <Link to={to}>{small}</Link> : small}
        </SmallHeadline>
        <BigHeadline isSmall={isSmall}>{big}</BigHeadline>
        <Divider isSmall={isSmall} />
      </HeadlineBox>
    </HeadlineRow>
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
