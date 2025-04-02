import * as C from './colors'
import * as V from './vars'

const theme = {
  // Colors
  colors: {
    ...C
  },
  
  // Breakpoints
  breakpoints: {
    xs: '767px',
    sm: '768px',
    md: '992px',
    lg: '1200px'
  },
  
  // Layout
  layout: {
    maxWidth: '1000px',
    containerPadding: '0 15px',
    headerHeightXs: `${V.HEADER_HEIGHT_XS}px`,
    headerHeightSm: `${V.HEADER_HEIGHT_SM}px`,
    footerHeightXs: `${V.FOOTER_HEIGHT_XS}px`,
    footerHeightSm: `${V.FOOTER_HEIGHT_SM}px`,
  },
  
  // Shadows
  shadows: {
    light: '0 0 35px 3px rgba(0, 0, 0, 0.16)'
  }
}

export default theme 