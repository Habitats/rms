import React from 'react';

export default class Carousel extends React.Component {

  render() {
    return (
      <div >
        <img className="img-responsive img-full" src={this.props.img} alt=""/>
      </div>
    );
  }
}

