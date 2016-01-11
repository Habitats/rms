import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Photo from './../components/photo/Photo.jsx'
import * as generalActionCreator from  '../redux/actions/generalActions'

export default class Private extends Component {

  componentDidMount() {
    this.props.dispatch(generalActionCreator.fetchPrivates())
  }

  render() {
    let photos = this.props.privates.map(i => (<Photo size={"low"} className="col-md-4 col-sm-6 col-lg-3" height={150} src={i.src}/>))

    return (
      <div className="container">
        <div className="box">
          <BigHeadline big="Privat" small="Våre referanser"/>

          <div className="row">
            {photos}
          </div>
        </div>
      </div>
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
