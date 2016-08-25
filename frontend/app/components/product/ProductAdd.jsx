import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import MediumHeadline from './../text/MediumHeadline.jsx'
import Box from './../Box.jsx'
import * as productActions from '../../redux/actions/productActions'
import Select from 'react-select'
import {CONTENT_MAX_WIDTH} from '../../vars'

class ProductAdd extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      description: '',
      title: '',
      id: null,
      error: '',
      edit: false,
      category: null
    })
    this.handleDescriptionChange = (e) => this.setState({description: e.target.value})
    this.handleTitleChange = (e) => this.setState({title: e.target.value})
    this.onSave = () => {
      if (this.isValid()) {
        let product = {
          id: this.state.edit ? this.state.id : -1,
          title: this.state.title,
          category: this.state.category,
          description: this.state.description,
          src: this.state.src || 'main.jpg',
          index: props.products.sub.flatMap(c => c.sub).length + 1
        }
        this.props.dispatch(productActions.save(product))
        this.props.dispatch(browserHistory.goBack())
      } else {
        this.setState({error: 'Velg tittel og kategori!'})
      }
    }
    this.onRemove = () => {
      this.props.dispatch(productActions.removeProduct(this.state.id))
      this.props.dispatch(browserHistory.push('/produkter'))
    }
    this.handleSelect = (category) => {
      this.setState({category: category.value})
    }
  }

  componentWillMount() {
    this.props.dispatch(productActions.fetchProducts())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.products && nextProps.products.hasOwnProperty('sub')) {
      let flat = this.flatten(nextProps.products)
      let product = flat.find(c => c.id === nextProps.params.productId || c.title === nextProps.params.productId)
      if (product) {
        this.setState({... product, edit: true})
      } else {
        this.setState({error: this.state.edit ? 'Invalid ID' : null})
      }
    }
  }

  flatten(products) {
    let flat = (p) => {
      return p.sub.length === 0 ? [p] : [p].concat(p.sub.flatMap(s => flat(s)))
    }
    return flat(products)
  }

  isValid() {
    let uniqueId = this.state.edit || !this.flatten(this.props.products).map(p => p.id).includes(this.state.id)
    return uniqueId && this.state.title.length > 0
  }

  render() {
    let {dispatch, products} = this.props
    if (!products.hasOwnProperty('sub')) {
      return null
    }
    let {error, title, description, id, category, edit} = this.state
    let flatProducts = this.flatten(products)
    let options = flatProducts.map(p => ({value: p.id, label: p.title}))
    let style = {
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
              <input className="form-control" onChange={this.handleTitleChange} placeholder="Produkttittel" type="text"
                     value={title}/>
            </div>
            <div className="form-group">
              <label>Beskrivelse</label>
              <textarea className="form-control" onChange={this.handleDescriptionChange}
                        placeholder="Skriv en produktbeskrivelse her." rows="15" value={description}/>
            </div>
          </form>
          <Select style={{marginBottom: 15}}
                  value={category}
                  options={options}
                  onChange={this.handleSelect}
          />
          <div>{error}</div>
          <div className="row">
            <div className={`col-xs-${id ? 4 : 6}`}>
              <button className="btn btn-primary btn-block" onClick={() => dispatch(browserHistory.goBack())}>Tilbake</button>
            </div>
            {id ? <div className={`col-xs-${id ? 4 : 6}`}>
              <button className="btn btn-primary btn-block" onClick={this.onRemove}>Slett</button>
            </div> : null }
            <div className={`col-xs-${id ? 4 : 6}`}>
              <button className="btn btn-primary btn-block" onClick={this.onSave}>Lagre</button>
            </div>
          </div>
        </div>
        <pre style={{maxWidth: 700, margin: '0 auto'}}> {JSON.stringify(this.state, undefined, 1)}} </pre>
      </Box>
    )
  }
}

Array.prototype.flatMap = function (lambda) {
  return Array.prototype.concat.apply([], this.map(lambda));
}

ProductAdd.defaultProps = {
  params: {id: null}
}

ProductAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
  products: PropTypes.array,
  params: PropTypes.shape({id: PropTypes.string})
}

export default connect(state => ({
  products: state.products
}))(ProductAdd)