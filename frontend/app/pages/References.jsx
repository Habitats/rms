import React from 'react';
import ReferencesText from './../components/text/ReferencesText.jsx';
import Projects from './../components/Projects.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';

export default class References extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="box col-md-12">
          <BigHeadline small="Våre referanser" big="Prosjekt" />
          <ReferencesText />
          <Projects />
        </div>
      </div>
    );
  }
}

