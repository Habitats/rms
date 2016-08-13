import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import BigHeadline from './../text/BigHeadline.jsx'
import MiniGallery from './../photo/MiniGallery.jsx'
import Box from './../Box.jsx'

export default class Project extends Component {

  render() {
    let {project, session: {admin}, dispatch} = this.props
    return (
      <Box>
        <BigHeadline big={project.title} small="Prosjekt"/>
        <div className="row">
          <div className="col-xs-12">
            <MiniGallery images={project.images} orientation={'horizontal'} height={400} thumbHeight={100}/>
            {admin ? <button style={{marginTop: 5}} className="btn btn-default btn-block" type="submit"
                             onClick={() => dispatch(browserHistory.push(`referanser/endre/${project.id}`))}>
              Endre </button> : null}
          </div>
        </div>
      </Box>
    )
  }
}

Project.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired
  }),
  selected: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.shape({admin: PropTypes.bool.isRequired})
}

export default connect(state => ({
  session: state.session
}))(Project)
