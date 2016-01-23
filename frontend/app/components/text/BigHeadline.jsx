import React, {Component, PropTypes} from 'react'
import Link from '../Link.jsx'
import Radium from 'radium'

class BigHeadline extends Component {

  render() {
    let {small, big} = this.props
    let style = {
      box: {
        '@media only screen and (max-width: 767px)': {
          marginTop: 20
        },
        '@media only screen and (min-width: 768px)': {
          marginTop: 50
        }
      },
      divider: {
        '@media only screen and (max-width: 767px)': {
          marginBottom: 30,
          marginTop: 20
        },
        '@media only screen and (min-width: 768px)': {
          marginBottom: 50,
          marginTop: 50
        },
        '@media only screen and (min-width: 992px)': {
          marginBottom: 70,
          marginTop: 70
        }
      },
      big: {
        fontWeight: 100,
        paddingBottom: 0,
        paddingTop: 10,
        color: '#2D2D2D'
      },
      small: {
        color: '#777777',
        fontWeight: 200
      }
    }
    return (
      <div className="row">
        <div className="col-lg-12 text-center" style={style.box}>
          <h5 style={style.small}>
            {small}
          </h5>
          <h1 style={style.big}>{big}</h1>
          <hr style={style.divider}/>
        </div>
      </div>
    )
  }
}

BigHeadline.defaultProps = {
  small: '',
  big: ''
}

BigHeadline.propTypes = {
  small: PropTypes.string,
  big: PropTypes.string
}

export default Radium(BigHeadline)
