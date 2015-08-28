import React from 'react';
import BigHeadline from './../components/text/BigHeadline.jsx';
import PhotoBig from './../components/photo/PhotoBig.jsx';
import ProductCategory from './../components/product/ProductCategory.jsx';
import ProductItem from './../components/product/ProductItem.jsx';
import Menu from './../components/menu/Menu.jsx';
import Category from './../components/menu/Category.jsx';
import MenuItem from './../components/menu/MenuItem.jsx';
import Router from 'react-router';
let Link = Router.Link;

export default class Products extends React.Component {

  render() {
    let categories = [
      (
        <ProductCategory linkTo="products_ext" title="Eksteriør" src="image/products_ext.jpg">
          <ProductItem title="Markiser"
                       description="Markiser kommer i mange former og fasonger. Vi fører alt fra større terrassemarkiser, til enkle vindusmarkiser."/>
          <ProductItem title="Persienner" description="Utvendige persienner er både smidige og robuste."/>
          <ProductItem title="Screen"
                       description="Utvendig rullegardig - et stiltrent alternativt til persienne. Lett å holde rent, og tar minimalt med plass."/>
          <ProductItem title="Varme og belysning"
                       description="Forleng den trivelige utesesongen med en varmelampe. Våre varmelamper er kortbølgede, og når maksimal varme på kun få sekunder."/>
        </ProductCategory>
      ), (
        <ProductCategory linkTo="products_int" title="Interiør" src="image/products_int.jpg">
          <ProductItem title="Rullegardiner" description=""/>
          <ProductItem title="Persienner" description=""/>
          <ProductItem title="Lamellgardiner" description=""/>
          <ProductItem title="Plissé"
                       description="Et elegant og eksklusivt alternativ til den tradisjonelle rullegardinen."/>
          <ProductItem title="Duette"
                       description="Dekorativt produkt med bikakestruktur som gir høy isoleringseffekt. Spesielt egnet for vinduer med avvikende form, med en eksklusiv kolleksjon av farger, mønster og design."/>
        </ProductCategory>
      ), (
        <ProductCategory linkTo="products_div" title="Diverse" src="image/products_div.jpg">
          <ProductItem title="Automatikk og styringssystemer" description=""/>
          <ProductItem title="Vindusfilm"
                       description="En solskjermingsløsning som både holder solen og varmen utenfor. Vår smidigste solskjermingsløsning."/>
          <ProductItem title="Garasjeporter" description=""/>
          <ProductItem title="Sprosser" description="Sett et personlig preg på vinduene."/>
        </ProductCategory>
      ), (
        <ProductCategory linkTo="products_services" title="Tjenester" src="image/products_int.jpg">
          <ProductItem title="Service-arbeid og vedlikehold"
                       description="I tillegg til å montere nye produkter tar vi også vare på de gamle. Enten det er en røket snor, eller renovering av gamle anleggsbygg, stiller vi ekspertise over hele planet."/>
        </ProductCategory>
      )
    ];
    return (
      <div className="container">
        <div className="box">
          <div className="col-md-12">
            <BigHeadline big="Produkter" small="Våre produkter og tjenester"/>
          </div>
          <div className="row">
            <div className="col-md-2">
              <Menu>
                <Category linkTo="products_ext" title="Eksteriør">
                  <MenuItem title="Markiser"/>
                  <MenuItem title="Persienner"/>
                  <MenuItem title="Screen"/>
                  <MenuItem title="Varme og belysning"/>
                </Category>
                <Category linkTo="products_int" title="Interiør">
                  <MenuItem title="Rullegardiner"/>
                  <MenuItem title="Persienner"/>
                  <MenuItem title="Lamellgardiner"/>
                  <MenuItem title="Plissé"/>
                  <MenuItem title="Duetter"/>
                </Category>
                <Category linkTo="products_div" title="Diverse">
                  <MenuItem title="Automatikk"/>
                  <MenuItem title="Vindusfilm"/>
                  <MenuItem title="Garasjeporter"/>
                  <MenuItem title="Sprosser"/>
                </Category>
                <Category linkTo="products_ext" title="Tjenester">
                  <MenuItem title="Service-arbeid"/>
                </Category>
              </Menu>
            </div>
            <div className="col-md-10">
              {categories}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

