import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Link from './../components/Link.jsx'
import Projects from './../components/projects/Projects.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Box from './../components/Box.jsx'
import * as generalActionCreators from './../redux/actions/generalActions'

export default class ProjectsContainer extends Component {

  componentWillMount() {
    if (this.props.projects.length === 0) {
      this.props.dispatch(generalActionCreators.fetchProjects())
    }
  }

  render() {
    let {session: {admin}, projects} = this.props
    let newButton = admin ?
                    <div className="form-group">
                      <Link to="/referanser/ny">
                        <button className="btn btn-default btn-block" type="submit">Legg til nytt prosjekt</button>
                      </Link>
                    </div> : null
    return (
      <Box>
        <BigHeadline big="Referanser"/>
        <Projects projects={projects}/>
        {newButton}
      </Box>
    )
  }
}

ProjectsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired
}

export default connect(state => ({
  session: state.session,
  projects: state.general.projects
}))(ProjectsContainer)

