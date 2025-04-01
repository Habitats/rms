import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const PhotoOverlay = ({ toggled: initialToggled, src }) => {
  const [state, setState] = useState({
    toggled: initialToggled
  });

  useEffect(() => {
    if (initialToggled) {
      setState(prev => ({ ...prev, toggled: initialToggled }));
    }
  }, [initialToggled]);

  useEffect(() => {
    const handleEscapeKeyDown = (e) => {
      if ((e.key === 'Escape' || e.keyCode === 27) && state.toggled) {
        e.stopPropagation();
        e.preventDefault();
        toggle();
      }
    };

    if (state.toggled) {
      window.addEventListener('keydown', handleEscapeKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleEscapeKeyDown);
    };
  }, [state.toggled]);

  const toggle = () => {
    setState(prev => ({ ...prev, toggled: !prev.toggled }));
  };

  const overlayStyle = {
    position: 'fixed',
    display: 'inline-flex',
    width: '100%',
    height: '100%',
    background: 'black',
    opacity: 0.8,
    textAlign: 'center',
    top: 0,
    left: 0,
    zIndex: 1000
  };

  const overlayPhotoStyle = {
    position: 'fixed',
    display: 'inline-flex',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    top: 0,
    left: 0,
    zIndex: 1000
  };

  const wrapperStyle = {
    margin: 'auto 0',
    width: '100%',
    position: 'relative'
  };

  if (state.toggled) {
    return (
      <div style={overlayStyle} onClick={toggle}>
        <div style={overlayPhotoStyle}>
          <div style={wrapperStyle}>
            <img src={src} alt="Overlay" style={{ maxHeight: '100vh', maxWidth: '100vw' }} />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

PhotoOverlay.propTypes = {
  toggled: PropTypes.bool,
  src: PropTypes.string.isRequired
};

PhotoOverlay.defaultProps = {
  toggled: false
};

export default PhotoOverlay;




