import React from 'react';
import Marty from 'marty';
import BigHeadline from './../components/text/BigHeadline.jsx';
import Photo from './../components/photo/Photo.jsx';

export default class Private extends React.Component {

  render() {
    let photos = this.props.private.map(i => (<Photo src={i.url} height="150" className="col-md-4 col-sm-6 col-lg-3"/>));

    return (
      <div className="container">
        <div className="box">
          <BigHeadline big="Privat" small="Våre referanser"/>

          <div className="row">
            {photos}
          </div>
        </div>
      </div>
    );
  }
}

export default Marty.createContainer(Private, {
  listenTo: 'projectStore',
  fetch: {
    private() {
      return this.app.projectStore.getPrivate();
    }
  }
});


