import React from 'react';
import Marty from 'marty';
import BigHeadline from './../components/text/BigHeadline.jsx';

export default class Private extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="box">
          <BigHeadline big="Privat"/>
        </div>
      </div>
    );
  }
}

export default Marty.createContainer(Private, {
  listenTo: 'projectStore',
  fetch: {
    projects() {
      return this.app.projectStore.getProjects();
    }
  }
});


