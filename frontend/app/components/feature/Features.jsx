import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FeatureItem from './FeatureItem.jsx'

const FeaturesWrapper = styled.div`
  width: 100%;
`

const HeadingRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Heading = styled.h2`
  margin-top: 30px;
  text-align: center;
`

const SubHeading = styled.h5`
  text-align: center;
`

const TextContainer = styled.div`
  margin-top: 30px;
  text-align: center;
`

const FeaturesRow = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
`

const FeatureColumn = styled.div`
  width: 100%;
  
  @media (min-width: 768px) {
    width: 33.333%;
    padding: 0 15px;
  }
`

const Features = () => {
  return (
    <FeaturesWrapper>
      <HeadingRow className="row">
        <Heading>Profesjonell solskjerming</Heading>
        <TextContainer className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
          <SubHeading>Romerike Markiseservice er totalleverandør av profesjonelle solskjermingsløsninger over hele Østlandet.</SubHeading>
        </TextContainer>
      </HeadingRow>
      <FeaturesRow className="row">
        <FeatureColumn className="col-sm-4">
          <FeatureItem 
            description="Med over 30 års erfaring stiller vi med kompetanse på høyeste nivå." 
            icon="faGears"
            title="Lang erfaring"
          />
        </FeatureColumn>
        <FeatureColumn className="col-sm-4">
          <FeatureItem 
            description="Vi sørger for din trygghet gjennom tett oppfølging og service." 
            icon="faHeart"
            title="Trygghet for kunden"
          />
        </FeatureColumn>
        <FeatureColumn className="col-sm-4">
          <FeatureItem 
            description="Skreddersydde og varige løsninger med prosjektering og rådgiving etter dine behov." 
            icon="faStar"
            title="Smarte løsninger"
          />
        </FeatureColumn>
      </FeaturesRow>
    </FeaturesWrapper>
  )
}

export default Features

