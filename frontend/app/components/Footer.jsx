import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import * as sessionActionCreator from '../redux/actions/sessionActions'

export default class Footer extends Component {

  render() {
    let {username} = this.props.session
    let userField = username ? ` (${username})` : ''
    return (
      <footer>
        <div className="container text-center">
          <ul className="list-inline">
            <li>Romerike Markiseserrvice AS&nbsp;&nbsp;&nbsp;</li>
            <li><i className="fa fa-map-marker"></i> Nannestadvegen 510, 2032 Maura&nbsp;&nbsp;&nbsp;</li>
            <li><i className="fa fa-phone"></i>+47 63 99 95 32&nbsp;&nbsp;&nbsp;</li>
            <li><i className="fa fa-envelope"></i> <a href="mailto:post@romerike-markiseservice.no">post@romerike-markiseservice.no</a></li>
            <li>&nbsp;&nbsp;<Link to="/login">Admin</Link>{userField}</li>
          </ul>
        </div>
      </footer>
    )
  }
}

Footer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
}

export default connect(state => ({
  session: state.session
}))(Footer)


