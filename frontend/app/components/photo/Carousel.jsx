import React from 'react';
import Photo from './Photo.jsx';

export default class Carousel extends React.Component {

  render() {
    return (
      <div >
        <Photo src={this.props.src} height="500px">
          {this.props.children}
        </Photo>
      </div>
    );
  }
}

