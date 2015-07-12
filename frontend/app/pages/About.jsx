import React from 'react';
import AboutText from './../components/text/AboutText.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';

export default class About extends React.Component {

  render() {
    return (
      <div className="container box">
        <BigHeadline small="Om bedriften" big="Romerike Markiseservice A/S"/>
        <AboutText />
      </div>
    );
  }
}

