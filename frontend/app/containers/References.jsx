import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';
import Projects from './../components/projects/Projects.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';

export default class References extends React.Component {

  render() {
    let newButton;
    if (this.props.session.admin) {
      newButton = (
        <div className="form-group">
          <Link to="/prosjekt/ny">
            <button className="btn btn-primary btn-block" type="submit">Legg til nytt prosjekt</button>
          </Link>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="box col-md-12">
          <BigHeadline big="Prosjekt" small="Våre referanser"/>
          {newButton}
          <Projects />
        </div>
      </div>
    );
  }
}

References.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  session: React.PropTypes.object.isRequired
};


export default connect(state => ({
  session: state.session
}))(References)