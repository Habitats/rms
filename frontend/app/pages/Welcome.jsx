import React from 'react';
import WelcomeText from './../components/text/WelcomeText.jsx';
import Carousel from './../components/photo/Carousel.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';
import Features from './../components/feature/Features.jsx';

export default class Welcome extends React.Component {

  render() {
    return (
      <div>

        <div className="container">
          <div className="box">

            <Carousel src="http://www.pic2014.com/wp-content/uploads/2014-nice-cat-picture.jpg">
              <div className="brand" to="welcome">Profesjonell solskjerming</div>
              <div className="address-bar">Nannestadvegen 510 2032 Maura</div>
            </Carousel>
            <BigHeadline small="Velkommen til" big="Romerike Markiseservice AS"/>
            <WelcomeText />
          </div>
          <div className="box">
            <Features />
          </div>
        </div>
      </div>
    );
  }
}

