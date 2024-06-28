// GlobalStyle.tsx
// does what it says :)

import { createGlobalStyle } from 'styled-components';
import { text, background, gradient } from '@salutejs/plasma-tokens';

const GlobalStyle = createGlobalStyle`
  :root {
    background-color: ${background};
    background-image: ${gradient};
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;
  }
    
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: Roboto, sans-serif;
    color: ${text};
  }

  body {
    line-height: 1;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: 559px) {
    :root {
      font-size: 6px;
    }
  }

  @media (min-width: 560px) and (max-width: 1119px) {
    :root {
      font-size: 10px;
    }
  }

  @media (min-width: 1280px) and (max-width: 1919px) {
    :root {
      font-size: 12px;
    }
  }

  @media (min-width: 1920px) and (max-width: 2559px) {
    :root {
      font-size: 18px;
    }
  }
  
  @media (min-width: 2560px) and (max-width: 3839px) {
    :root {
      font-size: 24px;
    }
  }
  
  @media (min-width: 3840px) {
    :root {
      font-size: 34px;
    }
  }
`;

export default GlobalStyle;
