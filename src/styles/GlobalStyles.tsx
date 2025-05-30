import { createGlobalStyle } from "styled-components";
import colors from "./colors";

const GlobalStyle = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Pretendard";
    }

    html,
    body {
    margin: 0;
    padding: 0;
    height: 100%;
    }


    ul,
    ol {
    list-style: none;
    }

    a {
    text-decoration: none;
    color: inherit;
    }

    #root {
    max-width: 430px;
    min-height: 100%;
    margin: 0 auto;
    background-color: ${colors.white};
    color: ${colors.black};
    padding-top: 44px;
    padding-bottom: 34px;
    }

`;

export default GlobalStyle;
