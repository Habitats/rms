import React, {Component, PropTypes} from 'react'

export default class TextBox extends Component {

  render() {
    let {children} = this.props
    let style = {
      paddingBottom: 40
    }
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2">
          <div style={style}>
            {children}
          </div>
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
