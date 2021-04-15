import styled, { createGlobalStyle, css } from 'styled-components';
import normalize from 'styled-normalize';
// Imports from src
import { respondTo } from './responsive';

export const GlobalStyle = createGlobalStyle`
    ${normalize}
    
    * {
        text-decoration: none;
        cursor: none;
    }
    
    html {        
        font-size: 62.5%;   // 1rem = 10px -> 10px / 16px = 0.625
        -webkit-font-smoothing: antialiased;         
    }
    
    body {
        width: 100%;
        box-sizing: border-box;
        overflow-y: auto;
        overscroll-behavior: none;
        background: ${(props) => props.theme.background};
        font-family: 'Montserrat', sans-serif;  
    }
    
    button {
       border: none;
       outline: none;
    }

    a:link,
    a:visited {
      text-decoration: none;
      outline: none;
    }
`;

// 1170px / 8 = 146.2px = 14.62rem
export const LayoutContainer = styled.div`
    display: grid;
    grid-template-columns:
        [side-left-start] minmax(3rem, 1fr) [side-left-end center-start]
        repeat(8, [col-start] minmax(min-content, 14.62rem) [col-end])
        [center-end side-right-start] minmax(3rem, 1fr) [side-right-end];
    overflow-x: hidden;

    @media ${respondTo.M} {
        grid-template-columns:
            [side-left-start] 3rem [side-left-end center-start]
            repeat(8, [col-start] 1fr [col-end])
            [center-end side-right-start] 3rem [side-right-end];
    }
`;

export const Flex = styled.div<{
    justifyBetween?: boolean;
    justifyEnd?: boolean;
    alignTop?: boolean;
    noHeight?: boolean;
}>`
    display: flex;
    position: relative;
    align-items: center;

    ${(props) =>
        props.justifyBetween &&
        css`
            justify-content: space-between;
        `}

    ${(props) =>
        props.justifyEnd &&
        css`
            justify-content: flex-end;
        `}
    
    ${(props) =>
        props.alignTop &&
        css`
            align-items: flex-start;
        `}
    
    ${(props) =>
        props.noHeight &&
        css`
            height: 0;
        `}
`;
