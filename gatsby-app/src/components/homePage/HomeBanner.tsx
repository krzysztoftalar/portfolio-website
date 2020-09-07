import React, { useRef } from 'react';
import { observer } from 'mobx-react';
import { graphql, useStaticQuery } from 'gatsby';
// Imports from src
import {
    Banner,
    BannerTitle,
    Canvas,
    Headline,
    Video,
} from '../../styles/homeStyles';
import { useStore } from '../../hooks/useStore';
import useWindowSize from '../../hooks/useWindowSize';
import { renderCanvas } from '../../helpers/renderCanvas';

const HomeBanner = (): JSX.Element => {
    const data = useStaticQuery(graphql`
        query {
            video: file(relativePath: { eq: "banner.mp4" }) {
                publicURL
            }
        }
    `);

    const store = useStore();
    const { theme, setCursor } = store.uiStore;

    const windowSize = useWindowSize();
    const canvasRef = useRef<any>(null);

    renderCanvas(canvasRef, windowSize, theme);

    return (
        <Banner>
            <Video>
                <video
                    src={data.video.publicURL}
                    height="100%"
                    width="100%"
                    autoPlay
                    muted
                    loop
                >
                    Your browser is not supported!
                </video>
            </Video>

            <Canvas
                onMouseEnter={() => setCursor('hovered')}
                onMouseLeave={() => setCursor()}
                height={windowSize.height}
                width={windowSize.width}
                ref={canvasRef}
            />

            <BannerTitle initial="initial" animate="animate">
                <Headline variants={firstHeadlineVariants}>Dig</Headline>
                <Headline variants={secondHeadlineVariants}>Deep</Headline>
            </BannerTitle>
        </Banner>
    );
};

export default observer(HomeBanner);

const firstHeadlineVariants = {
    initial: {
        x: '-2.5rem',
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
        x: '-2.5rem',
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
