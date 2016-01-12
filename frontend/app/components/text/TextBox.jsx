import React, {Component, PropTypes} from 'react'

export default class TextBox extends Component {

  render() {
    let {children} = this.props
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2">
          {children}
        </div>
      </div>
    )
  }
}

TextBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
