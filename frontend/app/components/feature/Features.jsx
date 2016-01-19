import React, {Component, PropTypes} from 'react'
import FeatureItem from './FeatureItem.jsx'

export default class Features extends Component {

  render() {
    return (
      <div className="row" style={{marginTop: 20}}>
        <div className="col-sm-4">
          <FeatureItem description="Med over 30 års erfaring stiller vi med kompetanse på høyeste nivå. " icon="fa-cogs"
                       title="Lang erfaring"/>
        </div>
        <div className="col-sm-4">
          <FeatureItem description="Vi sørger for din trygghet gjennom tett oppfølging og service." icon="fa-heart"
                       title="Trygghet for kunden"/>
        </div>
        <div className="col-sm-4">
          <FeatureItem description="Skreddersydde og varige løsninger med prosjektering og rådgiving etter dine behov." icon="fa-star"
                       title="Smarte løsninger"/>
        </div>
      </div>
    )
  }
}

