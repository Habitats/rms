import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Carousel from './../components/photo/Carousel.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Features from './../components/feature/Features.jsx'
import Box from './../components/Box.jsx'
import ProductItems from './../components/product/ProductItems.jsx'
import * as ProductActionCreators from '../redux/actions/ProductActions'
import Radium from 'radium'

class Welcome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mql: window.matchMedia('only screen and (max-width: 767px)')
    }
    this.mounted = false
    this.handleMediaChange = () => {
      if (this.mounted) {
        if (this.state.mql.matches) {
          this.setState({small: true})
        } else {
          this.setState({small: false})
        }
      }
    }
  }

  componentWillMount() {
    if (Object.keys(this.props.categories).length === 0) {
      this.props.dispatch(ProductActionCreators.fetchProducts())
    }
    this.mounted = true
    this.state.mql.addListener(this.handleMediaChange)
  }

  componentDidMount() {
    this.handleMediaChange()
  }

  componentWillUnmount() {
    this.mounted = false
    this.state.mql.removeListener(this.handleMediaChange)
  }

  render() {
    const {small} = this.state
    const images = [
      {src: 'image/carousel,c1.jpg'},
      {src: 'image/carousel,c2.jpg'},
      {src: 'image/carousel,c3.jpg'},
      {src: 'image/carousel,c4.jpg'},
      {src: 'image/carousel,c5.jpg'},
      {src: 'image/carousel,c6.jpg'},
      {src: 'image/carousel,c7.jpg'}
    ]

    const ready = this.props.categories.hasOwnProperty('sub')
    const catBig = ready ? <ProductItems products={this.props.categories.sub.slice(0, 2)} height={small ? 200 : 270}
                                         className="col-sm-6 col-xs-12" parentRoute={`/produkter`}/> : null
    const catSmall = ready ? <ProductItems products={this.props.categories.sub.slice(2, 5)} height={small ? 200 : 170}
                                           className="col-sm-4 col-xs-12" parentRoute={`/produkter`}/> : null
    return (
      <div>
        <Box>
          <Carousel images={images}/>
          <Features />
        </Box>

        <Box>
          <BigHeadline big={'Våre tjenester'}/>
          <div className="row">
            {catBig}
            {catSmall}
          </div>
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
}))(Radium(Welcome))
