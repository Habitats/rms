import React from 'react'
import { connect } from 'react-redux'
import BigHeadline from './../components/text/BigHeadline.jsx'
import * as sessionActionCreators from '../redux/actions/sessionActions'

export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: this.props.session.username,
      password: '',
      rememberMe: this.props.session.rememberMe
    }
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value})
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value})
  }

  handleRememberMeChange(event) {
    const rememberMe = event.target.checked
    this.setState({rememberMe})
    this.props.dispatch(sessionActionCreators.session({... this.props.session, rememberMe}))
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
          <input className="form-control" onChange={this.handleUsernameChange.bind(this)} placeholder="Brukernavn" type="text"/>
        </div>
        <div className="form-group">
          <label>Passord</label>
          <input className="form-control" onChange={this.handlePasswordChange.bind(this)} placeholder="Passord" type="password"/>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" checked={this.state.rememberMe} onChange={this.handleRememberMeChange.bind(this)}>
              Husk meg
            </input>
          </label>
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block" onClick={this.onLogin.bind(this)} type="submit">
            Logg inn
          </button>
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
      <div className="container">
        <div className="box">
          <div className="row">
            <div className="col-md-4 col-md-offset-4 col-sm-5 col-sm-offset-2">
              <form className="form">
                {loginForm}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  session: React.PropTypes.object.isRequired
}

export default connect(state => ({
  session: state.session
}))(Login)

