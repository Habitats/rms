import React from 'react'
import PropTypes from 'prop-types'
import { useSubmit } from 'react-router-dom'
import MediumHeadline from './../components/text/MediumHeadline.jsx'
import Box from './../components/Box.jsx'

const AdminContainer = () => {
  const submit = useSubmit()

  const invalidate = () => {
    submit(null, { method: 'post', action: '/api/invalidate-cache' })
  }

  return (
    <div>
      <Box>
        <MediumHeadline big={"Admin"}/>

        <div className="col-xs-12">
          <button className="btn btn-primary btn-block" onClick={invalidate}>Invalider bilde-cache</button>
        </div>
      </Box>
    </div>
  )
}

export default AdminContainer
