import React from 'react';
import AboutText from './../components/text/AboutText.jsx';
import Photo from './../components/photo/Photo.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';

export default class About extends React.Component {

  render() {
    return (
      <div className="container box">
        <BigHeadline small="Om bedriften" big="Romerike Markiseservice A/S"/>

        <div className="row">
          <div className="col-md-8 no-pad">
            <Photo src="http://localhost:8080/images/butikken_.jpg" height="415" className="col-md-12"/>
          </div>
          <div className="col-md-4 no-pad">
            <Photo src="http://localhost:8080/images/butikken_inne_1.jpg" height="200" className="col-md-12"/>
            <Photo src="http://localhost:8080/images/butikken_inne_2.jpg" height="200" className="col-md-12"/>
          </div>
        </div>
        <AboutText />
      </div>
    );
  }
}

