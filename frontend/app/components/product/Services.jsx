import React from 'react'
import PhotoBig from './../photo/PhotoBig.jsx'
import BigHeadline from './../text/BigHeadline.jsx'
import ProductItem from './ProductItem.jsx'

export default class Services extends React.Component {

  render() {
    return (
      <div className="row">
        <ProductItem title="Service-arbeid og vedlikehold"
                     description="I tillegg til å montere nye produkter tar vi også vare på de gamle. Enten det er en røket snor, eller renovering av gamle anleggsbygg, stiller vi ekspertise over hele planet."
                     src="/image/p_service_vedlikehold.png"
        />
      </div>
    )
  }
}





