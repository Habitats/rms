import React, {Component, PropTypes} from 'react'
import Photo from './../photo/Photo.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import Radium from 'radium'

class ProjectListItem extends Component {

  render() {
    const {project: {title, images, id}} = this.props
    const style = {
      box: {
        '@media only screen and (max-width: 767px)': {
          marginBottom: 10,
          height: 220
        },
        '@media only screen and (min-width: 768px)': {
          marginBottom: 25,
          height: 250
        },
        '@media only screen and (min-width: 992px)': {
          marginBottom: 25,
          height: 250
        }
      }
    }
    return (
      <div className="col-xs-12 col-sm-6 col-md-4" style={style.box}>
        <Photo linkTo={`/referanser/${id}`} src={images[0].src}>
          <HeadlineOverlay text={title}/>
        </Photo>
      </div>
    )
  }
}

ProjectListItem.propTypes = {
  project: PropTypes.object.isRequired
}

export default Radium(ProjectListItem)
