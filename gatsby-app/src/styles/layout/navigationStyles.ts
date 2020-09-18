import styled from 'styled-components';
import { motion } from 'framer-motion';
// Imports from src
import { primaryColor } from '../base/variables';
import { respondTo } from '../base/responsive';

// Container
export const Nav = styled(motion.div)`
    display: grid;
    position: fixed;
    grid-template-columns:
        [side-left-start] minmax(3rem, 1fr) [side-left-end center-start]
        repeat(8, [col-start] minmax(min-content, 14.62rem) [col-end])
        [center-end side-right-start] minmax(3rem, 1fr) [side-right-end];
    grid-template-rows: min-content 1fr min-content;
    grid-row-gap: 5rem;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: ${primaryColor};

    @media ${respondTo.M} {
        grid-template-columns:
            [side-left-start] 3rem [side-left-end center-start]
            repeat(8, [col-start] 1fr [col-end])
            [center-end side-right-start] 3rem [side-right-end];
    }
`;

// Header
export const NavHeader = styled.div`
    position: relative;
    grid-column: center-start / center-end;
    grid-row: 1 / 2;
    margin-top: 7rem;
    height: 0;

    h2 {
        color: ${(props) => props.theme.background};
        font-size: 2.5rem;
        font-weight: 700;
    }

    @media ${respondTo.S} {
        margin-top: 4rem;

        h2 {
            font-size: 2rem;
        }
    }
`;

export const CloseNav = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: -3rem;

    button {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        order: 1;
        width: 9rem;
        height: 8rem;
        padding: 2rem;
        border: none;
        background: none;
        outline: none;

        &:hover + span {
            opacity: 1;
        }

        &::before,
        &::after {
            content: '';
            display: block;
            position: absolute;
            width: 3.5rem;
            height: 0.6rem;
            background: ${(props) => props.theme.background};
        }

        &::before {
            transform: rotate(45deg);
        }

        &::after {
            transform: rotate(-45deg);
        }
    }

    span {
        transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        color: ${(props) => props.theme.background};
        font-size: 2.2rem;
        font-weight: 700;
    }

    @media ${respondTo.S} {
        margin-right: -3.4rem;

        button {
            &::before,
            &::after {
                width: 2.7rem;
                height: 0.4rem;
            }
        }

        span {
            font-size: 1.6rem;
        }
    }
`;

// Projects list
export const NavList = styled.div`
    grid-column: center-start / center-end;
    grid-row: 2 / 3;

    ul {
        display: grid;
        grid-row-gap: 2rem;
        padding: 0;

        li {
            width: fit-content;
            overflow: hidden;
            list-style: none;
            text-transform: uppercase;

            .link {
                position: relative;
                display: flex;
                align-items: center;
                width: calc(100% + 7.8rem);
                color: ${(props) => props.theme.background};

                .arrow {
                    display: flex;
                    align-items: center;
                    margin-right: 0.8rem;
                }
            }

            svg {
                width: 7rem;
                height: 7rem;
                fill: ${(props) => props.theme.background};
            }

            h2 {
                display: block;
                margin: 0;
                font-size: 5rem;
                font-weight: 900;
                text-transform: uppercase;
            }
        }
    }

    @media ${respondTo.S} {
        ul {
            grid-row-gap: 1rem;

            li {
                svg {
                    width: 7rem;
                    height: 4rem;
                }

                h2 {
                    font-size: 2.5rem;
                }
            }
        }
    }
`;

// Projects images
export const NavImages = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    grid-column: col-start 3 / -1;

    .reveal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${primaryColor};
    }

    .img {
        position: absolute;
        display: flex;
        top: 0;
        left: 0;
        align-items: center;
        z-index: -1;
        height: 100%;
        width: 100%;

        .img-fluid {
            display: inline-block;
            width: 100%;
        }
    }
`;
