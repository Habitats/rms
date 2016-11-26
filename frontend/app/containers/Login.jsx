import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Box from './../components/Box.jsx'
import * as sessionActionCreators from '../redux/actions/SessionActions'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: this.props.session.username,
      password: '',
      rememberMe: this.props.session.rememberMe
    }

    this.handleUsernameChange = (event) => {
      this.setState({username: event.target.value})
    }
    this.handlePasswordChange = (event) => {
      this.setState({password: event.target.value})
    }
    this.handleRememberMeChange = (event) => {
      const rememberMe = event.target.checked
      this.setState({rememberMe})
      this.props.dispatch(sessionActionCreators.session({... this.props.session, rememberMe}))
    }
  }

  onLogin(e) {
    e.preventDefault()
    this.props.dispatch(sessionActionCreators.login(this.state))
  }

  onLogout(e) {
    e.preventDefault()
    this.props.dispatch(sessionActionCreators.logout(this.state))
  }

  notLoggedIn() {
    const loginError = this.props.session.loginFailed ? <div>{'Login feilet!'}</div> : ''
    return (
      <div>
        <div className="form-group">
          <label>Brukernavn</label>
          <input className="form-control" onChange={(e) => this.handleUsernameChange(e)} placeholder="Brukernavn" type="text"/>
        </div>
        <div className="form-group">
          <label>Passord</label>
          <input className="form-control" onChange={(e) => this.handlePasswordChange(e)} placeholder="Passord" type="password"/>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" checked={this.state.rememberMe} onChange={(e) => this.handleRememberMeChange(e)}/>Husk meg
          </label>
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block" onClick={this.onLogin.bind(this)} type="submit">Logg inn</button>
        </div>
        {loginError}
      </div>
    )
  }

  isLoggedIn() {
    return (
      <div className="form-group">
        <p>Logget inn som <strong>{this.props.session.username}</strong></p>
        <button className="btn btn-primary btn-block" onClick={this.onLogout.bind(this)} type="submit">Logg ut</button>
      </div>
    )
  }

  render() {
    const loginForm = this.props.session.admin ? this.isLoggedIn() : this.notLoggedIn()
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
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
}

export default connect(state => ({
  session: state.session
}))(Login)

