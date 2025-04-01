import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'
import MediumHeadline from '../text/MediumHeadline.jsx'
import Box from '../Box.jsx'
import Select from 'react-select'
import { CONTENT_MAX_WIDTH } from '../../vars'

const ProductAdd = ({ products, onSave, onRemove }) => {
  const navigate = useNavigate()
  const { productId } = useParams()
  const [state, setState] = useState({
    description: '',
    title: '',
    id: null,
    error: '',
    edit: false,
    category: null,
    src: 'main.jpg'
  })

  useEffect(() => {
    if (products && products.hasOwnProperty('sub')) {
      const flat = flatten(products)
      const product = flat.find(c => c.id === productId || c.title === productId)
      if (product) {
        setState(prev => ({ ...prev, ...product, edit: true }))
      } else {
        setState(prev => ({ ...prev, error: state.edit ? 'Invalid ID' : null }))
      }
    }
  }, [products, productId])

  const flatten = (products) => {
    const flat = (p) => {
      return p.sub.length === 0 ? [p] : [p].concat(p.sub.flatMap(s => flat(s)))
    }
    return flat(products)
  }

  const handleDescriptionChange = (e) => {
    setState(prev => ({ ...prev, description: e.target.value }))
  }

  const handleTitleChange = (e) => {
    setState(prev => ({ ...prev, title: e.target.value }))
  }

  const handleSelect = (category) => {
    setState(prev => ({ ...prev, category: category.value }))
  }

  const isValid = () => {
    const flatProducts = flatten(products)
    const uniqueId = state.edit || !flatProducts.map(p => p.id).includes(state.id)
    return uniqueId && state.title.length > 0
  }

  const handleSave = () => {
    if (isValid()) {
      const product = {
        id: state.edit ? state.id : -1,
        title: state.title,
        category: state.category,
        description: state.description,
        src: state.src,
        index: products.sub.flatMap(c => c.sub).length + 1
      }
      onSave(product)
      navigate(-1)
    } else {
      setState(prev => ({ ...prev, error: 'Velg tittel og kategori!' }))
    }
  }

  const handleRemove = () => {
    onRemove(state.id)
    navigate('/produkter')
  }

  if (!products.hasOwnProperty('sub')) {
    return null
  }

  const { error, title, description, id, category, edit } = state
  const flatProducts = flatten(products)
  const options = flatProducts.map(p => ({value: p.id, label: p.title}))
  const style = {
    box: {
      paddingBottom: 50,
      textAlign: 'justify',
      maxWidth: CONTENT_MAX_WIDTH,
      margin: '0 auto'
    }
  }

  return (
    <Box>
      <MediumHeadline big={edit ? 'Endre produkt' : 'Nytt produkt'}/>
      <div style={style.box}>
        <form className="form">
          <div className="form-group">
            <label>Tittel</label>
            <input 
              className="form-control" 
              onChange={handleTitleChange} 
              placeholder="Produkttittel" 
              type="text"
              value={title}
            />
          </div>
          <div className="form-group">
            <label>Beskrivelse</label>
            <textarea 
              className="form-control" 
              onChange={handleDescriptionChange}
              placeholder="Skriv en produktbeskrivelse her." 
              rows="15" 
              value={description}
            />
          </div>
        </form>
        <Select 
          style={{marginBottom: 15}}
          value={category}
          options={options}
          onChange={handleSelect}
        />
        <div>{error}</div>
        <div className="row">
          <div className={`col-xs-${id ? 4 : 6}`}>
            <button className="btn btn-primary btn-block" onClick={() => navigate(-1)}>Tilbake</button>
          </div>
          {id && (
            <div className={`col-xs-${id ? 4 : 6}`}>
              <button className="btn btn-primary btn-block" onClick={handleRemove}>Slett</button>
            </div>
          )}
          <div className={`col-xs-${id ? 4 : 6}`}>
            <button className="btn btn-primary btn-block" onClick={handleSave}>Lagre</button>
          </div>
        </div>
      </div>
      <pre style={{maxWidth: 700, margin: '0 auto'}}> {JSON.stringify(state, undefined, 1)} </pre>
    </Box>
  )
}

ProductAdd.propTypes = {
  products: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default ProductAdd