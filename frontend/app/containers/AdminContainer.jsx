import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import MediumHeadline from './../components/text/MediumHeadline.jsx'
import Box from './../components/Box.jsx'
import * as generalActions from '../redux/actions/GeneralActions'

class AdminContainer extends Component {

  constructor(props, context) {
    super(props, context)
    this.invalidate = () => {
      props.dispatch(generalActions.invalidateImageCache())
    }
  }

  render() {
    return (
      <div>
        <Box>
          <MediumHeadline big={"Admin"}/>

          <div className="col-xs-12">
            <button className="btn btn-primary btn-block" onClick={this.invalidate}>Invalider bilde-cache</button>
          </div>
        </Box>
      </div>
    )
  }
}

export default connect(state => ({}))(AdminContainer)
