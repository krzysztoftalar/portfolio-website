import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
// Imports from src
import { greyLightColor, primaryColor } from '../base/variables';

// Slider section
export const ProjectSliderSection = styled(motion.div)`
    position: relative;
    grid-column: 1 / -1;
    grid-row: 1 / 3;
    max-width: 117rem;
    width: 100%;
    height: auto;
    margin: 17rem auto 0;
    border: 1px solid ${greyLightColor};
    cursor: grab !important;
`;

// About section
export const ProjectAboutSection = styled(motion.div)`
    grid-column: center-start / center-end;
    grid-row: 3 / 4;
    padding: 17rem 0 22rem 10rem;
`;

export const About = styled(motion.div)`
    display: grid;
    grid-template-columns: min-content;
    grid-template-rows: repeat(3, min-content);
    color: ${(props) => props.theme.text};

    .project-title {
        margin: 0;
        font-size: 10rem;
        font-weight: 800;
        text-transform: uppercase;
        line-height: 0.8;
    }

    p {
        margin: 5rem 0 4.5rem 0;
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 1.5;
    }
`;

export const ProjectLinks = styled.div`
    width: fit-content;
`;

export const ProjectLink = styled.a`
    &:link,
    &:visited {
        display: flex;
        align-items: center;
        width: 20rem;
        height: 5rem;
        transition: color 0.2s ease-in-out;
        color: ${primaryColor};
        font-size: 2rem;
        font-weight: 600;
        letter-spacing: 1px;
        text-decoration: none;

        &:last-child {
            margin-top: 1rem;
        }
    }

    &:hover {
        color: ${(props) => props.theme.text};

        & svg {
            fill: ${(props) => props.theme.text};
        }
    }

    svg {
        width: 2.5rem;
        height: 2.5rem;
        margin-right: 1rem;
        transition: fill 0.2s ease-in-out;
        fill: ${primaryColor};
    }
`;

// Nav section
export const ProjectNavSection = styled.div`
    display: grid;
    grid-template-columns:
        [side-left-start] minmax(6rem, 1fr) [side-left-end center-start]
        repeat(8, [col-start] minmax(min-content, 14.62rem) [col-end])
        [center-end side-right-start] minmax(6rem, 1fr) [side-right-end];
    grid-column: 1 / -1;
    padding: 7rem 0 7rem;
    background-color: ${primaryColor};
`;

export const PrevProject = styled.div<{ prev: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    grid-column: center-start / col-end 4;
    padding-right: 1rem;

    ${(props) =>
        props.prev
            ? css`
                  justify-content: flex-end;
              `
            : css`
                  justify-content: flex-start;
              `}
`;

export const NextProject = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    grid-column: col-start 5 / center-end;
    padding-left: 1rem;
`;

export const ProjectNavItem = styled(motion.div)<{ prev?: boolean }>`
    position: absolute;
    z-index: 1;
    transform: translateY(-50%);
    top: 50%;

    ${(props) =>
        props.prev
            ? css`
                  left: 0;

                  .project-title {
                      text-align: left;

                      svg {
                          left: 0;
                      }
                  }
              `
            : css`
                  right: 0;

                  .project-title {
                      text-align: right;

                      svg {
                          justify-self: end;
                      }
                  }
              `}

    a:link,
    a:visited {
        color: ${(props) => props.theme.background};
        text-decoration: none;
    }

    .project-title {
        display: grid;
        margin: 0;
        font-size: 5rem;
        font-weight: 800;
        text-transform: uppercase;
        line-height: 0.9;

        svg {
            display: block;
            width: 7rem;
            height: 7rem;
            margin-left: -0.4rem;
            fill: ${(props) => props.theme.background};
        }
    }
`;

export const ProjectImage = styled(motion.div)`
    width: 80%;
    //height: 30rem;

    .img-fluid {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
`;
