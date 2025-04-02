import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLoaderData, Form, useSubmit, useActionData, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Box from './../components/Box.jsx'

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`

const FormColumn = styled.div`
  width: 100%;
  
  @media (min-width: 768px) {
    width: 33.33333%;
    margin-left: 33.33333%;
  }
  
  @media (max-width: 767px) {
    width: 66.66667%;
    margin-left: 16.66667%;
  }
`

const FormGroup = styled.div`
  margin-bottom: 15px;
`

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-top: 10px;
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`

const CheckboxContainer = styled(FormGroup)`
  display: flex;
  align-items: center;
`

const CheckboxLabel = styled.label`
  font-weight: normal;
  cursor: pointer;
  margin-left: 8px;
`

const FormInput = styled.input`
  display: block;
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  
  &:focus {
    border-color: #66afe9;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
  }
`

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
  
  &:hover {
    background-color: #286090;
    border-color: #204d74;
  }
`

const StyledCheckbox = styled.input`
  margin: 0;
`

const UserInfoText = styled.p`
  margin-bottom: 15px;
`

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
    return (
      <div>
        <FormGroup>
          <FormLabel>Brukernavn</FormLabel>
          <FormInput 
            onChange={handleUsernameChange} 
            placeholder="Brukernavn" 
            type="text"
            value={state.username}
            name="username"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Passord</FormLabel>
          <FormInput 
            onChange={handlePasswordChange} 
            placeholder="Passord" 
            type="password"
            value={state.password}
            name="password"
          />
        </FormGroup>
        <CheckboxContainer>
          <StyledCheckbox 
            type="checkbox" 
            checked={state.rememberMe} 
            onChange={handleRememberMeChange}
            name="rememberMe"
          />
          <CheckboxLabel>Husk meg</CheckboxLabel>
        </CheckboxContainer>
        <FormGroup>
          <Button 
            onClick={onLogin} 
            type="submit"
          >
            Logg inn
          </Button>
        </FormGroup>
        {actionData?.error && <ErrorMessage>{actionData.error}</ErrorMessage>}
      </div>
    )
  }

  const isLoggedIn = () => {
    return (
      <FormGroup>
        <UserInfoText>Logget inn som <strong>{session.username}</strong></UserInfoText>
        <Button 
          onClick={onLogout} 
          type="submit"
        >
          Logg ut
        </Button>
      </FormGroup>
    )
  }

  const loginForm = session.admin ? isLoggedIn() : notLoggedIn()

  return (
    <Box>
      <FormContainer>
        <FormColumn>
          <Form method="post">
            {loginForm}
          </Form>
        </FormColumn>
      </FormContainer>
    </Box>
  )
}

Login.propTypes = {}

export default Login

