import React from 'react';
import PhotoBig from './../photo/PhotoBig.jsx';
import BigHeadline from './../text/BigHeadline.jsx';
import ProductItem from './ProductItem.jsx';
import Router from 'react-router';
let Link = Router.Link;

export default class Interior extends React.Component {

  render() {
    return (
      <div className="row">
        <ProductItem title="Rullegardiner" description="" src="image/p_rullegardin.png"/>
        <ProductItem title="Persienner" description="" src="image/p_persienne_inne.png"/>
        <ProductItem title="Lamellgardiner" description="" src="image/p_lamellgardin.png"/>
        <ProductItem title="Plissé"
                     description="Et elegant og eksklusivt alternativ til den tradisjonelle rullegardinen."
                     src="image/p_plisse.png"/>
        <ProductItem title="Duette"
                     description="Dekorativt produkt med bikakestruktur som gir høy isoleringseffekt. Spesielt egnet for vinduer med avvikende form, med en eksklusiv kolleksjon av farger, mønster og design."
                     src="image/p_duette.png"/>
      </div>
    );
  }
}





