import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

import { respondTo } from '../base/responsive';
import { primaryColor } from '../base/variables';

const footerWrapper = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding-bottom: 4rem;

    @media ${respondTo.M} {
        grid-template-columns: repeat(2, 1fr);
        grid-row-gap: 2rem;
    }

    @media ${respondTo.S} {
        padding-bottom: 2rem;
    }
`;

export const FooterWrapper = styled(motion.div)`
    ${footerWrapper}

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 117rem;
    margin: 0 auto;
    padding-left: 2rem;
    padding-right: 3rem;
    color: ${primaryColor};

    @media ${respondTo.M} {
        padding-right: 4rem;
    }
`;

export const NavFooterWrapper = styled.div`
    ${footerWrapper}

    grid-column: center-start / center-end;
    color: ${(props) => props.theme.background};
`;

export const FooterEmail = styled.div<{ navOpen: boolean }>`
    a:link,
    a:visited {
        transition: fill 0.2s cubic-bezier(0.6, 0.05, 0.01, 0.9);
        color: ${(props) =>
            props.navOpen ? props.theme.background : primaryColor};
        font-size: 2rem;
        font-weight: 700;
        text-decoration: none;
    }

    a:hover {
        color: ${(props) => props.theme.text};
    }

    @media ${respondTo.M} {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    }

    @media ${respondTo.S} {
        a:link,
        a:visited {
            font-size: 1.8rem;
        }
    }

    @media ${respondTo.XXXS} {
        a:link,
        a:visited {
            font-size: 1.5rem;
        }
    }
`;

export const FooterCopyrights = styled.div`
    justify-self: center;
    font-size: 1.6rem;
    font-weight: 600;

    @media ${respondTo.M} {
        grid-row: 1 / 3;
        grid-column: 1 / 3;
        justify-self: end;
        align-self: end;
    }

    @media ${respondTo.S} {
        font-size: 1.4rem;
    }

    @media ${respondTo.XXXS} {
        font-size: 1.2rem;
    }
`;

export const FooterSocial = styled.div<{ navOpen: boolean }>`
    display: flex;
    justify-self: end;

    a {
        padding: 1rem;

        &:hover svg {
            fill: ${(props) =>
                props.navOpen ? props.theme.text : props.theme.text};
        }

        svg {
            width: 2.5rem;
            height: 2.5rem;
            transition: fill 0.2s cubic-bezier(0.6, 0.05, 0.01, 0.9);
            fill: ${(props) =>
                props.navOpen ? props.theme.background : primaryColor};
        }
    }

    @media ${respondTo.M} {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
        justify-self: start;
        margin-right: 0;
        margin-left: -1rem;
    }
`;
