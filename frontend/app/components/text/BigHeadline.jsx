import React, {Component, PropTypes} from "react";
import Link from "../Link.jsx";
import Radium from "radium";
import {HEADING_SMALL, HEADING_BIG} from "../../colors";

class BigHeadline extends Component {

  render() {
    let {small, big, to} = this.props
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
        paddingBottom: 0,
        paddingTop: 10,
        color: HEADING_BIG
      },
      small: {
        color: HEADING_SMALL,
      }
    }
    return (
      <div className="row">
        <div className="col-lg-12 text-center" style={style.box}>
          <h5 style={style.small}>
            {to ? <Link to={to}>{small}</Link> : small}
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
  big: '',
  to: null
}

BigHeadline.propTypes = {
  small: PropTypes.string,
  big: PropTypes.string,
  to: PropTypes.string
}

export default Radium(BigHeadline)
