import React, {Component, PropTypes} from 'react'
import Link from '../Link.jsx'

export default class BigHeadline extends Component {

  render() {
    let {small, big} = this.props
    let style = {
      marginTop: 50
    }
    let bigStyle = {
      fontWeight: 700,
      paddingBottom: 0,
      paddingTop: 10,
      color: '#2D2D2D'
    }
    let smallStyle = {
      color: '#777777',
      fontWeight: 200
    }
    return (
      <div className="row">
        <div className="col-lg-12 text-center" style={style}>
          <h5 style={smallStyle}>
            {small}
          </h5>
          <h1 style={bigStyle}>{big}</h1>
          <hr style={{marginBottom: 70,marginTop: 50}}/>
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
