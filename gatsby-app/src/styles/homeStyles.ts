import styled from 'styled-components';
import { motion } from 'framer-motion';
import { media } from './responsive';

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
export const HomeContentSection = styled.div`
    grid-column: 1 / -1;
    grid-row: 2 / 3;
`;
