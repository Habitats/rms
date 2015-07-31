import React from 'react';
import Marty from 'marty';
import BigHeadline from './../components/text/BigHeadline.jsx';
import Photo from './../components/photo/Photo.jsx';

export default class Private extends React.Component {

  render() {
    let photos = [];
    for (let i = 0; i < 100; i++) {
      let index = parseInt(Math.random() * 5) + 1;
      let img = 'http://localhost:8080/images/refpriv_kunde_' + index + '.jpg';

      photos.push(
        <Photo src={img} height="150" className="col-md-4 col-sm-6 col-lg-3"/>
      );
    }
    return (
      <div className="container">
        <div className="box">
          <div className="row">
            <Photo src="http://localhost:8080/images/refpriv_kunde_5.jpg" height="415" className="col-md-12"/>
          </div>
          <BigHeadline big="Privat" small="Kunden i sentrum"/>

          <div className="row">
            <p>Sollyset er viktig for oss. Det gir oss energi og lyst på livet. Solen tiner opp frosne vinterkropper, men lyset og varmen må
              vi
              også kunne temme.</p>

            <p>Varmen ønsker vi på varme sommerdager å holde ute fra huset og vi trenger steder med skygge ute. Ønske om å skjerme for
              direkte
              sol på møbler og TV-skjermen kan også være et ønske. Med våre markiser dekker du alle disse behovene.</p>

            <p>Markisene kan være med på å understreke husets arkitektur ved å følge fasadens linjeføring og fargebruk. Vår store og
              eksklusive
              kolleksjon av duker og farger gir mange muligheter. Våre salgskonsulenter har flere års erfaring og bistår gjerne med råd om
              løsninger og produktvalg. Vi besøker deg uforpliktende og gir råd og pris.</p>
          </div>
        </div>

        <div className="box">
          <BigHeadline big="Galleri"/>
          <div className="row">
            {photos}
          </div>
        </div>
      </div>
    );
  }
}

export default Marty.createContainer(Private, {
  listenTo: 'projectStore',
  fetch: {
    projects() {
      return this.app.projectStore.getProjects();
    }
  }
});


