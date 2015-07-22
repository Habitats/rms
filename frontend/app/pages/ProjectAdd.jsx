import React from 'react';
import Marty from 'marty';
import BigHeadline from './../components/text/BigHeadline.jsx';
import Photo from './../components/photo/Photo.jsx';

export default class ProjectAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({chosenImages: new Map()});
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }

  handleImagesChange(event) {
    this.setState({img: event.target.value.split(',')});
  }

  onSelect(url) {
    let chosenImages = this.state.chosenImages;
    if (chosenImages.has(url)) {
      chosenImages.delete(url);
    } else {
      let image = this.props.images.find(i => i.url === url);
      chosenImages.set(url, image);
    }
    this.setState({chosenImages: chosenImages});
  }

  onSave(e) {
    e.preventDefault();
    let id = this.props.projects.length + 1;
    this.app.projectActionCreators.save({
      id: id,
      title: this.state.title,
      description: this.state.description,
      img: this.state.chosenImages
    });
  }

  render() {
    let images = this.props.images.map(i => (<Photo src={i.url} height="100" className="col-md-3" onClick={this.onSelect.bind(this)}/>));
    let chosenImages = [];
    for (let i of this.state.chosenImages.values()) {
      chosenImages.push(<div className="hide-overflow">- {i.name}</div>);
    }
    return (
      <div className="container">
        <div className="row box">
          <div className="col-md-12">
            <BigHeadline small="Prosjekt" big="Legg til ny"/>
          </div>

          <div className="col-md-8">
            <form className="form">
              <div className="form-group">
                <label for="title" class="col-md-2 control-label">Tittel</label>

                <input className="form-control" id="title" type="text" onChange={this.handleTitleChange.bind(this)}
                       placeholder="Prosjekttittel"/>
              </div>
              <div className="form-group">
                <label for="description" class="col-md-2 control-label">Beskrivelse</label>

              <textarea className="form-control" id="description" onChange={this.handleDescriptionChange.bind(this)}
                        placeholder="Skriv en prosjektbeskrivelse her." rows="7"/>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={this.onSave.bind(this)}>Lagre prosjekt</button>
              </div>
            </form>
          </div>
          <div className="col-md-4">
            <form className="form">
              <div className="form-group">
                <label for="description" class="col-md-2 control-label">Valgte bilder</label>
                {chosenImages}
              </div>
            </form>
          </div>
        </div>
        <div className="row box">
          <div className="col-md-12">
            <BigHeadline small="" big="Velg bilder"/>
          </div>
          {images}
        </div>
      </div>
    );
  }
}

export default Marty.createContainer(ProjectAdd, {
  listenTo: 'projectStore',
  fetch: {
    projects() {
      return this.app.projectStore.getProjects();
    },
    images() {
      return this.app.projectStore.getImages();
    }
  }
});


