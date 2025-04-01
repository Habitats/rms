import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import * as SessionActionCreators from './redux/actions/SessionActions'
import { router } from './redux/routes'

const App = () => {
  const dispatch = useDispatch()
  const session = useSelector(state => state.session)

  useEffect(() => {
    dispatch(SessionActionCreators.session())
  }, [dispatch])

  return <RouterProvider router={router} />
}

App.propTypes = {
  session: PropTypes.shape({
    admin: PropTypes.bool.isRequired,
    username: PropTypes.string
  })
}

export default App

