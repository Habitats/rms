import React, {Component, PropTypes} from 'react'
import Box from './Box.jsx'

export default class BoxLeft extends Component {

  render() {
    let {children} = this.props
    let style = {width: 190, paddingRight: 0}
    return (
      <div className="affix" style={style}>
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
