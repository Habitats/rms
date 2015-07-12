import React from 'react';

export default class BigHeadline extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="brand-before">
            <small>{this.props.small}</small>
          </h2>
          <h1 className="brand-name">{this.props.big}</h1>
          <hr/>
        </div>
      </div>
    );
  }
}

