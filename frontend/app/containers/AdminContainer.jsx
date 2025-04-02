import React from 'react'
import PropTypes from 'prop-types'
import { useSubmit } from 'react-router-dom'
import styled from 'styled-components'
import MediumHeadline from './../components/text/MediumHeadline.jsx'
import Box from './../components/Box.jsx'

const ButtonContainer = styled.div`
  width: 100%;
`

const AdminContainer = () => {
  const submit = useSubmit()

  const invalidate = () => {
    submit(null, { method: 'post', action: '/api/invalidate-cache' })
  }

  return (
    <div>
      <Box>
        <MediumHeadline big={"Admin"}/>

        <ButtonContainer className="col-xs-12">
          <button className="btn btn-primary btn-block" onClick={invalidate}>Invalider bilde-cache</button>
        </ButtonContainer>
      </Box>
    </div>
  )
}

export default AdminContainer
