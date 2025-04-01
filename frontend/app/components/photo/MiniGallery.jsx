import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import Photo from './Photo.jsx'
import CoverPhoto from './CoverPhoto.jsx'
import Radium from 'radium'
import Draggable, {DraggableCore} from 'react-draggable'
import {SM, XS} from '../../vars'

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatch = (e) => setMatches(e.matches);
    
    setMatches(media.matches);
    media.addListener(updateMatch);
    
    return () => media.removeListener(updateMatch);
  }, [query]);

  return matches;
};

const MiniGallery = (props) => {
  const [selected, setSelected] = useState(null);
  const [startX, setStartX] = useState(0);
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');

  useEffect(() => {
    setSelected(null);
  }, [props.images]);

  const onSelect = useCallback((newSelected) => {
    setSelected(newSelected);
  }, []);

  const onRightSelect = useCallback((images, currentSelected) => {
    const selectedIndex = images.indexOf(currentSelected);
    const newSelectedIndex = (selectedIndex + 1) % images.length;
    const newStartX = newSelectedIndex <= 3 ? 0 : 
                     (images.length - newSelectedIndex) <= 3 ? startX : 
                     (-(newSelectedIndex - 3) * 103);
    
    setSelected(images[newSelectedIndex]);
    setStartX(newStartX);
  }, [startX]);

  const onLeftSelect = useCallback((images, currentSelected) => {
    const selectedIndex = images.indexOf(currentSelected);
    const newSelectedIndex = ((selectedIndex - 1) + images.length) % images.length;
    const newStartX = newSelectedIndex <= 3 ? 0 : 
                     (images.length - newSelectedIndex) <= 3 ? startX : 
                     (-(newSelectedIndex - 3) * 103);
    
    setSelected(images[newSelectedIndex]);
    setStartX(newStartX);
  }, [startX]);

  const { images, height, width, margin, crop, children, clickable, size, linkTo, className, onClick } = props;
  const selectedImage = selected || images[props.selected];
  const selectedIndex = images.indexOf(selectedImage);
  const showLeft = selectedIndex > 0;
  const showRight = selectedIndex < images.length - 1;

  const coverPhotoStyle = {
    '@media only screen and (max-width: 767px)': {
      height: height * XS
    },
    '@media only screen and (min-width: 768px)': {
      height: height * SM
    },
    '@media only screen and (min-width: 992px)': {
      height: height
    }
  };

  const galleryStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  };

  const leftStyle = {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    cursor: 'pointer',
    opacity: showLeft ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out'
  };

  const rightStyle = {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    cursor: 'pointer',
    opacity: showRight ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out'
  };

  const photosStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '100%',
    height: '100%',
    transform: `translateX(${startX}px)`,
    transition: 'transform 0.3s ease-in-out'
  };

  const photoStyle = {
    flex: '0 0 auto',
    width: isSmall ? 103 : 206,
    height: isSmall ? 103 : 206,
    margin: '0 15px',
    position: 'relative'
  };

  return (
    <div style={galleryStyle}>
      {showLeft && (
        <div style={leftStyle} onClick={() => onLeftSelect(images, selectedImage)}>
          <i className="fa fa-chevron-left fa-2x" />
        </div>
      )}
      <div style={photosStyle}>
        {images.map((image, index) => (
          <div key={image.src} style={photoStyle}>
            <Photo
              src={image.src}
              height={isSmall ? 103 : 206}
              width={isSmall ? 103 : 206}
              margin={0}
              crop={crop}
              selected={selectedImage === image}
              clickable={clickable}
              size={size}
              linkTo={linkTo}
              className={className}
              onClick={onClick}
            >
              {children}
            </Photo>
          </div>
        ))}
      </div>
      {showRight && (
        <div style={rightStyle} onClick={() => onRightSelect(images, selectedImage)}>
          <i className="fa fa-chevron-right fa-2x" />
        </div>
      )}
    </div>
  );
};

MiniGallery.propTypes = {
  images: PropTypes.array.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  margin: PropTypes.number,
  crop: PropTypes.bool,
  selected: PropTypes.number,
  children: PropTypes.node,
  clickable: PropTypes.bool,
  size: PropTypes.string,
  linkTo: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

MiniGallery.defaultProps = {
  height: 206,
  width: 206,
  margin: 15,
  crop: false,
  selected: 0,
  clickable: false
};

export default Radium(MiniGallery);
