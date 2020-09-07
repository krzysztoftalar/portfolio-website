import styled from 'styled-components';
import { motion } from 'framer-motion';
// Imports from src
import { media } from './responsive';
import { primaryColor, white } from './variables';

// Banner section
export const Banner = styled.div`
    position: relative;
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    background: ${(props) => props.theme.background};
`;

export const Video = styled.div`
    width: 100%;
    height: 100%;
    font-size: 0;

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const Canvas = styled.canvas`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

export const BannerTitle = styled(motion.h1)`
    position: absolute;
    bottom: -10rem;
    left: -2.5rem;
    color: ${(props) => props.theme.text};
    text-transform: uppercase;
    pointer-events: none;
`;

export const Headline = styled(motion.span)`
    display: block;
    font-size: 37rem;
    font-weight: 900;
    line-height: 0.76;

    @media only screen and ${media.L} {
        font-size: 30rem;
    }
`;

// Content section
export const HomeContentSection = styled(motion.div)`
    grid-column: 1 / -1;
    grid-row: 2 / 3;
    padding: 27rem 4rem 17rem;
`;

export const Content = styled(motion.h2)`
    color: ${(props) => props.theme.text};
    font-size: 3.5rem;
    font-weight: 500;
    line-height: 1.3;
    text-align: center;
`;

// Featured project section
export const HomeFeaturedSection = styled(motion.div)`
    display: grid;
    grid-template-rows: repeat(2, min-content) 50rem;
    grid-column: center-start / center-end;
    grid-row: 3 / 4;
    position: relative;

    a {
        position: relative;
        display: block;
    }
`;

export const FeaturedSectionTitle = styled.div`
    padding: 0 10rem 4rem;
    color: ${(props) => props.theme.text};

    h3 {
        font-size: 2rem;
    }

    h4 {
        font-size: 1.5rem;
    }
`;

export const FeaturedImage = styled.div`
    border: 1px solid rgb(205, 207, 208);

    .img-fluid {
        width: 100%;
    }
`;

export const FeaturedProjectTitle = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    margin-bottom: -11.9rem;
    z-index: 1;
    padding: 0 10rem;
    color: ${(props) => props.theme.text};

    .featured-title {
        display: flex;
        flex-direction: column;
        font-size: 10rem;
        font-weight: 800;
        text-transform: uppercase;
        line-height: 0.8;

        .arrow {
            width: fit-content;
            margin-left: -0.3rem;

            svg {
                width: 7rem;
                height: 7rem;
                margin-right: 0.8rem;
                fill: ${(props) => props.theme.text};
            }
        }
    }
`;

export const FeaturedButton = styled.div`
    align-self: center;
    justify-self: end;

    button {
        position: relative;
        padding: 2rem;
        color: ${(props) => props.theme.background};
        background: ${primaryColor};
        border: none;
        font-size: 2rem;
        font-weight: 600;

        span {
            display: block;
            margin-right: 10rem;
        }

        &:before,
        &:after {
            content: '';
            display: block;
            position: absolute;
            top: 50%;
            right: 2rem;
            width: 3.5rem;
            height: 0.6rem;
            background: ${(props) => props.theme.background};
            transform: translateY(-50%);
        }

        &:before {
            margin-top: -0.8rem;
        }
        &:after {
            margin-top: 0.8rem;
        }
    }
`;
