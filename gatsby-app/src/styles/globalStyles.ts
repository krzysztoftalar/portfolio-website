import styled, { createGlobalStyle, css } from 'styled-components';
import normalize from 'styled-normalize';
// Imports from src
import { red } from './variables';

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
        box-sizing: border-box;
        overflow-x: hidden;
        overscroll-behavior: none;
        background: ${(props) => props.theme.background};
        font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }    
`;

// 1170px / 8 = 146.2px -> 146.2px = 14.62rem
export const LayoutContainer = styled.div`
    display: grid;
    grid-template-columns:
        [side-left-start] minmax(6rem, 1fr) [side-left-end center-start]
        repeat(8, [col-start] minmax(min-content, 14.62rem) [col-end])
        [center-end side-right-start] minmax(6rem, 1fr) [side-right-end];
    grid-template-rows: 100vh 100vh;
`;

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
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

export const Cursor = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    align-items: center;
    justify-content: center;
    width: 3.2rem;
    height: 3.2rem;
    transform: translate(-50%, -50%);
    transition: all 0.1s ease-in-out;
    transition-property: width, height, border;
    will-change: width, height, transform, border;
    border-radius: 100%;
    background: ${red};
    pointer-events: none;

    &::after {
        content: '';
        width: 2px;
        height: 2px;
        border-radius: 100%;
        background: ${(props) => props.theme.background};
    }

    &.hovered {
        width: 5.6rem;
        height: 5.6rem;
        border: 5px solid ${red};
        background: transparent;

        &::after {
            background: none;
        }
    }

    &.pointer {
        border: 5px solid ${(props) => props.theme.text};
    }
`;
