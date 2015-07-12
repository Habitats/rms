import React from 'react';
import Router from 'react-router';
let Link = Router.Link;

export default class ReferencesText extends React.Component {

  render() {
    return (
      <div>
        <p>På denne siden vil du se en liste over noen av referansene våre som omhandler større prosjekter som vi har utført. </p>

        <p>Om du trykker deg inn på en av referansene så vil du komme til et galleri med mer informasjon rundt referansen, samt flere
          bilder. </p>

        <p><Link to="referencesList">Trykk her</Link> for en liste over flere av våre referanser. </p>

      </div>
    );
  }
}

