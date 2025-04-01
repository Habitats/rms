import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BigHeadline from './text/BigHeadline.jsx'
import Box from './Box.jsx'

export default class NotFound extends Component {

  render() {
    return (
      <Box>
        <BigHeadline big="Denne siden finnes ikke." small="404"/>
      </Box>
    )
  }
}
