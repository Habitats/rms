import React, {Component} from 'react'
import PropTypes from 'prop-types'
import MiniGallery from './../photo/MiniGallery.jsx'
import {connect} from 'react-redux'
import {useNavigate} from 'react-router-dom'  // Replace browserHistory import
import MediumHeadline from './../text/MediumHeadline.jsx'
import Wysiwyg from './../text/Wysiwyg.jsx'
import Box from './../Box.jsx'
import * as ProductActions from '../../redux/actions/ProductActions'
import ProductItems from './ProductItems.jsx'
import ContactForm from '../contact/ContactForm.jsx'
import {CONTENT_MAX_WIDTH} from '../../vars'

// Add navigation wrapper
function withNavigation(Component) {
  return props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
}

class Product extends Component {
  render() {
    const {product, category, dispatch, session: {admin}, linkTo, navigate} = this.props  // Add navigate to props destructuring
    const {title, description, images, sub, id} = product
    // ... rest of the component stays the same until the navigation parts ...

    const desc = (
      <div style={style.desc}>
        {admin ?
         <Wysiwyg content={description} onSave={(p) => dispatch(ProductActions.save({... product, description: p}))}/>
          :
         <div dangerouslySetInnerHTML={{__html: description}}/>}
        {admin ? <button style={{marginTop: 5}} className="btn btn-default btn-block" type="submit"
                         onClick={() => navigate(`produkter/endre/${id}`)}>  {/* Update browserHistory.push to navigate */}
          Admin </button> : null}
        <button style={{marginTop: 5}} className="btn btn-default btn-block" type="submit"
                onClick={() => navigate(linkToParent)}>Tilbake  {/* Update browserHistory.push to navigate */}
        </button>
      </div>
    )
    // ... rest of the render method stays the same ...
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    sub: PropTypes.array.isRequired,
  }),
  linkTo: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.shape({admin: PropTypes.bool.isRequired}),
  navigate: PropTypes.func  // Add navigate to propTypes
}

// Update the export to include the navigation wrapper
export default connect(state => ({
  session: state.session
}))(withNavigation(Product))