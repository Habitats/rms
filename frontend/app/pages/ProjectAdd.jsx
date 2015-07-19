import React from 'react';
import Marty from 'marty';
import BigHeadline from './../components/text/BigHeadline.jsx';

export default class ProjectAdd extends React.Component {

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }

  handleImagesChange(event) {
    this.setState({img: event.target.value.split(',')});
  }

  onSave(e) {
    e.preventDefault();
    this.app.projectActionCreators.save({
      id: this.props.id,
      title: this.state.title,
      description: this.state.description,
      img: this.state.img
    });
  }

  render() {
    return (
      <div className="container">
        <div className="box col-md-12">
          <div>
            <BigHeadline small="Prosjekt" big="Legg til ny"/>

            <h3>Tittel</h3>
            <input type="text" onChange={this.handleTitleChange.bind(this)}/>

            <h3>Beskrivelse</h3>
            <input type="text" onChange={this.handleDescriptionChange.bind(this)}/>

            <h3>Bilder</h3>
            <input type="text" onChange={this.handleImagesChange.bind(this)}/>
          </div>
          <div>
            <button className="btn btn-default" onClick={this.onSave.bind(this)}>Lagre</button>
            <hr/>
          </div>
        </div>
      </div>
    );
  }
}

export default Marty.createContainer(ProjectAdd, {
  listenTo: 'projectStore',
  fetch: {
    id() {
      return this.app.projectStore.getProjects().length + 1;
    }
  }
});


