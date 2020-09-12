import styled from 'styled-components';
import { motion } from 'framer-motion';
// Imports from src
import { primaryColor } from '../base/variables';

export const AccordionHeader = styled(motion.div)`
    display: flex;
    align-items: center;
    color: ${primaryColor};
    font-size: 1.6rem;
    font-weight: 700;
`;

export const AccordionIcon = styled.div`
    display: flex;
    align-items: center;
    margin-right: 0.5rem;

    span {
        position: relative;
        display: inline-block;
        width: 1.7rem;
        height: 4px;
        background: ${primaryColor};
    }
`;

export const AccordionContent = styled(motion.div)`
    overflow: hidden;
    padding-left: 4.4rem;
    margin-bottom: 2rem;
    color: ${primaryColor};

    span {
        display: block;
        margin: 0.8rem 0;
        font-size: 1.2rem;
        font-weight: 500;
    }
`;
