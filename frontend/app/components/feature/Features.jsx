import React from 'react'
import PropTypes from 'prop-types'
import FeatureItem from './FeatureItem.jsx'

const Features = () => {
  const style = {
    text: {
      marginTop: 30,
      textAlign: 'center',
    },
    heading: {
      marginTop: 30,
      textAlign: 'center'
    },
    features: {
      marginTop: 40
    }
  }

  return (
    <div>
      <div className="row">
        <h2 style={style.heading}>Profesjonell solskjerming</h2>
        <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2" style={style.text}>
          <h5>Romerike Markiseservice er totalleverandør av profesjonelle solskjermingsløsninger over hele Østlandet.</h5>
        </div>
      </div>
      <div className="row" style={style.features}>
        <div className="col-sm-4">
          <FeatureItem description="Med over 30 års erfaring stiller vi med kompetanse på høyeste nivå." icon="faGears"
                       title="Lang erfaring"/>
        </div>
        <div className="col-sm-4">
          <FeatureItem description="Vi sørger for din trygghet gjennom tett oppfølging og service." icon="faHeart"
                       title="Trygghet for kunden"/>
        </div>
        <div className="col-sm-4">
          <FeatureItem description="Skreddersydde og varige løsninger med prosjektering og rådgiving etter dine behov." icon="faStar"
                       title="Smarte løsninger"/>
        </div>
      </div>
    </div>
  )
}

export default Features

