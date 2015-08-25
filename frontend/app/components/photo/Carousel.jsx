import React from 'react';
import Photo from './Photo.jsx';

export default class Carousel extends React.Component {

  render() {
    return (
      <div >
        <Photo height="500px" src={this.props.src}>
          {this.props.children}
        </Photo>
      </div>
    );
  }
}

Carousel.propTypes = {
  children: React.PropTypes.object,
  src: React.PropTypes.array.isRequired
};
