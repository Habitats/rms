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
  margin-top: ${props => 
    props.isSmall 
      ? '20px' 
      : props.isMedium 
        ? '50px' 
        : '50px'
  };
  text-align: center;
  width: 100%;
`

const SmallHeadline = styled.h5`
  color: ${props => props.theme.colors.HEADING_SMALL};
`

const BigHeadlineText = styled.h1`
  padding-top: 10px;
  padding-bottom: 0;
  color: ${props => props.theme.colors.HEADING_BIG};
`

const Divider = styled.hr`
  margin-bottom: ${props => 
    props.isSmall 
      ? '30px' 
      : props.isMedium 
        ? '50px' 
        : '70px'
  };
  margin-top: ${props => 
    props.isSmall 
      ? '20px' 
      : props.isMedium 
        ? '50px' 
        : '70px'
  };
`

const BigHeadline = ({ small, big, to }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`);
  const isMedium = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.md})`);

  return (
    <HeadlineRow className="row">
      <HeadlineBox className="col-lg-12" isSmall={isSmall} isMedium={isMedium}>
        <SmallHeadline>
          {to ? <Link to={to}>{small}</Link> : small}
        </SmallHeadline>
        <BigHeadlineText>{big}</BigHeadlineText>
        <Divider isSmall={isSmall} isMedium={isMedium} />
      </HeadlineBox>
    </HeadlineRow>
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
