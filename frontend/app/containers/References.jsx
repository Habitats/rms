import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import Projects from './../components/projects/Projects.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import * as generalActionCreators from './../redux/actions/GeneralActionCreators'

export default class References extends React.Component {

  componentWillMount(){
    this.props.dispatch(generalActionCreators.fetchProjects())
  }

  render() {
    let {session: {admin}, projects} = this.props
    let newButton = admin ?
                    <div className="form-group">
                      <Link to="/prosjekt/ny">
                        <button className="btn btn-primary btn-block" type="submit">Legg til nytt prosjekt</button>
                      </Link>
                    </div> : null
    return (
      <div className="container">
        <div className="box col-md-12">
          <BigHeadline big="Prosjekt" small="Våre referanser"/>
          {newButton}
          <Projects projects={projects}/>
        </div>
      </div>
    )
  }
}

References.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  session: React.PropTypes.object.isRequired
}

export default connect(state => ({
  session: state.session,
  projects: state.general.projects
}))(References)

