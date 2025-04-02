import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LabelContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const SimpleLabel = ({ text }) => {
  return (
    <LabelContainer>
      {text}
    </LabelContainer>
  )
}

SimpleLabel.propTypes = {
  text: PropTypes.string.isRequired
}

export default SimpleLabel
