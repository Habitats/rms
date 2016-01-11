import React, {Component, PropTypes} from 'react'
import Box from './Box.jsx'

export default class BoxRight extends Component {

  render() {
    let {children} = this.props
    let style = {marginLeft: 205}
    return (
      <div style={style}>
        <Box>
          {children}
        </Box>
      </div>
    )
  }
}

Box.propTypes = {
  children: PropTypes.object.isRequired
}
