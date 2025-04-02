import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    position: relative;
    min-height: 100vh;
  }
  
  a {
    text-decoration: none;
    color: inherit;
    
    &:hover {
      color: ${props => props.theme.colors.PRIMARY};
    }
  }
  
  /* Add global styles here */
`;

export default GlobalStyle; 