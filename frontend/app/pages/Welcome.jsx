import React from 'react';
import WelcomeText from './../components/text/WelcomeText.jsx';
import Carousel from './../components/photo/Carousel.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';
import Features from './../components/feature/Features.jsx';
import Login from './Login.jsx';

export default class Welcome extends React.Component {

  render() {
    return (
      <div>

        <div className="container">
          <div className="box">

            <Carousel src="image/refpriv_kunde_5.jpg">
            </Carousel>
            <BigHeadline big="Profesjonell solskjerming" small="Romerike Markiseservice"/>

            <div className="row">
              <div className="col-md-8 col-md-offset-2">
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

