import React from 'react';
import AboutText from './../components/text/AboutText.jsx';
import Carousel from './../components/photo/Carousel.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';

export default class About extends React.Component {

  render() {
    return (
      <div className="container box">
        <BigHeadline small="Om bedriften" big="Romerike Markiseservice A/S"/>

        <div className="row">
          <div className="col-md-8">
            <Carousel img="http://localhost:8080/images/butikken_.jpg"/>
          </div>
          <div className="col-md-4">
            <Carousel img="http://localhost:8080/images/butikken_inne_1.jpg"/>
            <Carousel img="http://localhost:8080/images/butikken_inne_2.jpg"/>
          </div>
        </div>
        <AboutText />
      </div>
    );
  }
}

