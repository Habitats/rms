import React, {Component, PropTypes} from 'react'
import Radium from 'radium'

class TextBox extends Component {

  render() {
    let {children} = this.props
    let style = {
      paddingBottom: 40,
      textAlign: 'justify',
      '@media only screen and (max-width: 767px)': {
        maxWidth: 435
      },
      '@media only screen and (min-width: 768px)': {
        maxWidth: 550
      },
      margin: '0 auto'
    }
    return (
      <div className="row">
        <div className="col-xs-12">
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

export default Radium(TextBox)
