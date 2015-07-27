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
              <Photo src="http://localhost:8080/images/butikken_.jpg" height="415" className="col-md-12"/>
            </div>
            <div className="col-md-4 no-pad">
              <Photo src="http://localhost:8080/images/butikken_inne_1.jpg" height="200" className="col-md-12"/>
              <Photo src="http://localhost:8080/images/butikken_inne_2.jpg" height="200" className="col-md-12"/>
            </div>
          </div>
          <BigHeadline small="Om bedriften" big="Romerike Markiseservice AS"/>
          <AboutText />
        </div>
        <div className="box">
          <BigHeadline big="Samarbeidspartnere" small="Leverandører og forhandlere"/>

          <div className="row">
            <div className="col-md-4">
              <Photo clickable={false}
                     src="http://www.fordelskortet.no/gjovik/~/media/mediabiblioteket/gjovik-og-omegn-bbl/logo/kjells-markiser.jpg?h=112&la=nb-NO&w=521"
                     height="100px" crop={false}/>
            </div>
            <div className="col-md-4">
              <Photo clickable={false} src="https://ps-content.s3.amazonaws.com/company/462f03184ff399d11457b63d/logo/comp_426_logo.jpg"
                     height="100px" crop={false}/>
            </div>
            <div className="col-md-4">
              <Photo clickable={false} src="http://www.produktfakta.no/vental-hunter-douglas-project/bedrift-files/vental_logo.png"
                     height="100px" crop={false}/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Photo clickable={false}
                     src="http://www.fordelskortet.no/gjovik/~/media/mediabiblioteket/gjovik-og-omegn-bbl/logo/kjells-markiser.jpg?h=112&la=nb-NO&w=521"
                     height="100px" crop={false}/>
            </div>
            <div className="col-md-6">
              <Photo clickable={false} src="https://ps-content.s3.amazonaws.com/company/462f03184ff399d11457b63d/logo/comp_426_logo.jpg"
                     height="100px" crop={false}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

