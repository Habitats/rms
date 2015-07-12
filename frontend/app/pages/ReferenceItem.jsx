import React from 'react';
import Projects from './../components/Projects.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';
import PhotoBig from './../components/photo/PhotoBig.jsx';
import PhotoLine from './../components/photo/PhotoLine.jsx';

export default class ReferenceItem extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="box col-md-12">
          <div className="row">
            <BigHeadline small="Prosjekt" big="Nannestad VGS"/>
          </div>

          <div className="row">
            <PhotoBig
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim."
              details=""/>

          </div>
          <div className="row">
            <PhotoLine id="someId"/>
            <hr/>
          </div>
        </div>
      </div>
    );
  }
}

ReferenceItem.defaultProps = {
  title: 'Some project',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim.'
};


