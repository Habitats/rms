import React from 'react';
import ReferencesText from './../components/ReferencesText.jsx';
import Projects from './../components/Projects.jsx';

export default class References extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="box">
          <ReferencesText />
        </div>
        <div className="box col-md-12">
          <Projects />
        </div>
      </div>
    );
  }
}

