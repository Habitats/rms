import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MiniGallery from '../photo/MiniGallery.jsx'
import MediumHeadline from '../text/MediumHeadline.jsx'
import Wysiwyg from '../text/Wysiwyg.jsx'
import Box from '../Box.jsx'
import ProductItems from './ProductItems.jsx'
import ContactForm from '../contact/ContactForm.jsx'
import { CONTENT_MAX_WIDTH } from '../../vars'

const DescriptionContainer = styled.div`
  padding-bottom: 50px;
  text-align: justify;
  max-width: ${CONTENT_MAX_WIDTH}px;
  margin: 0 auto;
`

const GalleryWrapper = styled.div`
  padding-bottom: 30px;
`

const ContactContainer = styled.div`
  max-width: ${CONTENT_MAX_WIDTH}px;
  margin: 0 auto;
  padding-bottom: 30px;
  padding-left: 15px;
  padding-right: 15px;
`

const Button = styled.button`
  margin-top: 5px;
`

const Product = ({ product, category, linkTo, isAdmin = false }) => {
  const navigate = useNavigate()
  const { title, description, images, sub, id } = product

  const linkToParent = linkTo.split('/').reverse().splice(1).reverse().join('/')
  const headline = <MediumHeadline big={title} small={category} to={linkToParent}/>
  const gal = (
    <GalleryWrapper>
      <MiniGallery images={images} orientation={'vertical'} height={350} />
    </GalleryWrapper>
  )
  
  const desc = (
    <DescriptionContainer>
      {isAdmin ? (
        <Wysiwyg 
          content={description} 
          onSave={(p) => {
            // Handle save without Redux
            console.log('Save product:', { ...product, description: p })
          }}
        />
      ) : (
        <div dangerouslySetInnerHTML={{__html: description}}/>
      )}
      {isAdmin && (
        <Button 
          className="btn btn-default btn-block" 
          type="submit"
          onClick={() => navigate(`produkter/endre/${id}`)}
        >
          Admin
        </Button>
      )}
      <Button 
        className="btn btn-default btn-block" 
        type="submit"
        onClick={() => navigate(linkToParent)}
      >
        Tilbake
      </Button>
    </DescriptionContainer>
  )

  const subCategories = sub && sub.length > 0 ? (
    <div className="row">
      <ProductItems products={product.sub} parentRoute={`/${linkTo}`}/>
    </div>
  ) : null

  const contact = sub.length === 0 ? (
    <Box>
      <MediumHeadline big={'Interessert?'}/>
      <div className="col-xs-12">
        <div className="row">
          <ContactContainer>
            <ContactForm subject={title}/>
          </ContactContainer>
        </div>
      </div>
    </Box>
  ) : null

  return (
    <div>
      {images.length > 0 ? (
        <div>
          <Box>
            {headline}
            {gal}
            {desc}
          </Box>
          {sub.length > 0 && (
            <Box>
              {subCategories}
            </Box>
          )}
        </div>
      ) : (
        <Box>
          {headline}
          {desc}
          {subCategories}
        </Box>
      )}
      {contact}
    </div>
  )
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
  isAdmin: PropTypes.bool
}

export default Product