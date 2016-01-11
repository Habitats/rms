import React, {Component, PropTypes} from 'react'
import BigHeadline from './../components/text/BigHeadline.jsx'

export default class NotFound extends Component {

  render() {
    return (
        <div className="container">
          <div className="box">
            <BigHeadline big="Denne siden finnes ikke." small="404"/>
        </div>
      </div>
    )
  }
}
