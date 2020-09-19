import React from 'react';
import { observer } from 'mobx-react';
import { graphql, useStaticQuery } from 'gatsby';
import { useSpring, useTransform, useViewportScroll } from 'framer-motion';
import loadable from '@loadable/component';
// Imports from src
import {
    HomeBannerSection,
    BannerTitle,
    Headline,
    Video,
} from '../../styles/pages/homeStyles';

const Canvas = loadable(() => import('../ui/Canvas'));

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

            <Canvas top={y} />

            <BannerTitle initial="initial" animate="animate">
                {headline.map((item) => (
                    <Headline
                        key={item.id}
                        custom={item.id}
                        variants={headlineVariants}
                    >
                        {item.text}
                    </Headline>
                ))}
            </BannerTitle>
        </HomeBannerSection>
    );
};

export default observer(HomeBanner);

const headline = [
    {
        id: 0,
        text: 'In',
    },
    {
        id: 1,
        text: 'Code',
    },
    {
        id: 2,
        text: 'We',
    },
    {
        id: 3,
        text: 'Trust',
    },
];

const headlineVariants = {
    initial: {
        y: '80rem',
    },
    animate: (custom: number) => ({
        y: 0,
        transition: {
            duration: 1,
            ease: [0.6, 0.05, -0.01, 0.9],
            delay: custom * 0.2,
        },
    }),
};
