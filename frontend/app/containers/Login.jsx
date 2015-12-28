import React from 'react';
import { connect } from 'react-redux'
import BigHeadline from './../components/text/BigHeadline.jsx';
import * as sessionActionCreators from './../actions/SessionActionCreators'

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rememberMe: false};
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleRememberMeChange(event) {
    this.setState({rememberMe: event.target.checked});
  }

  onLogin(e) {
    e.preventDefault();
    this.props.dispatch(sessionActionCreators.login(this.getSession()));
  }

  onLogout(e) {
    e.preventDefault();
    this.props.dispatch(sessionActionCreators.logout(this.getSession()));
  }

  getSession() {
    return {
      id: this.props.session.id,
      username: this.state.username,
      password: this.state.password,
      rememberMe: this.state.rememberMe
    };
  }

  render() {
    let login = this.props.session.admin ?
                <p>Logget inn som <strong>{this.props.session.username}</strong></p> : '';

    let loginForm;
    console.log(this.state);
    if (!this.props.session.admin) {
      loginForm = (
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
              <input type="checkbox" onChange={this.handleRememberMeChange.bind(this)}> Husk meg</input>
            </label>
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" onClick={this.onLogin.bind(this)} type="submit">Logg inn</button>
          </div>
        </div>
      );
    } else {
      loginForm = (
        <div className="form-group">
          <button className="btn btn-primary btn-block" onClick={this.onLogout.bind(this)} type="submit">Logg ut</button>
        </div>);
    }
    return (
      <div className="container">
        <div className="box">
          <div className="row">
            <div className="col-md-4 col-md-offset-4 col-sm-5 col-sm-offset-2">
              {login}
              <form className="form">
                {loginForm}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  session: React.PropTypes.object.isRequired
};

export default connect(state => ({
  session: state.session
}))(Login)

