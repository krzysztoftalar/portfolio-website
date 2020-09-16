import React from 'react';
import { observer } from 'mobx-react';
import { graphql, useStaticQuery } from 'gatsby';
import { useSpring, useTransform, useViewportScroll } from 'framer-motion';
// Imports from src
import {
    HomeBannerSection,
    BannerTitle,
    Headline,
    Video,
} from '../../styles/pages/homeStyles';
import Canvas from '../ui/Canvas';

const HomeBanner = (): JSX.Element => {
    const data = useStaticQuery(graphql`
        query {
            video: file(relativePath: { eq: "banner.mp4" }) {
                publicURL
            }
        }
    `);

    // Move video up on scroll
    const { scrollYProgress } = useViewportScroll();
    const yRange = useTransform(scrollYProgress, [0, 0.5], [0, -600]);
    const y = useSpring(yRange, {
        stiffness: 300,
        damping: 20,
        mass: 0.5,
    });

    return (
        <HomeBannerSection>
            <Video style={{ y }}>
                <video src={data.video.publicURL} autoPlay muted loop>
                    Your browser is not supported!
                </video>
            </Video>

            <Canvas />

            <BannerTitle initial="initial" animate="animate">
                <Headline variants={firstHeadlineVariants}>Dig</Headline>
                <Headline variants={secondHeadlineVariants}>Deep</Headline>
            </BannerTitle>
        </HomeBannerSection>
    );
};

export default observer(HomeBanner);

const firstHeadlineVariants = {
    initial: {
        y: '80rem',
    },
    animate: {
        y: 0,
        transition: {
            duration: 1,
            ease: [0.6, 0.05, -0.01, 0.9],
        },
    },
};

const secondHeadlineVariants = {
    initial: {
        y: '80rem',
    },
    animate: {
        y: 0,
        transition: {
            duration: 1,
            delay: 0.2,
            ease: [0.6, 0.05, -0.01, 0.9],
        },
    },
};
