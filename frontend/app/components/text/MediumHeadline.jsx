import React, {Component, PropTypes} from "react";
import Radium from "radium";
import {HEADING_SMALL, HEADING_BIG} from "../../colors";
import Link from "../Link.jsx";

class MediumHeadline extends Component {

  render() {
    let {small, big, to} = this.props
    let style = {
      box: {
        '@media only screen and (max-width: 767px)': {
          marginTop: 10
        },
        '@media only screen and (min-width: 768px)': {
          marginTop: 30
        }
      },
      divider: {
        '@media only screen and (max-width: 767px)': {
          marginBottom: 20,
          marginTop: 15
        },
        '@media only screen and (min-width: 768px)': {
          marginBottom: 40,
          marginTop: 30
        }
      },
      big: {
        '@media only screen and (max-width: 767px)': {
          paddingTop: 0
        },
        '@media only screen and (min-width: 768px)': {
          paddingTop: 20
        },
        paddingBottom: 0,
        paddingTop: 20,
        color: HEADING_BIG
      },
      small: {
        '@media only screen and (max-width: 767px)': {
          marginBottom: -10,
        },
        '@media only screen and (min-width: 768px)': {
          marginBottom: -20,
        },
        color: HEADING_SMALL
      }
    }
    return (
      <div className="row">
        <div className="col-lg-12 text-center" style={style.box}>
          <h5 style={style.small}>
            {to ? <Link to={to}>{small}</Link> : small}
          </h5>
          <h2 style={style.big}>{big}</h2>
          <hr style={style.divider}/>
        </div>
      </div>
    )
  }
}

MediumHeadline.defaultProps = {
  small: '',
  big: '',
  to: null
}

MediumHeadline.propTypes = {
  small: PropTypes.string,
  big: PropTypes.string,
  to: PropTypes.string
}

export default Radium(MediumHeadline)
