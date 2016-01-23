import React, {Component, PropTypes} from 'react'
import Radium from 'radium'

class MediumHeadline extends Component {

  render() {

    let style = {
      divider: {
        '@media only screen and (max-width: 767px)': {
          marginBottom: 20,
          marginTop: 15
        },
        '@media only screen and (min-width: 768px)': {
          marginBottom: 50,
          marginTop: 40
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
        color: '#2D2D2D'
      }
    }

    return (
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 style={style.big}>{this.props.big}</h2>
          <hr style={style.divider}/>
        </div>
      </div>
    )
  }
}

MediumHeadline.defaultProps = {
  small: '',
  big: ''
}

MediumHeadline.propTypes = {
  small: PropTypes.string,
  big: PropTypes.string
}

export default Radium(MediumHeadline)
