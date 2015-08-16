import React from 'react';
import FeatureItem from './FeatureItem.jsx';

export default class Features extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <FeatureItem icon="fa-cogs" title="Lang erfaring"
                       description="Med over 30 års erfaring stiller vi med kompetanse på høyeste nivå. "/>
        </div>
        <div className="col-md-4">
          <FeatureItem icon="fa-heart" title="Trygghet for kunden"
                       description="Vi sørger for din trygghet gjennom tett oppfølging og service."/>
        </div>
        <div className="col-md-4">
          <FeatureItem icon="fa-star" title="Smarte løsninger"
                       description="Skreddersydde og varige løsninger med prosjektering og rådgiving i etter dine behov."/>
        </div>
      </div>
    );
  }
}

