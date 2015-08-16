import React from 'react';
import AboutText from './../components/text/AboutText.jsx';
import Photo from './../components/photo/Photo.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';

export default class About extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="box">
          <div className="row">
            <div className="col-md-8 no-pad">
              <Photo src="/images/butikken_.jpg" height="415" className="col-md-12"/>
            </div>
            <div className="col-md-4 no-pad">
              <Photo src="/images/butikken_inne_1.jpg" height="200" className="col-md-12"/>
              <Photo src="/images/butikken_inne_2.jpg" height="200" className="col-md-12"/>
            </div>
          </div>
          <BigHeadline small="Om bedriften" big="Romerike Markiseservice"/>

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
                <Photo clickable={false} src="/images/logo_vental.png" height={100} crop={false}/>
              </a>
            </div>
            <div className="col-md-6">
              <a href="http://www.kjellsmarkiser.no/" target="_blank">
                <Photo clickable={false} src="/images/logo_kjells.jpg" height={100} crop={false}/>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 text-center">
              <a href="http://www.solskjerming.no/" target="_blank">
                <Photo clickable={false} src="/images/medlem_logo.png" height={80} crop={false}/>
              </a>
              <i>Romerike Markiseservice er medlem av Norges Solskjermingsforbund</i>
            </div>
            <div className="col-md-6">
              <a href="http://vemaprodukter.no/" target="_blank">
                <Photo clickable={false} src="/images/logo_vema.png" height={100} crop={false}/>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <a href="https://www.somfy.no/" target="_blank">
                <Photo clickable={false} src="/images/logo_somfy.jpg" height={100} crop={false}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

