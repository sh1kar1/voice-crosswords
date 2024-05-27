import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
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
`;

export default GlobalStyle;
