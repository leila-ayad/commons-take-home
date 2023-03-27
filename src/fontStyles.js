import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import sourceSansRegular from './assets/fonts/SourceSansPro-Regular.ttf';
import sourceSansBold from './assets/fonts/SourceSansPro-Bold.ttf';
import sourceSansItalic from './assets/fonts/SourceSansPro-Italic.ttf';
import poppinsRegular from './assets/fonts/Poppins-Regular.ttf';
import poppinsBold from './assets/fonts/Poppins-Bold.ttf';
import poppinsItalic from './assets/fonts/Poppins-Italic.ttf';

export const FontStyles = createGlobalStyle`
  ${normalize}
  @font-face {
    font-family: 'source-sans-regular';
    src: local('Source Sans Regular'), local('SourceSansRegular'), url(${sourceSansRegular}) format('truetype');
  }
  @font-face {
    font-family: 'source-sans-bold';
    src: local('Source Sans Bold'), local('SourceSansBold'), url(${sourceSansBold}) format('truetype');
  }
  @font-face {
    font-family: 'source-sans-italic';
    src: local('Source Sans Italic'), local('SourceSansItalic'), url(${sourceSansItalic}) format('truetype');
  }
  @font-face {
    font-family: 'poppins-regular';
    src: local('Poppins Regular'), local('PoppinsRegular'), url(${poppinsRegular}) format('truetype');
  }
  @font-face {
    font-family: 'poppins-bold';
    src: local('Poppins Bold'), local('PoppinsBold'), url(${poppinsBold}) format('truetype');
  }
  @font-face {
    font-family: 'poppins-italic';
    src: local('Poppins Italic'), local('PoppinsItalic'), url(${poppinsItalic}) format('truetype');
  }
  body {
    font-family: 'source-sans-regular';
    line-height: 1.43;
    letter-spacing: 0.5px;
  }
`;