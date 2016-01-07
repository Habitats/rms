import React from 'react'
import { connect } from 'react-redux'
import {pushPath} from 'redux-simple-router'
import BigHeadline from './../text/BigHeadline.jsx'
import Photo from './../photo/Photo.jsx'
import * as generalActionCreators from '../../redux/actions/generalActions'

export default class ProjectAdd extends React.Component {

  constructor(props) {
    super(props)
    this.state = ({
      chosenImages: new Map(),
      description: '',
      title: '',
      error: ''
    })
  }

  componentDidMount() {
    this.props.dispatch(generalActionCreators.fetchImages())
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value})
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value})
  }

  handleImagesChange(event) {
    this.setState({img: event.target.value.split(',')})
  }

  onSelect(url) {
    let chosenImages = this.state.chosenImages
    if (chosenImages.has(url)) {
      chosenImages.delete(url)
    } else {
      let image = this.props.images.find(i => i.url === url)
      chosenImages.set(url, image)
    }
    this.setState({chosenImages: chosenImages})
  }

  isValid(){
    return this.state.chosenImages.size > 0 && this.state.title.length > 0 && this.state.description.length > 0
  }

  onSave(e) {
    e.preventDefault()
    if (this.isValid()) {
      let id = this.props.projects.length + 1
      this.props.dispatch(generalActionCreators.save({
        id: id,
        title: this.state.title,
        description: this.state.description,
        img: this.state.chosenImages
      }))
      this.props.dispatch(pushPath('/prosjekt'))
    } else {
      this.setState({error: 'Fyll ut alle felt og velg noen bilder!'})
    }
  }

  render() {
    let images = this.props.images.map(i => (<Photo size={'low'} className="col-md-3" height={100} onClick={this.onSelect.bind(this)} src={i.url}/>))
    let chosenImages = []
    for (let i of this.state.chosenImages.values()) {
      chosenImages.push(<div className="hide-overflow">- {i.name}</div>)
    }
    let error = <div>{this.state.error}</div>
    return (
      <div className="container">
        <div className="row box">
          <div className="col-md-12">
            <BigHeadline big="Legg til ny" small="Prosjekt"/>
          </div>

          <div className="col-md-8">
            <form className="form">
              <div className="form-group">
                <label>Tittel</label>
                <input className="form-control" onChange={this.handleTitleChange.bind(this)} placeholder="Prosjekttittel" type="text"/>
              </div>
              <div className="form-group">
                <label>Beskrivelse</label>

                <textarea className="form-control" onChange={this.handleDescriptionChange.bind(this)}
                          placeholder="Skriv en prosjektbeskrivelse her." rows="7"/>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-lg btn-block" onClick={this.onSave.bind(this)} type="submit">Lagre prosjekt</button>
              </div>
            </form>
            {error}
          </div>
          <div className="col-md-4">
            <form className="form">
              <div className="form-group">
                <label>Valgte bilder</label>
                {chosenImages}
              </div>
            </form>
          </div>
        </div>
        <div className="row box">
          <div className="col-md-12">
            <BigHeadline big="Velg bilder"/>
          </div>
          {images}
        </div>
      </div>
    )
  }
}

ProjectAdd.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  images: React.PropTypes.array,
  projects: React.PropTypes.array
}

export default connect(state => ({
  images: state.general.images,
  projects: state.general.projects
}))(ProjectAdd)