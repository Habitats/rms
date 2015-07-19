import React from 'react';
import WelcomeText from './../components/text/WelcomeText.jsx';
import Carousel from './../components/photo/Carousel.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';

export default class Welcome extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="box">
          <Carousel img="http://www.pic2014.com/wp-content/uploads/2014-nice-cat-picture.jpg"/>
          <BigHeadline small="Velkommen til" big="Romerike Markiseservice AS"/>
        </div>
        <div className="box">
          <WelcomeText />
        </div>
      </div>
    );
  }
}

