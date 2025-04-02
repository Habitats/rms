import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Photo from './Photo.jsx'
import CoverPhoto from './CoverPhoto.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'
import { SM, XS } from '../../vars'

const GalleryContainer = styled.div`
  height: ${props => props.height}px;
`

const GalleryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const CoverContainer = styled.div`
  padding-right: ${props => props.hasMultipleImages ? '15px' : '0'};
  height: ${props => props.calculatedHeight}px;
  
  @media only screen and (max-width: 767px) {
    height: ${props => props.height * XS}px;
  }
  
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    height: ${props => props.height * SM}px;
  }
  
  @media only screen and (min-width: 992px) {
    height: ${props => props.height}px;
  }
`

const ThumbsWrapper = styled.div`
  width: 100%;
`

const ThumbsContainer = styled.div`
  max-height: 200px;
  z-index: 200;
  overflow: hidden;
  width: 100%;
`

const ScrollerContainer = styled.div`
  margin-top: 15px;
  height: 80px;
  position: relative;
  width: ${props => props.imagesCount * 115 - 15}px;
  transform: translateX(${props => props.position}px);
  cursor: ${props => props.isDragging ? 'grabbing' : 'grab'};
  transition: ${props => props.isDragging ? 'none' : 'transform 0.3s ease-out'};
`

const ThumbItem = styled.div`
  padding: 0 15px 0 0;
  float: none;
  display: inline-block;
  
  @media only screen and (max-width: 767px) {
    height: 60px;
    width: 80px;
  }
  
  @media only screen and (min-width: 768px) {
    height: 90px;
    width: 103px;
  }
`

// Vertical gallery styled components
const VerticalCoverContainer = styled.div`
  padding-right: ${props => props.hasMultipleImages ? '0' : 'inherit'};
  height: ${props => props.height}px;
`

const VerticalThumbsContainer = styled.div`
  padding: 0;
  margin-left: -15px;
`

const VerticalScrollerContainer = styled.div`
  height: ${props => props.height}px;
  overflow-y: auto;
  padding: 0;
  overflow-x: hidden;
`

const VerticalThumbItem = styled.div`
  padding: 0 0 15px 15px;
  
  @media only screen and (max-width: 767px) {
    height: 60px;
  }
  
  @media only screen and (min-width: 768px) {
    height: 90px;
  }
`

