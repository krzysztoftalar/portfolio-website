import styled from 'styled-components';
// Imports from src
import { motion } from 'framer-motion';
import { primaryColor } from './variables';

export const HeaderNav = styled(motion.div)`
    position: sticky;
    top: 7rem;
    z-index: 100;
    grid-column: center-start / center-end;
    grid-row: 1 / 2;
    height: 0;
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;

    a {
        font-size: 3rem;
        font-weight: 700;
        color: ${(props) => props.theme.text};
    }

    span {
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        margin: 0 0.3rem;
        border-radius: 100%;
        background-color: ${primaryColor};
    }
`;

export const Menu = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: -2.75rem;

    p {
        transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        color: ${(props) => props.theme.text};
        font-size: 2.5rem;
        font-weight: 700;
    }

    button {
        order: 1;
        width: 9rem;
        height: 8rem;
        padding: 2rem;
        border: none;
        background: none;
        outline: none;

        span {
            display: inline-block;
            width: 3.5rem;
            height: 0.6rem;
            margin: 0.4rem 0;
            background: ${(props) => props.theme.text};
        }

        &:hover + p {
            opacity: 1;
        }
    }
`;
