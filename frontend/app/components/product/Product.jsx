import React from 'react'
import PropTypes from 'prop-types'
import { useLoaderData, useNavigate } from 'react-router-dom'
import MiniGallery from './../photo/MiniGallery.jsx'
import MediumHeadline from './../text/MediumHeadline.jsx'
import Wysiwyg from './../text/Wysiwyg.jsx'
import Box from './../Box.jsx'
import ProductItems from './ProductItems.jsx'
import ContactForm from '../contact/ContactForm.jsx'
import {CONTENT_MAX_WIDTH} from '../../vars'

const Product = ({ linkTo }) => {
  const navigate = useNavigate()
  const { product, category, isAdmin } = useLoaderData()
  const {title, description, images, sub, id} = product

  const style = {
    desc: {
      maxWidth: CONTENT_MAX_WIDTH,
      margin: '0 auto',
      padding: 20
    }
  }

  const linkToParent = linkTo.split('/').slice(0, -1).join('/')

  const desc = (
    <div style={style.desc}>
      {isAdmin ?
       <Wysiwyg content={description} onSave={(p) => {
         // TODO: Implement save functionality using router actions
         console.log('Save product:', { ...product, description: p })
       }}/>
        :
       <div dangerouslySetInnerHTML={{__html: description}}/>}
      {isAdmin ? <button style={{marginTop: 5}} className="btn btn-default btn-block" type="submit"
                       onClick={() => navigate(`produkter/endre/${id}`)}>
        Admin </button> : null}
      <button style={{marginTop: 5}} className="btn btn-default btn-block" type="submit"
              onClick={() => navigate(linkToParent)}>Tilbake
      </button>
    </div>
  )

  return (
    <div>
      <Box>
        <MediumHeadline big={title} small={category}/>
        <MiniGallery images={images}/>
        {desc}
      </Box>

      {sub.length > 0 ? (
        <Box>
          <MediumHeadline big="Relaterte produkter"/>
          <ProductItems products={sub} parentRoute={linkTo}/>
        </Box>
      ) : null}

      <Box>
        <ContactForm/>
      </Box>
    </div>
  )
}

Product.propTypes = {
  linkTo: PropTypes.string.isRequired
}

export default Product