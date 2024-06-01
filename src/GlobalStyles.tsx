import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Roboto, sans-serif;
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
    
    @media (max-width: 599px) {
        :root {
            font-size: 8px;
        }
    }
    
    @media (min-width: 600px) and (max-width: 1023px) {
        :root {
            font-size: 12px;
        }
    }
    
    @media (min-width: 1024px) and (max-width: 1199px) {
        :root {
            font-size: 16px;
        }
    }
    
    @media (min-width: 1200px) {
        :root {
            font-size: 20px;
        }
    }
`;

export default GlobalStyle;
