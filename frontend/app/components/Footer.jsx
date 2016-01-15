import React, {Component, PropTypes} from 'react'
import Link from './Link.jsx'
import MapWrapper from './../components/map/MapWrapper.jsx'
import {connect} from 'react-redux'
import * as sessionActionCreator from '../redux/actions/sessionActions'

export default class Footer extends Component {

  render() {
    let {username} = this.props.session
    let style = {
      height: 'auto',
      position: 'absolute',
      bottom: 0,
      paddingTop: 30,
      paddingBottom: 30,
      color: 'white',
      backgroundColor: 'white',
      marginTop: 280,
      width: '100%'
    }

    let userField = username ? ` (${username})` : ''
    return (
      <div style={style}>
        <div className="container" style={{maxWidth: 1000}}>
          <div className="row">
            <div className="col-md-3 col-sm-4 col-xs-7">
              <h3>Adresse</h3>
              <p>Romerike Markiseservice AS<br />
                Nannestadvegen 510<br />
                2032 MAURA
              </p>
              <p style={{paddingTop: 4}}><i className="fa fa-phone"/>&nbsp; +47 63 99 95 32 <br/>
              <i className="fa fa-envelope"/>&nbsp; <a href="mailto:post@romerike-markise.no">post@romerike-markise.no</a></p>
            </div>
            <div className="col-md-3 col-sm-4 col-xs-5">
              <h3>Kontortid</h3>
              <p>Mandag-fredag: 0900-1600</p>
              <h3>Telefonbetjening</h3>
              <p>Mandag-fredag: 0800-2000<br />
                Lørdag: 1000-1400</p>
            </div>
            <div className="col-md-6 col-sm-4 hidden-xs" style={{paddingTop: 20}}>
              <MapWrapper height={143} zoom={7} />
            </div>
          </div>
        </div>
      </div>
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


