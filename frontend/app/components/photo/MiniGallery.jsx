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
  width: 100%;
  max-width: 100%;
  overflow: hidden;
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
  max-width: 100%;
  margin-top: 15px;
  overflow: hidden;
  
  @media only screen and (max-width: 767px) {
    padding-left: 0;
    padding-right: 0;
    
    /* Override any Bootstrap margins or padding that might cause overflow */
    &.col-xs-12 {
      padding: 0;
      margin: 0;
    }
  }
`

const ThumbsContainer = styled.div`
  max-height: 100px;
  z-index: 200;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  
  /* Mobile specific handling */
  @media only screen and (max-width: 767px) {
    max-width: 100vw;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px;
    z-index: 3;
    pointer-events: none;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0));
    display: ${props => props.showLeftFade ? 'block' : 'none'};
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0));
    display: ${props => props.showRightFade ? 'block' : 'none'};
  }
`

const ScrollerContainer = styled.div`
  height: 90px;
  position: relative;
  min-width: min-content;
  width: ${props => props.imagesCount * 115 - 15}px;
  max-width: ${props => props.imagesCount * 115 - 15}px;
  transform: translateX(${props => props.position}px);
  cursor: ${props => props.isDragging ? 'grabbing' : 'grab'};
  transition: ${props => props.isDragging ? 'none' : 'transform 0.3s ease-out'};
  display: flex;
  
  /* Mobile specific handling */
  @media only screen and (max-width: 767px) {
    height: 60px;
    width: ${props => props.imagesCount * 85 - 15}px;
    max-width: ${props => props.imagesCount * 85 - 15}px;
  }
`

const ThumbItem = styled.div`
  padding: 0 15px 0 0;
  flex: 0 0 auto;
  
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
  max-height: ${props => props.height}px;
  overflow-y: auto;
  overflow-x: hidden;
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

// Navigation control buttons
const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  outline: none;
  
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
  
  ${props => props.left ? 'left: 5px;' : 'right: 5px;'}
`

const MiniGallery = ({ images, height = 350, orientation = 'horizontal' }) => {
  const [selected, setSelected] = useState(null)
  const [position, setPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartPosition, setDragStartPosition] = useState(0)
  const [small, setSmall] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const [showLeftFade, setShowLeftFade] = useState(false)
  const [showRightFade, setShowRightFade] = useState(true)
  
  const scrollerRef = useRef(null)
  const containerRef = useRef(null)
  
  const isSmallScreen = useMediaQuery('only screen and (max-width: 991px)')
  
  useEffect(() => {
    setSmall(isSmallScreen)
  }, [isSmallScreen])
  
  // Update container width on mount and resize
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    
    updateContainerWidth()
    window.addEventListener('resize', updateContainerWidth)
    
    return () => {
      window.removeEventListener('resize', updateContainerWidth)
    }
  }, [])
  
  // Update fades based on scroll position
  useEffect(() => {
    if (scrollerRef.current && containerRef.current) {
      const scrollerWidth = scrollerRef.current.offsetWidth
      const maxScroll = scrollerWidth - containerWidth
      
      setShowLeftFade(position < 0)
      setShowRightFade(position > -maxScroll && maxScroll > 0)
    }
  }, [position, containerWidth])

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
  
  const scrollLeft = () => {
    const itemWidth = 103
    const newPosition = Math.min(0, position + (containerWidth / 2))
    setPosition(newPosition)
  }
  
  const scrollRight = () => {
    if (!scrollerRef.current) return
    
    const itemWidth = 103
    const scrollerWidth = scrollerRef.current.offsetWidth
    const maxScroll = scrollerWidth - containerWidth
    const newPosition = Math.max(-maxScroll, position - (containerWidth / 2))
    setPosition(newPosition)
  }

  const calculatePosition = (selectedIndex, totalImages) => {
    if (!containerRef.current || totalImages <= 0) return 0
    
    // Adjust item width based on screen size
    const isSmallScreen = window.innerWidth <= 767;
    const itemWidth = isSmallScreen ? 85 : 103;
    
    const containerWidth = containerRef.current.offsetWidth;
    const visibleItems = Math.floor(containerWidth / itemWidth);
    
    // If all items fit, no scrolling needed
    if (totalImages <= visibleItems) return 0;
    
    // Calculate position to center the selected item
    const scrollerWidth = totalImages * itemWidth;
    const maxScroll = scrollerWidth - containerWidth;
    
    if (selectedIndex < Math.floor(visibleItems / 2)) {
      // Selected item is near the start
      return 0;
    } else if (selectedIndex >= totalImages - Math.ceil(visibleItems / 2)) {
      // Selected item is near the end
      return -maxScroll;
    } else {
      // Center the selected item
      const centerPosition = -((selectedIndex * itemWidth) - (containerWidth / 2) + (itemWidth / 2));
      return Math.max(-maxScroll, Math.min(0, centerPosition));
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
    
    // Prevent default to avoid text selection during drag
    e.preventDefault()
  }

  const handleDragMove = (e) => {
    if (!isDragging) return
    
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0
    const deltaX = clientX - dragStartX
    
    if (scrollerRef.current && containerRef.current) {
      const scrollerWidth = scrollerRef.current.offsetWidth
      const containerWidth = containerRef.current.offsetWidth
      const maxScroll = scrollerWidth - containerWidth
      
      // Apply boundary constraints
      const newPosition = Math.max(-maxScroll, Math.min(0, dragStartPosition + deltaX))
      setPosition(newPosition)
    }
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
            <ThumbsContainer 
              ref={containerRef}
              showLeftFade={showLeftFade}
              showRightFade={showRightFade}
            >
              {showLeftFade && (
                <NavButton 
                  left 
                  onClick={scrollLeft}
                  disabled={position >= 0}
                >
                  &lt;
                </NavButton>
              )}
              <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
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
              </div>
              {showRightFade && (
                <NavButton 
                  onClick={scrollRight}
                  disabled={!scrollerRef.current || scrollerRef.current.offsetWidth <= containerWidth || position <= -(scrollerRef.current.offsetWidth - containerWidth)}
                >
                  &gt;
                </NavButton>
              )}
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
            <VerticalThumbsContainer height={height}>
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
    <div style={{ 
      width: '100%', 
      maxWidth: '100%', 
      overflow: 'hidden',
      boxSizing: 'border-box',
      padding: 0
    }}>
      {images.length === 1 ? (
        <GalleryContainer height={galleryHeight}>
          <Photo src={cover.src}/>
        </GalleryContainer>
      ) : (
        <div style={{ 
          width: '100%', 
          maxWidth: '100%', 
          overflow: 'hidden',
          boxSizing: 'border-box',
          padding: 0
        }}>
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
