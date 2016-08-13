import React, {Component, PropTypes} from "react";
import BigHeadline from "./../components/text/BigHeadline.jsx";
import Box from "./../components/Box.jsx";

export default class NotFound extends Component {

  render() {
    return (
      <Box>
        <BigHeadline big="Denne siden finnes ikke." small="404"/>
      </Box>
    )
  }
}
