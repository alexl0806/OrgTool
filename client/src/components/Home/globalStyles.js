import { createGlobalStyle } from 'styled-components';
import img from './background.svg';
 
const GlobalStyle = createGlobalStyle`
  body {
    aspect-ratio: 960/310;
    width: 100%;
    background-position: center;
    background-size: cover;
    background-image: url(${img});
    overflow: hidden;
  }
`;
 
export default GlobalStyle;