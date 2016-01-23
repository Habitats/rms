import React, {Component, PropTypes} from 'react'
import Link from './Link.jsx'
import MapWrapper from './../components/map/MapWrapper.jsx'
import * as sessionActionCreator from '../redux/actions/sessionActions'
import * as V from '../vars'
import Radium from 'radium'

class Footer extends Component {

  render() {
    let style = {
      footer: {
        '@media only screen and (max-width: 767px)': {
          height: V.FOOTER_HEIGHT_XS,
          boxShadow: '0 0 35px 3px rgba(0, 0, 0, 0.16)',
          background: 'white'
        },
        '@media only screen and (min-width: 768px)': {
          height: V.FOOTER_HEIGHT_SM,
          backgroundColor: 'white'
        },
        position: 'absolute',
        bottom: 0,
        paddingTop: 30,
        paddingBottom: 30,
        width: '100%'
      },
      text: {
        '@media only screen and (max-width: 767px)': {
          textAlign: 'center',
        }
      },
      map: {
        '@media only screen and (max-width: 767px)': {
          textAlign: 'center'
        },
        '@media only screen and (min-width: 768px)': {
          marginTop: 3,
          textAlign: 'right',
        },
      }
    }

    let info = {
      address: (
        <div>
          <h3>Adresse</h3>
          <p>Romerike Markiseservice AS<br />
            Nannestadvegen 510<br />
            2032 MAURA
          </p>
          <p style={{paddingTop: 4}}><i className="fa fa-phone"/>+47 63 99 95 32 <br/>
            <i className="fa fa-envelope"/><a href="mailto:post@romerike-markise.no">post@romerike-markise.no</a></p>
        </div>
      ),
      phone: (
        <div>
          <h3>Kontortid</h3>
          <p>Mandag-fredag: 0900-1600</p>
          <h3>Telefonbetjening</h3>
          <p>Mandag-fredag: 0800-2000<br />
            Lørdag: 1000-1400</p>
        </div>
      ),
      map: (
        <div>
          <MapWrapper height={143} zoom={7}/>
          <div style={style.map}>
            <Link to="login">Login</Link>
          </div>
        </div>
      )
    }
    return (
      <div style={style.footer} id="footer">
        <div className="container" style={{maxWidth: 1000}}>
          <div className="row">
            <div className="hidden-xs">
              <div className="col-md-3 col-sm-4">
                {info.address}
              </div>
              <div className="col-md-3 col-sm-4">
                {info.phone}
              </div>
              <div className="col-md-6 col-sm-4" style={{paddingTop: 20}}>
                {info.map}
              </div>
            </div>
            <div className="visible-xs">
              <div style={style.text}>
                <div className="col-xs-12">
                  {info.address}
                </div>
                <div className="col-xs-12">
                  {info.phone}
                </div>
                <div className="col-xs-12">
                  {info.map}
                </div>
              </div>
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

export default Radium(Footer)

