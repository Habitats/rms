import React, {Component, PropTypes} from 'react'

export default class MediumHeadline extends Component {

  render() {

    let bigStyle = {
      fontWeight: 700,
      paddingBottom: 0,
      paddingTop: 20,
      color: '#2D2D2D'
    }
    return (
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 style={bigStyle}>{this.props.big}</h2>
          <hr style={{marginBottom: 50,marginTop: 40}}/>
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
