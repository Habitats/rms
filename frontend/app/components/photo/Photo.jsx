import React from 'react';
import EventListener from '../../util/EventListener.js';

export default class Photo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {toggled: true, backdrop: '', backdropPhoto: ''};
  }

  handleEscapeKeyDown(event) {
    if ((event.key === 'Escape' || event.keyCode === 27) && !this.state.toggled) {
      event.stopPropagation();
      event.preventDefault();
      this.toggle();
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }

  toggle() {
    if (this.state.toggled) {
      this.addKeyListener();
      this.setState({toggled: false, backdrop: 'overlay', backdropPhoto: 'overlay-photo'});
    } else {
      this.removeListener();
      this.setState({toggled: true, backdrop: '', backdropPhoto: ''});
    }
  }

  removeListener() {
    if (this.onWindowKeyDownListener) {
      this.onWindowKeyDownListener.remove();
    }
  }

  addKeyListener() {
    this.onWindowKeyDownListener = EventListener.listen(window, 'keydown', this.handleEscapeKeyDown.bind(this));
  }

  render() {
    let src = this.props.src;
    let height = this.props.height;
    let width = this.props.width;
    let className = this.props.className + ' photo-container-wrapper ' + this.state.classes;
    let style = {
      background: 'url(' + src + ') no-repeat center center',
      backgroundSize: 'cover !important',
      height: height,
      width: width
    };
    let bigImg = this.state.backdropPhoto.length > 0 ? <img src={src}/> : '';
    return (
      <div>
        <div className={className}>
          <div style={style} className="photo-container" onClick={this.toggle.bind(this)}/>
        </div>
        <div className={this.state.backdrop} onClick={this.toggle.bind(this)}></div>
        <div className={this.state.backdropPhoto} onClick={this.toggle.bind(this)}>
          <div className="overlay-photo-wrapper">
            {bigImg}
          </div>
        </div>
      </div>
    );
  }
}

Photo.defaultProps = {
  height: '100%',
  width: '100%'
};

Photo.propTypes = {
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  className: React.PropTypes.string,
  src: React.PropTypes.string.isRequired
};




