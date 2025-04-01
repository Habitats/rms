import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Box from './../components/Box.jsx'
import * as sessionActionCreators from '../redux/actions/SessionActions'

const Login = () => {
  const dispatch = useDispatch()
  const session = useSelector(state => state.session)
  
  const [state, setState] = useState({
    username: session.username,
    password: '',
    rememberMe: session.rememberMe
  })

  useEffect(() => {
    setState(prev => ({
      ...prev,
      username: session.username,
      rememberMe: session.rememberMe
    }))
  }, [session.username, session.rememberMe])

  const handleUsernameChange = (event) => {
    setState(prev => ({ ...prev, username: event.target.value }))
  }

  const handlePasswordChange = (event) => {
    setState(prev => ({ ...prev, password: event.target.value }))
  }

  const handleRememberMeChange = (event) => {
    const rememberMe = event.target.checked
    setState(prev => ({ ...prev, rememberMe }))
    dispatch(sessionActionCreators.session({ ...session, rememberMe }))
  }

  const onLogin = (e) => {
    e.preventDefault()
    dispatch(sessionActionCreators.login(state))
  }

  const onLogout = (e) => {
    e.preventDefault()
    dispatch(sessionActionCreators.logout(state))
  }

  const notLoggedIn = () => {
    const loginError = session.loginFailed ? <div>{'Login feilet!'}</div> : ''
    return (
      <div>
        <div className="form-group">
          <label>Brukernavn</label>
          <input 
            className="form-control" 
            onChange={handleUsernameChange} 
            placeholder="Brukernavn" 
            type="text"
            value={state.username}
          />
        </div>
        <div className="form-group">
          <label>Passord</label>
          <input 
            className="form-control" 
            onChange={handlePasswordChange} 
            placeholder="Passord" 
            type="password"
            value={state.password}
          />
        </div>
        <div className="checkbox">
          <label>
            <input 
              type="checkbox" 
              checked={state.rememberMe} 
              onChange={handleRememberMeChange}
            />
            Husk meg
          </label>
        </div>
        <div className="form-group">
          <button 
            className="btn btn-primary btn-block" 
            onClick={onLogin} 
            type="submit"
          >
            Logg inn
          </button>
        </div>
        {loginError}
      </div>
    )
  }

  const isLoggedIn = () => {
    return (
      <div className="form-group">
        <p>Logget inn som <strong>{session.username}</strong></p>
        <button 
          className="btn btn-primary btn-block" 
          onClick={onLogout} 
          type="submit"
        >
          Logg ut
        </button>
      </div>
    )
  }

  const loginForm = session.admin ? isLoggedIn() : notLoggedIn()

  return (
    <Box>
      <div className="row">
        <div className="col-sm-4 col-sm-offset-4 col-xs-8 col-xs-offset-2">
          <form className="form">
            {loginForm}
          </form>
        </div>
      </div>
    </Box>
  )
}

Login.propTypes = {}

export default Login

