import React from 'react';
import PhotoBig from './../photo/PhotoBig.jsx';
import BigHeadline from './../text/BigHeadline.jsx';
import ProductItem from './ProductItem.jsx';

export default class Other extends React.Component {

  render() {
    return (
      <div className="row">
        <ProductItem title="Automatikk og styringssystemer" description="" src="/image/p_automatikk.png"/>
        <ProductItem title="Vindusfilm"
                     description="En solskjermingsløsning som både holder solen og varmen utenfor. Vår smidigste solskjermingsløsning."
                     src="/image/p_vindusfilm.png"/>
        <ProductItem title="Garasjeporter" description="" src="/image/p_garasjeport.png"/>
        <ProductItem title="Sprosser" description="Sett et personlig preg på vinduene." src="/image/p_sprosser.png"/>
      </div>
    );
  }
}