const MiniGallery = ({ images, height = 350, orientation = 'horizontal' }) => {
  const [selected, setSelected] = useState(null)
  const [position, setPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartPosition, setDragStartPosition] = useState(0)
  const [small, setSmall] = useState(false)
  const scrollerRef = useRef(null)
  
  const isSmallScreen = useMediaQuery('only screen and (max-width: 991px)')
  
  useEffect(() => {
    setSmall(isSmallScreen)
  }, [isSmallScreen])

  const onSelect = (selected) => {
    setSelected(selected)
  }

  const onRightSelect = (images, selected) => {
    const selectedIndex = images.indexOf(selected)
    const newSelectedIndex = (selectedIndex + 1) % images.length
    const newPosition = calculatePosition(newSelectedIndex, images.length)
    setSelected(images[newSelectedIndex])
    setPosition(newPosition)
  }

  const onLeftSelect = (images, selected) => {
    const selectedIndex = images.indexOf(selected)
    const newSelectedIndex = ((selectedIndex - 1) + images.length) % images.length
    const newPosition = calculatePosition(newSelectedIndex, images.length)
    setSelected(images[newSelectedIndex])
    setPosition(newPosition)
  }

  const calculatePosition = (selectedIndex, totalImages) => {
    const itemWidth = 103
    const visibleItems = 7
    
    // If we don't need to scroll, stay at 0
    if (totalImages <= visibleItems) return 0
    
    // Calculate center position
    if (selectedIndex < 3) {
      return 0
    } else if (selectedIndex >= totalImages - 4) {
      // Show last set of items
      return -((totalImages - visibleItems) * itemWidth)
    } else {
      // Center the selected item
      return -((selectedIndex - 3) * itemWidth)
    }
  }

  const handleDragStart = (e) => {
    setIsDragging(true)
    setDragStartX(e.clientX || e.touches?.[0]?.clientX || 0)
    setDragStartPosition(position)
    
    // Add event listeners for mouse/touch move and up events
    if (e.type === 'mousedown') {
      document.addEventListener('mousemove', handleDragMove)
      document.addEventListener('mouseup', handleDragEnd)
    }
  }

  const handleDragMove = (e) => {
    if (!isDragging) return
    
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0
    const deltaX = clientX - dragStartX
    
    const bound = images.length <= 7 ? 0 : -((images.length - 7) * 103)
    const newPosition = Math.max(bound, Math.min(0, dragStartPosition + deltaX))
    setPosition(newPosition)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    
    // Remove event listeners
    document.removeEventListener('mousemove', handleDragMove)
    document.removeEventListener('mouseup', handleDragEnd)
  }

  const horizontal = (images, cover, height) => {
    const classes = {
      cover: 'col-xs-12',
      thumbs: 'col-xs-3',
      thumbWrapper: 'col-xs-12'
    }

    return (
      <GalleryRow className="mini-gallery">
        <CoverContainer 
          className={classes.cover} 
          height={height}
          calculatedHeight={height}
          hasMultipleImages={images.length > 1}
        >
          <CoverPhoto 
            src={cover.src} 
            onRightSelect={() => onRightSelect(images, cover)}
            onLeftSelect={() => onLeftSelect(images, cover)}
          />
        </CoverContainer>
        {images.length > 1 && (
          <ThumbsWrapper className={classes.thumbWrapper}>
            <ThumbsContainer>
              <ScrollerContainer 
                ref={scrollerRef}
                position={position}
                isDragging={isDragging}
                imagesCount={images.length}
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
              >
                {images.map(image => (
                  <ThumbItem key={image.src}>
                    <Photo 
                      className={classes.thumbs} 
                      src={image.src} 
                      size={'low'}
                      onClick={() => onSelect(image)} 
                      selected={cover === image}
                    />
                  </ThumbItem>
                ))}
              </ScrollerContainer>
            </ThumbsContainer>
          </ThumbsWrapper>
        )}
      </GalleryRow>
    )
  }

  const vertical = (images, cover, height) => {
    const classes = {
      cover: images.length === 1 ? 'col-xs-12' : images.length > 10 ? 'col-xs-8' : 'col-xs-9',
      thumbs: images.length > 10 ? 'col-md-6 col-xs-12' : 'col-xs-12',
      thumbWrapper: images.length > 10 ? 'col-xs-4' : 'col-xs-3'
    }

    return (
      <GalleryRow className="mini-gallery">
        <VerticalCoverContainer 
          className={classes.cover}
          height={height} 
          hasMultipleImages={images.length > 1}
        >
          <CoverPhoto 
            src={cover.src} 
            onRightSelect={() => onRightSelect(images, cover)}
            onLeftSelect={() => onLeftSelect(images, cover)}
          />
        </VerticalCoverContainer>
        {images.length > 1 && (
          <div className={classes.thumbWrapper}>
            <VerticalThumbsContainer>
              <VerticalScrollerContainer height={height}>
                {images.map(image => (
                  <VerticalThumbItem className={classes.thumbs} key={image.src}>
                    <Photo 
                      onClick={() => onSelect(image)} 
                      src={image.src} 
                      size={'low'} 
                      selected={cover === image}
                    />
                  </VerticalThumbItem>
                ))}
              </VerticalScrollerContainer>
            </VerticalThumbsContainer>
          </div>
        )}
      </GalleryRow>
    )
  }

  const main = () => images.find(i => i.src.includes('main.jpg'))
  const cover = selected || (main() || (images.length > 0 ? images[0] : null))
  
  if (!cover) {
    return null
  }

  const galleryHeight = images.length > 1 ? height : height * 0.75

  return (
    <div>
      {images.length === 1 ? (
        <GalleryContainer height={galleryHeight}>
          <Photo src={cover.src}/>
        </GalleryContainer>
      ) : (
        <div>
          {small ? 
            horizontal(images, cover, galleryHeight) :
            orientation === 'horizontal' ? 
              horizontal(images, cover, galleryHeight) : 
              vertical(images, cover, galleryHeight)
          }
        </div>
      )}
    </div>
  )
}

MiniGallery.propTypes = {
  images: PropTypes.array.isRequired,
  orientation: PropTypes.string,
  height: PropTypes.number
}

export default MiniGallery
