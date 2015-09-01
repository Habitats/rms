import React from 'react';
import Marty from 'marty';
import Projects from './../components/projects/Projects.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';
import Router from 'react-router';

let Link = Router.Link;

export default class References extends React.Component {

  render() {
    let newButton;
    if (this.props.session.admin) {
      newButton = (
        <div className="form-group">
          <Link to="project_add">
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


export default Marty.createContainer(References, {
  listenTo: 'sessionStore',
  fetch: {
    session() {
      return this.app.sessionStore.getSession();
    }
  }
});

