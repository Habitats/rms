import React, {Component, PropTypes} from 'react'
import Photo from './../photo/Photo.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'

export default class ProjectListItem extends Component {

  render() {
    let {project: {title, images, id}} = this.props
    return (
      <div className="col-md-6">
        <Photo linkTo={`/prosjekt/${id}/0`} height={250} src={images[0].src}>
          <HeadlineOverlay text={title}/>
        </Photo>
      </div>
    )
  }
}

ProjectListItem.propTypes = {
  project: PropTypes.object.isRequired
}

