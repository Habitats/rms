import React from 'react';
import PhotoBig from './../photo/PhotoBig.jsx';
import BigHeadline from './../text/BigHeadline.jsx';
import Router from 'react-router';
let Link = Router.Link;

export default class ProductCategory extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <Link to={this.props.linkTo}>
            <PhotoBig description={this.props.title} height={250} src={this.props.src}/>
          </Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}
ProductCategory.defaultProps = {};

ProductCategory.propTypes = {};





