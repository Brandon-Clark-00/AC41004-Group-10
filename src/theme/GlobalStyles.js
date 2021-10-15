import { createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font};
    transition: all 0.50s linear;
  }

  header {
    background-color: ${({ theme }) => theme.colors.footHead.color};
  }

  footer {
    background-color: ${({ theme }) => theme.colors.footHead.color};
  }

  img {
    background-color: ${({ theme }) => theme.colors.footHead.color};
  }

  .social-media a:nth-child(1) {
    color: ${({ theme }) => theme.colors.social.color};
  }

  .social-media a:nth-child(2) {
    color: ${({ theme }) => theme.colors.social.color};
  }

  .social-media a:nth-child(3) {
    color: ${({ theme }) => theme.colors.social.color};
  }

  .social-media a:nth-child(4) {
    color: ${({ theme }) => theme.colors.social.color};
  }

  button.btn {
    background-color: ${({ theme }) => theme.colors.button.background};
    color: ${({ theme }) => theme.colors.button.text};
    outline: ${({ theme }) => theme.colors.button.hText};
  }

  .login-button:hover.btn {
    background-color: ${({ theme }) => theme.colors.button.hBackground};
    color: ${({ theme }) => theme.colors.button.hText};
    outline: ${({ theme }) => theme.colors.button.hText};
  }

  .page-container {
    color: ${({ theme }) => theme.colors.button.text};
  }

  li {
    color: ${({ theme }) => theme.colors.head.text};
  }

`;