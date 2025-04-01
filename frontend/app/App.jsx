import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as SessionActionCreators from './redux/actions/SessionActions'
import Routes from 'redux/routes'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const session = useSelector(state => state.session)

  useEffect(() => {
    dispatch(SessionActionCreators.session())
  }, [dispatch])

  const requireLogin = () => {
    if (!session.admin) {
      navigate('/login')
    }
  }

  return <Routes />
}

App.propTypes = {
  session: PropTypes.shape({
    admin: PropTypes.bool.isRequired,
    username: PropTypes.string
  })
}

export default App

