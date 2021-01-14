import styled from 'styled-components';
import { motion } from 'framer-motion';
// Imports from src
import { respondTo } from '../base/responsive';
import { greyLightColor, primaryColor } from '../base/variables';

// Banner section
export const HomeBannerSection = styled.div`
    position: relative;
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    height: 100vh;
    background: ${(props) => props.theme.background};
`;

export const VideoWrapper = styled(motion.div)`
    width: 100%;
    height: 100%;
    font-size: 0;

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const CanvasWrapper = styled.canvas`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

export const Title = styled(motion.h1)`
    position: absolute;
    bottom: -12.2rem;
    left: 0;
    color: ${(props) => props.theme.text};
    text-transform: uppercase;
    pointer-events: none;

    @media ${respondTo.L} {
        bottom: -9.6rem;
    }

    @media ${respondTo.S} {
        bottom: -7.9rem;
    }

    @media ${respondTo.XXS} {
        bottom: -6.2rem;
    }
`;

export const Headline = styled(motion.span)`
    display: block;
    font-size: 20rem;
    font-weight: 900;
    line-height: 0.77;
    letter-spacing: -0.6rem;

    &:nth-child(1) {
        text-indent: -1.2rem;
    }

    &:nth-child(2) {
        text-indent: -0.7rem;
    }

    &:nth-child(3) {
        text-indent: -0.3rem;
    }

    &:nth-child(4) {
        text-indent: -0.2rem;
    }

    @media ${respondTo.L} {
        font-size: 15rem;

        &:nth-child(1) {
            text-indent: -0.9rem;
        }

        &:nth-child(2) {
            text-indent: -0.5rem;
        }

        &:nth-child(3) {
            text-indent: -0.2rem;
        }
    }

    @media ${respondTo.S} {
        letter-spacing: -0.3rem;

        font-size: 12rem;

        &:nth-child(1) {
            text-indent: -0.7rem;
        }
    }

    @media ${respondTo.XXS} {
        font-size: 9rem;

        &:nth-child(1) {
            text-indent: -0.5rem;
        }

        &:nth-child(2) {
            text-indent: -0.4rem;
        }
    }
`;

// Content section
export const HomeContentSection = styled(motion.div)`
    grid-column: center-start / center-end;
    grid-row: 2 / 3;
    padding: 28rem 0 15rem;

    @media ${respondTo.L} {
        padding: 25rem 0 15rem;
    }

    @media ${respondTo.S} {
        padding: 14rem 0 6rem;
    }

    @media ${respondTo.XXS} {
        padding: 13rem 0 6rem;
    }
`;

export const Content = styled(motion.h2)`
    color: ${(props) => props.theme.text};
    font-size: 3.5rem;
    font-weight: 500;
    line-height: 1.3;
    text-align: center;

    @media ${respondTo.S} {
        font-size: 2.1rem;
    }
`;

// Featured project section
export const HomeFeaturedSection = styled(motion.div)`
    position: relative;
    display: grid;
    grid-template-rows: repeat(2, min-content) 46rem;
    grid-column: center-start / center-end;
    grid-row: 3 / 4;

    a {
        position: relative;
        display: block;
    }

    @media ${respondTo.M} {
        grid-column: 1 / -1;
    }

    @media ${respondTo.S} {
        grid-template-rows: repeat(2, min-content) 33rem;
    }
`;

export const FeaturedSectionTitle = styled.div`
    padding: 0 10rem 4rem;
    color: ${(props) => props.theme.text};

    h3 {
        font-size: 2.2rem;
        letter-spacing: 1px;
    }

    h4 {
        font-size: 1.5rem;
    }

    @media ${respondTo.M} {
        padding: 0 3rem 2rem;
    }

    @media ${respondTo.S} {
        padding: 0 3rem 1rem;

        h3 {
            font-size: 2rem;
        }

        h4 {
            font-size: 1.4rem;
        }
    }
`;

export const FeaturedImage = styled.div`
    border: 1px solid ${greyLightColor};

    .img-fluid {
        width: 100%;
    }
`;

export const FeaturedProjectTitle = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    margin-bottom: -11.7rem;
    z-index: 1;
    padding: 0 10rem;
    color: ${(props) => props.theme.text};

    .featured-title {
        display: flex;
        flex-direction: column;
        margin: 0;
        font-size: 10rem;
        font-weight: 800;
        text-transform: uppercase;
        line-height: 0.8;

        .arrow {
            width: fit-content;
            margin-left: -0.4rem;

            svg {
                width: 7rem;
                height: 7rem;
                margin-right: 0.8rem;
                fill: ${(props) => props.theme.text};
            }
        }
    }

    @media ${respondTo.M} {
        padding: 0 3rem;
    }

    @media ${respondTo.S} {
        margin-bottom: -11rem;

        .featured-title {
            font-size: 5rem;

            .arrow {
                svg {
                    width: 5rem;
                    height: 5rem;
                }
            }
        }
    }

    @media ${respondTo.XXXS} {
        margin-bottom: -9.9rem;

        .featured-title {
            font-size: 4rem;
        }
    }
`;

export const FeaturedButton = styled(motion.div)`
    align-self: center;
    justify-self: end;
    width: 27rem;

    button {
        position: relative;
        width: 100%;
        padding: 2rem;
        color: ${(props) => props.theme.background};
        background: ${primaryColor};
        font-size: 2rem;
        font-weight: 600;
        letter-spacing: 1px;
        text-align: left;

        span {
            display: block;
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

    @media ${respondTo.M} {
        padding-right: 3rem;
    }

    @media ${respondTo.S} {
        justify-self: start;
        width: 21rem;
        padding-left: 3rem;
        padding-top: 10rem;

        button {
            padding: 1.3rem;
            font-size: 1.7rem;

            &:before,
            &:after {
                width: 3rem;
                height: 0.5rem;
            }

            &:before {
                margin-top: -0.6rem;
            }

            &:after {
                margin-top: 0.6rem;
            }
        }
    }
`;

// About section
export const HomeAboutSection = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    grid-column: center-start / center-end;
    grid-row: 4 / 5;
    margin-bottom: 26rem;

    @media ${respondTo.M} {
        flex-direction: column;
    }

    @media ${respondTo.S} {
        margin-bottom: 19rem;
    }
`;

export const About = styled.div`
    flex: 0 0 60%;
    padding-left: 10rem;
    color: ${(props) => props.theme.text};

    h2 {
        max-width: 65rem;
        margin-bottom: 4.5rem;
        margin-top: 0;
        font-size: 3.5rem;
        font-weight: 500;
        line-height: 1.2;
        letter-spacing: -0.5px;
    }

    p {
        max-width: 49rem;
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 1.5;
    }

    @media ${respondTo.M} {
        padding-left: 0;
        flex: 0 0 auto;
    }

    @media ${respondTo.S} {
        h2 {
            font-size: 2.1rem;
            line-height: 1.25;
        }
    }

    @media ${respondTo.XS} {
        h2 {
            margin-bottom: 3.5rem;
        }
    }
`;

export const Skills = styled.div`
    width: 27rem;
    padding-top: 0.9rem;
    overflow: hidden;

    h3 {
        margin-top: 0;
        margin-bottom: 3rem;
        font-size: 2.2rem;
        letter-spacing: 1px;
    }

    @media ${respondTo.M} {
        padding-top: 8rem;
    }

    @media ${respondTo.S} {
        h3 {
            font-size: 2rem;
        }
    }
`;
