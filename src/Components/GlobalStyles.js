import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};                               // 전체 스타일에 대한 리셋
    *{
        box-sizing: border-box;
    }
    li{
        list-style: none;
    }
    html{
        font-size: 10px;
    }
    body{
        width: 100vw;
        height: 100vh;
    }
`;

export default GlobalStyle;