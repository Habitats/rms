import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {pushPath} from 'redux-simple-router'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Photo from './../components/photo/Photo.jsx'
import Left from './../components/Left.jsx'
import Right from './../components/Right.jsx'
import Box from './../components/Box.jsx'
import SimpleLabel from './../components/text/SimpleLabel.jsx'
import * as generalActionCreators from '../redux/actions/generalActions'

export default class ProjectAdd extends Component {

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
    this.setState({images: event.target.value.split(',')})
  }

  onSelect(src) {
    let chosenImages = this.state.chosenImages
    if (chosenImages.has(src)) {
      chosenImages.delete(src)
    } else {
      let image = this.props.images.find(i => i.src === src)
      chosenImages.set(src, image)
    }
    this.setState({chosenImages: chosenImages})
  }

  isValid() {
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
        images: this.state.chosenImages
      }))
      this.props.dispatch(pushPath('/prosjekt'))
    } else {
      this.setState({error: 'Fyll ut alle felt og velg noen bilder!'})
    }
  }

  render() {
    let chosenImages = []
    for (let i of this.state.chosenImages.values()) {
      chosenImages.push(<SimpleLabel text={i.name}/>)
    }
    let images = this.props.images.map(i => (
      <Photo size={'low'}
             className="col-lg-3 col-md-3 col-sm-4 col-xs-6"
             height={100}
             onClick={this.onSelect.bind(this)}
             selected={this.state.chosenImages.has(i.src)}
             src={i.src}
             margin={15}
      />
    ))
    let error = <div>{this.state.error}</div>
    return (
      <div>
        <Left>
          <Box>
            <form className="form">
              <div className="form-group">
                <label>Valgte bilder</label>
                {chosenImages}
              </div>
            </form>
          </Box>
        </Left>
        <Right>
          <Box>
            <BigHeadline big="Legg til ny" small="Prosjekt"/>

            <form className="form">
              <div className="form-group">
                <label>Tittel</label>
                <input className="form-control" onChange={this.handleTitleChange.bind(this)} placeholder="Prosjekttittel" type="text"/>
              </div>
              <div className="form-group">
                <label>Beskrivelse</label>
                <textarea className="form-control" onChange={this.handleDescriptionChange.bind(this)}
                          placeholder="Skriv en prosjektbeskrivelse her." rows="5"/>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" onClick={this.onSave.bind(this)} type="submit">Lagre prosjekt</button>
              </div>
            </form>
            {error}
            <BigHeadline big="Velg bilder"/>
            <div className="row">
              {images}
            </div>
          </Box>
        </Right>
      </div>
    )
  }
}

ProjectAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
  images: PropTypes.array,
  projects: PropTypes.array
}

export default connect(state => ({
  images: state.general.images,
  projects: state.general.projects
}))(ProjectAdd)