import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Photo from './../components/photo/Photo.jsx'
import Box from './../components/Box.jsx'
import * as generalActionCreator from  '../redux/actions/generalActions'

export default class Private extends Component {

  componentDidMount() {
    this.props.dispatch(generalActionCreator.fetchPrivates())
  }

  render() {
    let photos = this.props.privates.map(i => (
      <Photo size={"low"} className="col-lg-3 col-md-3 col-sm-4 col-xs-6" height={150} src={i.src}/>))

    return (
      <Box>
        <BigHeadline big="Privat" small="Våre referanser"/>
        <div className="row">
          {photos}
        </div>
      </Box>
    )
  }
}

Private.propTypes = {
  dispatch: PropTypes.func.isRequired,
  privates: PropTypes.array.isRequired
}

export default connect(state => ({
  privates: state.general.privates
}))(Private)
