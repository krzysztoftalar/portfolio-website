import styled from 'styled-components';
// Imports from src
import { motion } from 'framer-motion';
import { primaryColor } from '../base/variables';
import { respondTo } from '../base/responsive';

export const HeaderNav = styled(motion.div)`
    position: fixed;
    left: 0;
    right: 0;
    top: 7rem;
    z-index: 100;
    height: 0;
    max-width: 117rem;
    margin: 0 auto;
    padding-left: 3rem;
    padding-right: 3rem;

    @media ${respondTo.S} {
        top: 4rem;
    }
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

    @media ${respondTo.S} {
        a {
            font-size: 2.3rem;
        }

        span {
            width: 1.1rem;
            height: 1.1rem;
        }
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
        font-size: 2.2rem;
        font-weight: 700;
    }

    button {
        order: 1;
        width: 9rem;
        height: 8rem;
        padding: 2rem;
        background: none;

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

    @media ${respondTo.S} {
        margin-right: -3.15rem;

        p {
            font-size: 1.6rem;
        }

        button {
            span {
                display: inline-block;
                width: 2.7rem;
                height: 0.4rem;
                margin: 0.3rem 0;
            }
        }
    }
`;
