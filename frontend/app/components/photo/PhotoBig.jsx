import React from 'react';

export default class PhotoBig extends React.Component {

  render() {
    return (
      <div>
        <div className="col-md-8">
          <img className="img-responsive" src="http://placehold.it/750x500" alt=""/>
        </div>

        <div className="col-md-4">
          <h3>Beskrivelse</h3>

          <p>{this.props.description}</p>

          <h3>Detaljer</h3>
          <ul>
            <li>Lorem Ipsum</li>
            <li>Dolor Sit Amet</li>
            <li>Consectetur</li>
            <li>Adipiscing Elit</li>
          </ul>
        </div>
      </div>
    );
  }
}


