import React from 'react';
import WelcomeText from './../components/text/WelcomeText.jsx';
import Carousel from './../components/photo/Carousel.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';

export default class Welcome extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="box">
          <Carousel />
          <BigHeadline small="Velkommen til" big="Romerike Markiseservice AS" />
        </div>
        <div className="box">
          <WelcomeText />
        </div>
      </div>
    );
  }
}

