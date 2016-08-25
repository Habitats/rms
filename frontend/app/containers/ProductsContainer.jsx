import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {replacePath} from 'react-router-redux'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Menu from './../components/menu/Menu.jsx'
import ProductItems from '../components/product/ProductItems.jsx'
import Left from './../components/Left.jsx'
import Right from './../components/Right.jsx'
import Box from './../components/Box.jsx'
import * as productActionCreators from './../redux/actions/productActions'
import NotFound from './NotFound.jsx'
import Link from '../components/Link.jsx'

class ProductsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mql: window.matchMedia('only screen and (max-width: 767px)'),
      mqlm: window.matchMedia('only screen and (max-width: 991px)')
    }
    this.mounted = false
    this.handleMediaChange = () => {
      if (this.mounted) {
        this.setState({small: this.state.mql.matches})
        this.setState({med: this.state.mqlm.matches})
      }
    }
  }

  componentWillMount() {
    this.props.dispatch(productActionCreators.fetchProducts())
  }

  componentWillMount() {
    this.mounted = true
    this.state.mql.addListener(this.handleMediaChange)
    this.state.mqlm.addListener(this.handleMediaChange)
    if (Object.keys(this.props.categories).length === 0) {
      this.props.dispatch(productActionCreators.fetchProducts())
    }
  }

  componentDidMount() {
    this.handleMediaChange()
  }

  componentWillUnmount() {
    this.mounted = false
    this.state.mql.removeListener(this.handleMediaChange)
    this.state.mqlm.removeListener(this.handleMediaChange)
  }

  render() {
    let {categories, params, children, session:{admin}} = this.props
    let {small, med} = this.state
    if (!categories.hasOwnProperty('sub')) {
      // not ready yet
      return null
    }
    let addProduct = admin ?
                     <div className="form-group">
                       <Link to="/produkter/ny">
                         <button className="btn btn-default btn-block" type="submit">Legg til nytt produkt</button>
                       </Link>
                     </div> : null

    let catBig = <ProductItems products={this.props.categories.sub.slice(0, med ? 1 : 2)} height={small ? 200 : med ? 320 : 270}
                               className="col-md-6 col-sm-12 col-xs-12" parentRoute={`/produkter`}/>
    let catSmall = <ProductItems products={this.props.categories.sub.slice(med ? 1 : 2, 5)} height={small ? 200 : med ? 230 : 170}
                                 className="col-md-4 col-sm-6 col-xs-12" parentRoute={`/produkter`}/>
    let content = (!params.categoryId && !params.productId) ?
                  <Box>
                    <BigHeadline big={categories.title}/>
                    <div className="row">
                      {catBig}
                      {catSmall}
                    </div>
                    {addProduct}
                  </Box>
      : children
    if (content) {
      return (
        <div>
          <div className="hidden-xs">
            <Left>
              <Menu categories={categories} active={params.subId || params.productId || params.categoryId} linkTo={'/produkter'}/>
            </Left>

            <Right>
              {content}
            </Right>
          </div>
          <div className="visible-xs">
            {content}
          </div>
        </div>
      )
    } else {
      return <NotFound />
    }
  }
}

ProductsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.element,
  params: PropTypes.shape({
    categoryId: PropTypes.string,
    productId: PropTypes.string
  }),
  categories: PropTypes.object.isRequired
}

export default connect(state => ({
  categories: state.products,
  session: state.session
}))(ProductsContainer)
