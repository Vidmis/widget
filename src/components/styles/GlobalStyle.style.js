import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *,
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        border: 0;
        text-decoration: none;
        list-style-type: none;
        box-sizing: border-box;
    }

    body {
        background-color: #323232;
        color: #fff;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        display: grid;
        justify-content: center;
        margin-top: 2rem;
    }
`;