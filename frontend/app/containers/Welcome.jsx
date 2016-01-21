import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Link from './../components/Link.jsx'
import Carousel from './../components/photo/Carousel.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import MediumHeadline from './../components/text/MediumHeadline.jsx'
import Features from './../components/feature/Features.jsx'
import PhotoBig from './../components/photo/PhotoBig.jsx'
import TextBox from './../components/text/TextBox.jsx'
import Box from './../components/Box.jsx'
import ProductItem from './../components/product/ProductItem.jsx'
import * as productActionCreators from './../redux/actions/productActions'

export default class Welcome extends Component {

  componentWillMount() {
    if (Object.keys(this.props.categories).length === 0) {
      this.props.dispatch(productActionCreators.fetchProducts())
    }
  }

  content() {
    return (
      <div>
        <BigHeadline big="Profesjonell solskjerming" small="Romerike Markiseservice"/>
        <TextBox >
          <p> Romerike Markiseservice er en ledende og profesjonell totalleverandør av solskjermingssystemer med kunden i sentrum.</p>

          <p> Med Øvre Romerike og Oslo som våre primære kjerneområder, leverer vi et bredt spekter av solskjermingsløsninger til både
            privat- og bedriftsmarkedet.</p>

          <p>Skulle du ha noen spørsmål, kan du enten sende en forespørsel gjennom vårt <Link to="/kontakt">kontaktskjema</Link>, eller
            ringe
            oss direkte på <em>+47 63 99 95 32</em>.
            Øvrig kontaktinformasjon er tilgjengelig på våre <Link to="/kontakt">kontaktsider</Link>.
          </p>
        </TextBox>
      </div>
    )
  }

  categories() {
    let rootCategories = this.props.categories.sub.map(c => <ProductItem key={`${c.id}`} product={c} height={150}
                                                                         className="col-xs-3"
                                                                         linkTo={`/produkter/${c.id}`}/>)
    return rootCategories
  }

  render() {
    let images = [
      {src: '/image/carousel,c1.jpg', title: 'nice image'},
      {src: '/image/carousel,c2.jpg', title: 'imagege image'},
      {src: '/image/carousel,c3.jpg', title: 'oløøøø image'},
      {src: '/image/carousel,c4.jpg', title: 'nice image'}
    ]
    return (
      <div>
        <Box>
          <Carousel images={images}/>
          <div className="row">
            <MediumHeadline big={'Profesjonell solskjerming'}/>
            {this.props.categories.hasOwnProperty('sub') ? this.categories() : null}
          </div>
        </Box>

        <Box>
          <Features />
        </Box>
      </div>
    )
  }
}

Welcome.propTypes = {
  categories: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(state => ({
  categories: state.products,
  images: state.images
}))(Welcome)
