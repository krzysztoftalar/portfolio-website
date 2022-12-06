import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

import { respondTo } from '../base/responsive';
import { primaryColor } from '../base/variables';

// Slider section
export const ProjectSliderSection = styled(motion.div)`
    position: relative;
    grid-column: 1 / -1;
    grid-row: 2 / 3;
    max-width: 117rem;
    width: 100%;
    margin: 17rem auto 0;
    cursor: grab !important;

    @media ${respondTo.S} {
        margin: 12rem auto 0;
    }
`;

// About section
export const ProjectAboutSection = styled(motion.div)`
    grid-column: center-start / center-end;
    grid-row: 3 / 4;
    padding: 17rem 0 19rem 10rem;

    @media ${respondTo.M} {
        padding: 17rem 0 22rem 0;
    }

    @media ${respondTo.S} {
        padding: 11rem 0 9rem 0;
    }
`;

export const About = styled.div`
    display: grid;
    grid-template-columns: minmax(min-content, 60rem);
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

    @media ${respondTo.S} {
        grid-template-columns: 80%;

        .project-title {
            font-size: 5rem;
        }
    }

    @media ${respondTo.XS} {
        grid-template-columns: 100%;
    }

    @media ${respondTo.XXXS} {
        .project-title {
            font-size: 4rem;
        }
    }
`;

export const ProjectLinks = styled.div`
    width: fit-content;
`;

export const ProjectLink = styled.div<{ disabled: boolean }>`
    a:link,
    a:visited {
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

    a:hover {
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

    ${(props) =>
        props.disabled &&
        css`
            a:link,
            a:visited {
                color: ${(props) => props.theme.disabledText};
                pointer-events: none;
            }

            svg {
                fill: ${(props) => props.theme.disabledText};
            }
        `}
`;

// Nav section
export const ProjectNavSection = styled.div`
    display: grid;
    grid-template-columns:
        [side-left-start] minmax(3rem, 1fr) [side-left-end center-start]
        repeat(8, [col-start] minmax(min-content, 14.62rem) [col-end])
        [center-end side-right-start] minmax(3rem, 1fr) [side-right-end];
    grid-column: 1 / -1;
    grid-row: 4 / 5;
    padding: 7rem 0 7rem;
    background-color: ${primaryColor};

    @media ${respondTo.L} {
        grid-row-gap: 7rem;
    }
    a {
        display: block;
    }
`;

const projectWrapper = css`
    position: relative;

    .project-link {
        display: flex;
        align-items: center;

        &:link,
        &:visited {
            color: ${(props) => props.theme.background};
            text-decoration: none;
        }
    }

    @media ${respondTo.L} {
        grid-column: center-start / center-end;
        padding: 0;
    }
`;

export const PrevProject = styled(motion.div)<{ $prev: boolean }>`
    ${projectWrapper}

    grid-column: center-start / col-end 4;
    padding-right: 1rem;

    .project-link {
        ${(props) =>
            props.$prev &&
            css`
                justify-content: flex-end;
            `}
    }
`;

export const NextProject = styled(motion.div)`
    ${projectWrapper}

    grid-column: col-start 5 / center-end;
    padding-left: 1rem;
`;

export const ProjectTitle = styled(motion.div)<{ $prev?: boolean }>`
    position: absolute;
    z-index: 1;
    transform: translateY(-50%);
    top: 50%;

    ${(props) =>
        props.$prev
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

    .project-title {
        display: grid;
        margin: 0;
        font-size: 5rem;
        font-weight: 900;
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

    @media ${respondTo.S} {
        .project-title {
            font-size: 2.5rem;

            svg {
                width: 4rem;
                height: 4rem;
                margin-top: 0.1rem;
            }
        }
    }
`;

export const ProjectImage = styled(motion.div)`
    width: 85%;

    .img-fluid {
        display: inline-block;
        width: 100%;
    }
`;
