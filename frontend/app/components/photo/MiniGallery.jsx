import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import Photo from './Photo.jsx'
import CoverPhoto from './CoverPhoto.jsx'
import Draggable, {DraggableCore} from 'react-draggable'
import {SM, XS} from '../../vars'
import useMediaQuery from '../../hooks/useMediaQuery'

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
    const newSelectedIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    const newStartX = newSelectedIndex <= 3 ? 0 : 
                     (images.length - newSelectedIndex) <= 3 ? startX : 
                     (-(newSelectedIndex - 3) * 103);
    
    setSelected(images[newSelectedIndex]);
    setStartX(newStartX);
  }, [startX]);

  const onDragStop = useCallback((e, data) => {
    setStartX(data.x);
  }, []);

  const { images, orientation, height, thumbHeight } = props;
  const DraggableComponent = isSmall ? DraggableCore : Draggable;

  const style = {
    container: {
      height: isSmall ? height * XS : isMedium ? height * SM : height
    },
    thumbnails: {
      height: isSmall ? thumbHeight * XS : isMedium ? thumbHeight * SM : thumbHeight
    }
  };

  return (
    <div>
      <div style={style.container}>
        <CoverPhoto
          src={selected ? selected.src : images[0].src}
          onRightSelect={() => onRightSelect(images, selected || images[0])}
          onLeftSelect={() => onLeftSelect(images, selected || images[0])}
        />
      </div>
      <div style={style.thumbnails}>
        <DraggableComponent
          axis="x"
          bounds={{ left: -(images.length - 4) * 103, right: 0 }}
          onStop={onDragStop}
          position={{ x: startX, y: 0 }}
        >
          <div style={{ position: 'relative', width: images.length * 103 }}>
            {images.map((image, index) => (
              <div
                key={image.src}
                style={{
                  display: 'inline-block',
                  width: 103,
                  height: '100%',
                  padding: 5,
                  cursor: 'pointer'
                }}
                onClick={() => onSelect(image)}
              >
                <Photo
                  src={image.src}
                  height="100%"
                  selected={selected === image}
                  size="low"
                />
              </div>
            ))}
          </div>
        </DraggableComponent>
      </div>
    </div>
  );
};

MiniGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired
  })).isRequired,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  height: PropTypes.number,
  thumbHeight: PropTypes.number
};

MiniGallery.defaultProps = {
  orientation: 'horizontal',
  height: 400,
  thumbHeight: 100
};

export default MiniGallery;
