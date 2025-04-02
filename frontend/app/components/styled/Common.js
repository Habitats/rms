import styled from 'styled-components'

// Layout components
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
  
  @media only screen and (max-width: ${props => props.theme.breakpoints.xs}) {
    text-align: center;
  }
`

export const Column = styled.div`
  padding: 0 15px;
  flex: ${props => props.flex || '0 0 auto'};
  width: ${props => props.width || 'auto'};
  
  @media only screen and (max-width: ${props => props.theme.breakpoints.xs}) {
    width: ${props => props.mobileWidth || '100%'};
  }
`

export const Container = styled.div`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${props => props.noPadding ? '0' : props.theme.layout.containerPadding};
`

// Text components
export const Title = styled.h1`
  color: ${props => props.color || props.theme.colors.HEADING_BIG};
  margin-bottom: ${props => props.marginBottom || '20px'};
  font-size: ${props => props.fontSize || '2rem'};
`

export const Subtitle = styled.h2`
  color: ${props => props.color || props.theme.colors.HEADING_SMALL};
  margin-bottom: ${props => props.marginBottom || '15px'};
  font-size: ${props => props.fontSize || '1.5rem'};
`

export const Text = styled.p`
  margin-bottom: ${props => props.marginBottom || '15px'};
  font-size: ${props => props.fontSize || '1rem'};
  line-height: ${props => props.lineHeight || '1.5'};
`

// Button components
export const Button = styled.button`
  cursor: pointer;
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.PRIMARY || '#333'};
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.PRIMARY_DARK || '#555'};
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

// Spacing utilities
export const Margin = styled.div`
  margin-top: ${props => props.top || '0'};
  margin-right: ${props => props.right || '0'};
  margin-bottom: ${props => props.bottom || '0'};
  margin-left: ${props => props.left || '0'};
`

export const Padding = styled.div`
  padding-top: ${props => props.top || '0'};
  padding-right: ${props => props.right || '0'};
  padding-bottom: ${props => props.bottom || '0'};
  padding-left: ${props => props.left || '0'};
`

// Form elements
export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: ${props => props.width || '100%'};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.PRIMARY || '#333'};
  }
`

export const TextArea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: ${props => props.width || '100%'};
  min-height: ${props => props.height || '100px'};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.PRIMARY || '#333'};
  }
`

export default {
  Row,
  Column,
  Container,
  Title,
  Subtitle,
  Text,
  Button,
  Margin,
  Padding,
  Input,
  TextArea
} 