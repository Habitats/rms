import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLoaderData, Form, useSubmit, useActionData, useNavigate } from 'react-router-dom'
import Box from './../components/Box.jsx'

const Login = () => {
  const navigate = useNavigate()
  const submit = useSubmit()
  const { session } = useLoaderData()
  const actionData = useActionData()
  
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
    submit({ rememberMe }, { method: 'post', action: '/api/session' })
  }

  const onLogin = async (e) => {
    e.preventDefault()
    submit(state, { method: 'post', action: '/api/login' })
  }

  const onLogout = async (e) => {
    e.preventDefault()
    submit(null, { method: 'post', action: '/api/logout' })
  }

  const notLoggedIn = () => {
    const loginError = actionData?.error ? <div>{actionData.error}</div> : ''
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
            name="username"
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
            name="password"
          />
        </div>
        <div className="checkbox">
          <label>
            <input 
              type="checkbox" 
              checked={state.rememberMe} 
              onChange={handleRememberMeChange}
              name="rememberMe"
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
          <Form method="post">
            {loginForm}
          </Form>
        </div>
      </div>
    </Box>
  )
}

Login.propTypes = {}

export default Login

