import React from 'react';

export default class References extends React.Component {

  render() {
    return (
      <div>
        <div className="col-lg-12">
          <h3 className="page-header">Bilder</h3>
        </div>

        < div
          className="col-sm-3 col-xs-6">
          <a href="#">
            <img className="img-responsive portfolio-item" src="http://placehold.it/500x300" alt=""/>
          </a>

        </div>

        <div className="col-sm-3 col-xs-6">
          <a href="#">
            <img className="img-responsive portfolio-item" src="http://placehold.it/500x300" alt=""/>
          </a>
        </div>

        <div
          className="col-sm-3 col-xs-6">
          <a href="#">
            <img className="img-responsive portfolio-item" src="http://placehold.it/500x300" alt=""/>
          </a>

        </div>

        <div className="col-sm-3 col-xs-6">
          <a href="#">
            <img className="img-responsive portfolio-item" src="http://placehold.it/500x300" alt=""/>
          </a>
        </div>
      </div>
    );
  }
}

