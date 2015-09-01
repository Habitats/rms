import React from 'react';
import Marty from 'marty';
import PhotoBig from './../photo/PhotoBig.jsx';
import BigHeadline from './../text/BigHeadline.jsx';
import ProductItem from './ProductItem.jsx';
import Router from 'react-router';
let Link = Router.Link;

export default class Exterior extends React.Component {

  render() {
    return (
      <div className="row">
        <ProductItem title="Markiser"
                     description="Markiser kommer i mange former og fasonger. Vi fører alt fra større terrassemarkiser, til enkle vindusmarkiser."
                     src="image/p_markise.png"/>
        <ProductItem title="Persienner" description="Utvendige persienner er både smidige og robuste."
                     src="image/p_persienne.png"/>
        <ProductItem title="Screen"
                     description="Utvendig rullegardig - et stiltrent alternativt til persienne. Lett å holde rent, og tar minimalt med plass."
                     src="image/p_rullegardin.png"/>
        <ProductItem title="Varme og belysning"
                     description="Forleng den trivelige utesesongen med en varmelampe. Våre varmelamper er kortbølgede, og når maksimal varme på kun få sekunder."
                     src="image/p_varme.png"/>
      </div>
    );
  }
}

