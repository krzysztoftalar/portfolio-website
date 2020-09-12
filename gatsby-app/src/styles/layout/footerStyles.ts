import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
// Imports from src
import { primaryColor } from '../base/variables';

const footerWrapper = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding-bottom: 4rem;
`;

export const FooterWrapper = styled(motion.div)`
    ${footerWrapper}

    position: fixed;
    margin: 0 auto;
    max-width: 117rem;
    bottom: 0;
    left: 0;
    right: 0;
    color: ${primaryColor};
`;

export const NavFooterWrapper = styled.div`
    ${footerWrapper}

    grid-column: center-start / center-end;
    color: ${(props) => props.theme.background};
`;

export const FooterEmail = styled.div<{ navOpen: boolean }>`
    a:link,
    a:visited {
        transition: fill 0.2s cubic-bezier(0.6, 0.05, -0.01, 0.9);
        color: ${(props) =>
            props.navOpen ? props.theme.background : primaryColor};
        font-size: 2rem;
        font-weight: 800;
        text-decoration: none;
    }

    a:hover {
        color: ${(props) => props.theme.text};
    }
`;

export const FooterCopyrights = styled.div`
    justify-self: center;
    font-size: 1.6rem;
    font-weight: 600;
`;

export const FooterSocial = styled.div<{ navOpen: boolean }>`
    display: flex;
    justify-self: end;
    margin-right: -1rem;

    a {
        padding: 1rem;

        &:hover svg {
            fill: ${(props) =>
                props.navOpen ? props.theme.text : props.theme.text};
        }

        svg {
            width: 2.5rem;
            height: 2.5rem;
            transition: fill 0.2s cubic-bezier(0.6, 0.05, -0.01, 0.9);
            fill: ${(props) =>
                props.navOpen ? props.theme.background : primaryColor};
        }
    }
`;
