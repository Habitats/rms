import React, {Component, PropTypes} from 'react'

export default class MediumHeadline extends Component {

  render() {
    let style = {
      marginBottom: 10
    }
    return (
      <div className="row">
        <div className="col-lg-12" style={style}>
          <h3 className="brand-name">{this.props.big}</h3>
          <hr/>
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
