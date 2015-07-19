import React from 'react';
import Router from 'react-router';
let Link = Router.Link;

export default class ProductsText extends React.Component {

  render() {
    return (
      <div>
        <h1>Markiser</h1>

        <p>Sollyset er viktig for oss. Det gir oss energi og lyst på livet. Solen tiner opp frosne vinterkropper, men lyset og varmen må vi
          også kunne temme.</p>

        <p>Varmen ønsker vi på varme sommerdager å holde ute fra huset og vi trenger steder med skygge ute. Ønske om å skjerme for direkte
          sol på møbler og TV-skjermen kan også være et ønske. Med våre markiser dekker du alle disse behovene.</p>

        <p>Markisene kan være med på å understreke husets arkitektur ved å følge fasadens linjeføring og fargebruk. Vår store og eksklusive
          kolleksjon av duker og farger gir mange muligheter. Våre salgskonsulenter har flere års erfaring og bistår gjerne med råd om
          løsninger og produktvalg. Vi besøker deg uforpliktende og gir råd og pris.</p>
      </div>
    );
  }
}

