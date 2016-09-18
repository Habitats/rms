import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import MediumHeadline from './../components/text/MediumHeadline.jsx'
import Photo from './../components/photo/Photo.jsx'
import Left from './../components/Left.jsx'
import Right from './../components/Right.jsx'
import Box from './../components/Box.jsx'
import SimpleLabel from './../components/text/SimpleLabel.jsx'
import * as generalActions from '../redux/actions/generalActions'

class ProjectAdd extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      chosenImages: new Map(),
      description: '',
      title: '',
      id: null,
      error: ''
    })
    this.setProject(this.props.params.id)
  }

  setProject(id) {
    if (this.props.projects.find(p => p.id === id)) {
      const project = this.props.projects.find(p => p.id === id)
      this.setState({
        description: project.description,
        title: project.title,
        id: project.id,
        chosenImages: new Map(project.images.map(i => [i.src, i]))
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setProject(nextProps.params.id)
  }

  componentWillMount() {
    this.props.dispatch(generalActions.fetchProjects())
    this.props.dispatch(generalActions.fetchImages())
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
    const chosenImages = this.state.chosenImages
    if (chosenImages.has(src)) {
      chosenImages.delete(src)
    } else {
      const image = this.props.images.find(i => i.src === src)
      chosenImages.set(src, image)
    }
    this.setState({chosenImages: chosenImages})
  }

  isValid() {
    return this.state.chosenImages.size > 0 && this.state.title.length > 0 && this.state.description.length > 0
  }

  onSave() {
    if (this.isValid()) {
      this.props.dispatch(generalActions.save({
        id: this.state.id || this.props.projects.map(p => parseInt(p.id)).reduce((a, b) => Math.max(a, b)) + 1,
        title: this.state.title,
        description: this.state.description,
        images: this.state.chosenImages
      }))
      this.props.dispatch(browserHistory.push('/referanser'))
    } else {
      this.setState({error: 'Fyll ut alle felt og velg noen bilder!'})
    }
  }

  onRemove() {
    this.props.dispatch(generalActions.removeProject(this.state.id))
    this.props.dispatch(browserHistory.push('/referanser'))
  }

  render() {
    const {projects, images, dispatch} = this.props
    const {chosenImages, error, title, description, id} = this.state

    const chosenLabels = Array.from(chosenImages.values()).map(i => <SimpleLabel key={i.src} text={i.title}/>)

    const usedImages = projects.length > 0 ? [... new Set(projects.filter(p => p.id !== id).map(p => p.images).reduce((a, b) => a.concat(b)).map(i => i.src))] : []
    const filteredImages = images.length > 0 ? [... new Set(images.filter(i => !usedImages.includes(i.src)))] : []
    const photos = filteredImages.map(i => (
      <div key={i.src} className="col-sm-3 col-xs-6" style={{padding: 0, margin: 0}}>
        <div className={'photo'} style={{marginBottom: 15, marginLeft: 15}}>
          <Photo size={'low'}
                 height={100}
                 onClick={() => this.onSelect(i.src)}
                 selected={chosenImages.has(i.src)}
                 src={i.src}
          />
        </div>
      </div>
    ))

    return (
      <div>
        <Left>
          <Box>
            <form className="form">
              <div className="form-group">
                <label>Valgte bilder</label>
                {chosenLabels}
              </div>
            </form>
          </Box>
        </Left>
        <Right>
          <Box>
            <MediumHeadline big={id ? 'Endre referanse' : 'Ny referanse'}/>

            <form className="form">
              <div className="form-group">
                <label>Tittel</label>
                <input className="form-control" onChange={this.handleTitleChange.bind(this)} placeholder="Prosjekttittel" type="text"
                       value={title}/>
              </div>
              <div className="form-group">
                <label>Beskrivelse</label>
                <textarea className="form-control" onChange={this.handleDescriptionChange.bind(this)}
                          placeholder="Skriv en prosjektbeskrivelse her." rows="5" value={description}/>
              </div>
            </form>
            <div>{error}</div>
            <MediumHeadline big="Velg bilder"/>
            <div className="row" style={{marginRight: 0}}>
              {photos}
            </div>
            <div className="row">
              <div className={`col-xs-${id ? 4 : 6}`}>
                <button className="btn btn-primary btn-block" onClick={() => dispatch(browserHistory.goBack())}>Tilbake</button>
              </div>
              {id ? <div className={`col-xs-${id ? 4 : 6}`}>
                <button className="btn btn-primary btn-block" onClick={this.onRemove.bind(this)}>Slett</button>
              </div> : null }
              <div className={`col-xs-${id ? 4 : 6}`}>
                <button className="btn btn-primary btn-block" onClick={this.onSave.bind(this)}>Lagre</button>
              </div>
            </div>
          </Box>
        </Right>
      </div>
    )
  }
}

ProjectAdd.defaultProps = {
  params: {id: null}
}

ProjectAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
  images: PropTypes.array,
  projects: PropTypes.array,
  params: PropTypes.shape({id: PropTypes.string})
}

export default connect(state => ({
  images: state.general.images,
  projects: state.general.projects
}))(ProjectAdd)