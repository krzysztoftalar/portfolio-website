import styled from 'styled-components';
import { motion } from 'framer-motion';
// Imports from src
import { red } from './variables';

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
        background-color: ${red};
    }
`;

export const Menu = styled.div`
    margin-right: -3rem;

    button {
        padding: 2rem;
        border: none;
        background: none;
        outline: none;

        span {
            display: block;
            width: 3.5rem;
            height: 0.6rem;
            background: ${(props) => props.theme.text};
            margin: 1rem;
        }
    }
`;
