import React from 'react';
import BigHeadline from './../components/text/BigHeadline.jsx';
//import Router from 'react-router';
//let Link = Router.Link;

export default class Products extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="box col-md-12">
          <BigHeadline big="Produkter" small="Våre produkter og tjenester"/>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

