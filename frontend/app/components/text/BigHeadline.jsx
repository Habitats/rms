import React, {Component, PropTypes} from 'react'

export default class BigHeadline extends Component {

  render() {
    let style = {
      marginBottom: 30
    }
    return (
      <div className="row">
        <div className="col-lg-12 text-center" style={style}>
          <h2 className="brand-before">
            <small>{this.props.small}</small>
          </h2>
          <h1 className="brand-name">{this.props.big}</h1>
          <hr/>
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
