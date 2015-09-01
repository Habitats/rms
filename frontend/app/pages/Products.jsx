import React from 'react';
import Marty from 'marty';
import BigHeadline from './../components/text/BigHeadline.jsx';
import PhotoBig from './../components/photo/PhotoBig.jsx';
import ProductItem from './../components/product/ProductItem.jsx';
import Menu from './../components/menu/Menu.jsx';
import Category from './../components/menu/Category.jsx';
import MenuItem from './../components/menu/MenuItem.jsx';
import Router from 'react-router';
let Link = Router.Link;
let RouteHandler = Router.RouteHandler;

export default class Products extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="box">
          <div className="col-md-12 col-sm-12">
            <BigHeadline big={this.props.category} small="Våre produkter og tjenester"/>
          </div>
          <div className="row">
            <div className="col-md-2 col-sm-3 col-xs-4">
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
                <Category linkTo="products_other" title="Diverse">
                  <MenuItem title="Automatikk"/>
                  <MenuItem title="Vindusfilm"/>
                  <MenuItem title="Garasjeporter"/>
                  <MenuItem title="Sprosser"/>
                </Category>
                <Category linkTo="products_services" title="Tjenester">
                  <MenuItem title="Service-arbeid"/>
                </Category>
              </Menu>
            </div>
            <div className="col-md-10 col-sm-9 col-xs-8">
              <RouteHandler/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Marty.createContainer(Products, {
  listenTo: 'projectStore',
  fetch: {
    category() {
      return this.app.projectStore.getSelectedCategory();
    }
  }
});

Products.defaultProps = {
  category: 'Eksteriør'
}

Products.propTypes = {
  private: React.PropTypes.string.isRequired
};
