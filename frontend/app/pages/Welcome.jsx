import React from 'react';
import WelcomeText from './../components/text/WelcomeText.jsx';
import Carousel from './../components/photo/Carousel.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';
import Features from './../components/feature/Features.jsx';
import Photo from './../components/photo/Photo.jsx';

export default class Welcome extends React.Component {

  render() {
    return (
      <div>

        <div className="container">
          <div className="box">

            <Carousel src="/images/refpriv_kunde_5.jpg">
              <div className="brand" to="welcome">Profesjonell solskjerming</div>
              <div className="address-bar">Nannestadvegen 510 2032 Maura</div>
            </Carousel>
            <BigHeadline small="Velkommen til" big="Romerike Markiseservice"/>

            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <WelcomeText />
              </div>

            </div>
          </div>
          <div className="box">
            <Features />
          </div>
        </div>
      </div>
    );
  }
}

