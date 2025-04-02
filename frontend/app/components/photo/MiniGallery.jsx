import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'
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
  left: ${props => props.startX || 0}px;
  position: relative;
  width: ${props => props.imagesCount * 115 - 15}px;
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
  const [startX, setStartX] = useState(0)
  const [deltaX, setDeltaX] = useState(0)
  const [small, setSmall] = useState(false)
  const mql = window.matchMedia('only screen and (max-width: 991px)')

  useEffect(() => {
    const handleMediaChange = () => {
      if (mql.matches) {
        setSmall(true)
      } else {
        setSmall(false)
      }
    }

    handleMediaChange()
    mql.addListener(handleMediaChange)

    return () => {
      mql.removeListener(handleMediaChange)
    }
  }, [mql])

  const onSelect = (selected) => {
    setSelected(selected)
  }

  const onRightSelect = (images, selected) => {
    const selectedIndex = images.indexOf(selected)
    const newSelectedIndex = (selectedIndex + 1) % images.length
    const startX = newSelectedIndex <= 3 ? 0 : (images.length - newSelectedIndex) <= 3 ? startX : (-(newSelectedIndex - 3) * 103)
    setSelected(images[newSelectedIndex])
    setStartX(startX)
  }

  const onLeftSelect = (images, selected) => {
    const selectedIndex = images.indexOf(selected)
    const newSelectedIndex = ((selectedIndex - 1) + images.length) % images.length
    const startX = newSelectedIndex <= 3 ? 0 : (images.length - newSelectedIndex) <= 3 ? startX : (-(newSelectedIndex - 3) * 103)
    setSelected(images[newSelectedIndex])
    setStartX(startX)
  }

  const handleDrag = (e, ui) => {
    setDeltaX(prevDeltaX => prevDeltaX + ui.deltaX)
  }

  const horizontal = (images, cover, height, startX) => {
    const classes = {
      cover: 'col-xs-12',
      thumbs: 'col-xs-3',
      thumbWrapper: 'col-xs-12'
    }

    const bound = images.length <= 7 ? 0 : -((images.length - 7) * 103)
    
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
              <Draggable 
                axis="x" 
                zIndex={100} 
                onDrag={handleDrag} 
                bounds={{top: 0, left: bound, right: 0, bottom: 0}}
              >
                <ScrollerContainer startX={startX} imagesCount={images.length}>
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
              </Draggable>
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
            horizontal(images, cover, galleryHeight, startX) :
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
