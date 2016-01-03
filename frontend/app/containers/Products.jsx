import React from 'react'
import { connect } from 'react-redux'
import BigHeadline from './../components/text/BigHeadline.jsx'
import PhotoBig from './../components/photo/PhotoBig.jsx'
import ProductItem from './../components/product/ProductItem.jsx'
import Menu from './../components/menu/Menu.jsx'
import Category from './../components/menu/Category.jsx'
import MenuItem from './../components/menu/MenuItem.jsx'

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
                <Category linkTo="/produkter/eksterior" title="Eksteriør">
                  <MenuItem title="Markiser"/>
                  <MenuItem title="Persienner"/>
                  <MenuItem title="Screen"/>
                  <MenuItem title="Varme og belysning"/>
                </Category>
                <Category linkTo="/produkter/interior" title="Interiør">
                  <MenuItem title="Rullegardiner"/>
                  <MenuItem title="Persienner"/>
                  <MenuItem title="Lamellgardiner"/>
                  <MenuItem title="Plissé"/>
                  <MenuItem title="Duetter"/>
                </Category>
                <Category linkTo="/produkter/diverse" title="Diverse">
                  <MenuItem title="Automatikk"/>
                  <MenuItem title="Vindusfilm"/>
                  <MenuItem title="Garasjeporter"/>
                  <MenuItem title="Sprosser"/>
                </Category>
                <Category linkTo="/produkter/tjenester" title="Tjenester">
                  <MenuItem title="Prosjektering"/>
                  <MenuItem title="Service-arbeid"/>
                </Category>
              </Menu>
            </div>
            <div className="col-md-10 col-sm-9 col-xs-8">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Products.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  children: React.PropTypes.object.isRequired,
  category: React.PropTypes.string.isRequired,
}

export default connect(state => ({
  category: state.general.category
}))(Products)
