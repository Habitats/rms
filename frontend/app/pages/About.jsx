import React from 'react';
import AboutText from './../components/AboutText.jsx';

export default class About extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row box">
          <AboutText />
        </div>
      </div>
    );
  }
}

