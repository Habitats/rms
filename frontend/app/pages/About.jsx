import AboutText from './../components/text/AboutText.jsx';
import Photo from './../components/photo/Photo.jsx';
import React from 'react';
import BigHeadline from './../components/text/BigHeadline.jsx';

export default class About extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="box">
          <div className="row">
            <div className="col-md-8 no-pad">
              <Photo className="col-md-12" height={415} src="/images/butikken_.jpg"/>
            </div>
            <div className="col-md-4 no-pad">
              <Photo className="col-md-12" height={200} src="/images/butikken_inne_1.jpg"/>
              <Photo className="col-md-12" height={200} src="/images/butikken_inne_2.jpg"/>
            </div>
          </div>
          <BigHeadline big="Romerike Markiseservice" small="Om bedriften"/>

          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <AboutText />
            </div>
          </div>
        </div>

        <div className="box">
          <BigHeadline big="Samarbeidspartnere" small="Leverandører og forhandlere"/>

          <div className="row">
            <div className="col-md-6">
              <a href="http://www.vental.no/" target="_blank">
                <Photo clickable={false} crop={false} height={100} src="/images/logo_vental.png"/>
              </a>
            </div>
            <div className="col-md-6">
              <a href="http://www.kjellsmarkiser.no/" target="_blank">
                <Photo clickable={false} crop={false} height={100} src="/images/logo_kjells.jpg"/>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 text-center">
              <a href="http://www.solskjerming.no/" target="_blank">
                <Photo clickable={false} crop={false} height={80} src="/images/medlem_logo.png"/>
              </a>
              <i>Romerike Markiseservice er medlem av Norges Solskjermingsforbund</i>
            </div>
            <div className="col-md-6">
              <a href="http://vemaprodukter.no/" target="_blank">
                <Photo clickable={false} crop={false} height={100} src="/images/logo_vema.png"/>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <a href="https://www.somfy.no/" target="_blank">
                <Photo clickable={false} crop={false} height={100} src="/images/logo_somfy.jpg"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
