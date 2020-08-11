import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  a {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
  }
  div .deckgo-highlight-code {
    background: red;
  }
  p > a {
    color: #9f7aea;
  }
  span {
    background: ${({ theme }) => theme.body} !important;
    color: ${({ theme }) => theme.text} !important;
  }
  `;
